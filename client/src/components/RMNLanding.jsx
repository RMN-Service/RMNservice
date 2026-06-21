import React, { useState } from 'react';
import { motion } from 'framer-motion';
import OrderModal from './OrderModal';

const RMNLanding = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-brand-dark text-white font-sans selection:bg-brand-neon selection:text-black">
      <OrderModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      {/* Хедер */}
      <header className="fixed w-full z-50 bg-brand-dark/80 backdrop-blur-md border-b border-brand-navy/30">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-brand-navy rounded-lg flex items-center justify-center border border-brand-neon/50 shadow-neon-glow">
              <span className="text-brand-neon font-mono font-bold">RMN</span>
            </div>
            <span className="text-xl font-black tracking-tighter uppercase">Service</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#services" className="hover:text-brand-neon transition-colors">Услуги</a>
            <a href="#about" className="hover:text-brand-neon transition-colors">О нас</a>
            <a href="#prices" className="hover:text-brand-neon transition-colors">Цены</a>
            <a href="#contacts" className="hover:text-brand-neon transition-colors">Контакты</a>
          </nav>

          <button 
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-2.5 bg-brand-neon text-black font-bold rounded-full hover:scale-105 transition-transform shadow-neon-glow"
          >
            Вызвать мастера
          </button>
        </div>
      </header>

      {/* Первый экран */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Фоновый узор микросхемы (SVG placeholder) */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg width="100%" height="100%" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 100h600v600h-600z" fill="none" stroke="#39FF14" strokeWidth="1" />
            <circle cx="400" cy="400" r="50" fill="none" stroke="#39FF14" strokeWidth="2" />
            <path d="M400 350v-250M400 450v250M350 400h-250M450 400h250" stroke="#39FF14" strokeWidth="2" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <div className="inline-block px-3 py-1 rounded-full bg-brand-navy/50 border border-brand-neon/30 text-brand-neon text-[10px] font-mono uppercase tracking-[0.2em] mb-6">
              System Status: Operational
            </div>
            <h1 className="text-6xl md:text-7xl font-black leading-[1.1] mb-8">
              Ремонт компьютеров с гарантией <span className="text-brand-neon">безопасности</span>
            </h1>
            <p className="text-xl text-slate-400 mb-10 leading-relaxed">
              Профессиональное обслуживание IT-инфраструктуры, сборка кастомных станций и защита ваших данных на аппаратном уровне.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="px-8 py-4 bg-brand-navy border border-brand-neon/50 text-white font-bold rounded-xl hover:bg-brand-navy/80 transition-all">
                Рассчитать стоимость
              </button>
              <div className="flex items-center gap-4 px-6 py-4 bg-white/5 rounded-xl border border-white/10">
                <span className="text-brand-silver">⚡</span>
                <span className="text-sm font-mono">Response time: less than 2h</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Блок услуг */}
      <section id="services" className="py-24 bg-brand-navy/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-16">
            <div>
              <h2 className="text-4xl font-bold mb-4">Наши услуги</h2>
              <div className="h-1 w-20 bg-brand-neon"></div>
            </div>
            <div className="text-brand-silver font-mono text-sm">01 // SERVICES</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'Ремонт ноутбуков', desc: 'Замена матриц, ремонт цепей питания, чистка.', icon: '💻' },
              { title: 'Обслуживание моноблоков', desc: 'Апгрейд, замена термопасты, ремонт охлаждения.', icon: '🖥️' },
              { title: 'Диагностика мини-ПК', desc: 'Поиск неисправностей на компонентном уровне.', icon: '📟' },
              { title: 'Сборка конфигураций', desc: 'Индивидуальный подбор под задачи и бюджет.', icon: '⚙️' },
              { title: 'Восстановление данных', desc: 'Работа с поврежденными носителями и RAID.', icon: '🛡️' },
              { title: 'Кибербезопасность', desc: 'Аудит систем и установка защиты от угроз.', icon: '🔒' }
            ].map((service, i) => (
              <motion.div 
                whileHover={{ translateY: -10 }}
                key={i}
                className="p-8 rounded-2xl border border-brand-silver/20 bg-brand-dark hover:border-brand-neon/50 transition-all group"
              >
                <div className="text-4xl mb-6 group-hover:scale-110 transition-transform inline-block">{service.icon}</div>
                <h3 className="text-xl font-bold mb-4">{service.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">{service.desc}</p>
                <div className="flex justify-between items-center">
                  <span className="text-brand-neon font-mono text-xs tracking-widest">DETAILS</span>
                  <div className="w-8 h-8 rounded-full border border-brand-silver/30 flex items-center justify-center group-hover:bg-brand-neon group-hover:text-black transition-all">
                    →
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Блок преимуществ */}
      <section className="py-24 border-y border-brand-navy/30">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { label: 'Security', title: 'Гарантия безопасности', val: '100%', desc: 'Полная конфиденциальность ваших данных.' },
            { label: 'Speed', title: 'Выезд мастера', val: '2h', desc: 'Оперативное решение проблем на месте.' },
            { label: 'Quality', title: 'Оригинальные запчасти', val: 'A+', desc: 'Только сертифицированные комплектующие.' }
          ].map((item, i) => (
            <div key={i} className="text-center md:text-left">
              <div className="font-mono text-brand-neon text-5xl font-black mb-4">{item.val}</div>
              <h4 className="text-lg font-bold mb-2">{item.title}</h4>
              <p className="text-slate-500 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Футер */}
      <footer className="py-20 bg-brand-dark relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 font-mono text-[10px] leading-none pointer-events-none select-none">
          {Array(50).fill('0101010110101010101011010101010101011010101010101101010101010101101010101010110101010101').join(' ')}
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-brand-navy rounded flex items-center justify-center border border-brand-neon/50">
                  <span className="text-brand-neon font-mono text-xs font-bold">RMN</span>
                </div>
                <span className="text-lg font-black tracking-tighter uppercase">Service</span>
              </div>
              <p className="text-slate-500 max-w-sm">
                Ваш надежный партнер в мире высоких технологий. Мы обеспечиваем бесперебойную работу вашей техники и безопасность данных.
              </p>
            </div>
            <div>
              <h5 className="font-bold mb-6 uppercase tracking-widest text-xs text-brand-silver">Контакты</h5>
              <ul className="space-y-4 font-mono text-sm text-slate-400">
                <li>+7 (999) 000-00-00</li>
                <li>info@rmn-service.ru</li>
                <li>г. Москва, ул. Технологическая, 10</li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold mb-6 uppercase tracking-widest text-xs text-brand-silver">Социальные сети</h5>
              <div className="flex gap-4">
                {['TG', 'VK', 'YT'].map(s => (
                  <div key={s} className="w-10 h-10 rounded-lg border border-white/10 flex items-center justify-center hover:border-brand-neon hover:text-brand-neon transition-all cursor-pointer">
                    {s}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-white/5 flex flex-wrap justify-between gap-4 text-[10px] font-mono text-slate-600 uppercase tracking-[0.3em]">
            <span>© 2026 RMN Service. All rights reserved.</span>
            <span>Encrypted Connection: AES-256</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default RMNLanding;
