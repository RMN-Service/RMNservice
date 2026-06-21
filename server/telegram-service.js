const axios = require('axios');

/**
 * Telegram Integration Service
 * Обеспечивает связь между мастерами и клиентами
 */
class TelegramService {
    constructor(token) {
        this.token = token;
        this.apiUrl = `https://api.telegram.org/bot${token}`;
    }

    /**
     * Отправка уведомления мастеру о новом заказе
     */
    async notifyNewOrder(orderData) {
        const message = `
🚀 *Новый заказ на сборку ПК!*
💰 Сумма: $${orderData.totalPrice}
📋 Конфигурация: ${orderData.summary}
👤 Клиент: ${orderData.clientName}
📞 Связь: ${orderData.phone}
        `;
        return this.sendMessage(process.env.TG_ADMIN_CHAT_ID, message);
    }

    /**
     * Уведомление клиента об изменении статуса ремонта
     */
    async notifyStatusUpdate(chatId, ticketId, status, comment) {
        const statusMap = {
            'diagnostic': '🔍 На диагностике',
            'waiting_parts': '📦 Ожидаем запчасти',
            'in_progress': '🛠 В процессе ремонта',
            'ready': '✅ Готов к выдаче'
        };

        const message = `
🔔 *Обновление статуса заказа ${ticketId}*
Статус: *${statusMap[status] || status}*
💬 Комментарий мастера: ${comment || 'Нет комментариев'}
        `;
        return this.sendMessage(chatId, message);
    }

    async sendMessage(chatId, text) {
        try {
            await axios.post(`${this.apiUrl}/sendMessage`, {
                chat_id: chatId,
                text: text,
                parse_mode: 'Markdown'
            });
            return true;
        } catch (error) {
            console.error('Telegram API Error:', error.response?.data || error.message);
            return false;
        }
    }
}

module.exports = TelegramService;
