import { NextResponse } from 'next/server';
import axios from 'axios';
import nodemailer from 'nodemailer';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, phone, service, message } = body;

    // 0. Сохранение в Supabase
    const { error: dbError } = await supabase
      .from('orders')
      .insert([{ name, phone, service, message, status: 'new' }]);

    if (dbError) console.error('Supabase Error:', dbError);

    const tgToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_ADMIN_CHAT_ID;

    // 1. Отправка в Telegram
    if (tgToken && chatId) {
      const tgText = `
🚀 *Новая заявка с сайта!*
👤 *Имя:* ${name}
📞 *Телефон:* ${phone}
🛠 *Услуга:* ${service || 'Не указана'}
💬 *Сообщение:* ${message || 'Нет'}
      `;

      try {
        await axios.post(`https://api.telegram.org/bot${tgToken}/sendMessage`, {
          chat_id: chatId,
          text: tgText,
          parse_mode: 'Markdown',
        });
      } catch (e) {
        console.error('TG Error:', e.message);
      }
    }

    // 2. Отправка на почту
    if (process.env.SMTP_USER && process.env.EMAIL_TO) {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: process.env.SMTP_PORT == 465,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      const mailOptions = {
        from: `"RMN Service" <${process.env.SMTP_USER}>`,
        to: process.env.EMAIL_TO,
        subject: `Новая заявка: ${service}`,
        text: `Имя: ${name}\nТелефон: ${phone}\nУслуга: ${service}\nСообщение: ${message}`,
        html: `
          <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee;">
            <h2 style="color: #39FF14;">Новая заявка с сайта</h2>
            <p><b>Имя:</b> ${name}</p>
            <p><b>Телефон:</b> ${phone}</p>
            <p><b>Услуга:</b> ${service}</p>
            <p><b>Сообщение:</b> ${message}</p>
          </div>
        `,
      };

      try {
        await transporter.sendMail(mailOptions);
      } catch (e) {
        console.error('Email Error:', e.message);
      }
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Order API Error:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
