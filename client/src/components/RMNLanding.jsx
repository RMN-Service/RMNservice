'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import OrderModal from './OrderModal';

const RMNLanding = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-blue-500">
      <OrderModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      
      {/* Header */}
      <header className="fixed w-full z-50 bg-[#050505]/80 backdrop-blur-lg border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-xl">R</div>
            <span className="text-xl font-black tracking-tight uppercase">RMN <span className="text-blue-500">SERVICE</span></span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
            <a href="#services" className="hover:text-white transition-colors">УСЛУГИ</a>
            <a href="#process" className="hover:text-white transition-colors">ПРОЦЕСС</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
            <button onClick={() => setIsModalOpen(true)} className="px-6 py-2 bg-white text-black font-bold rounded-full hover:bg-blue-500 hover:text-white transition-all">Связаться</button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-bold uppercase tracking-wider mb-8">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span> Работаем в Москве 24/7
            </div>
            <h1 className="text-6xl md:text-8xl font-black leading-[0.9] mb-8 uppercase">
              Ремонт <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">будущего</span> <br /> уже здесь.
            </h1>
            <p className="text-gray-400 text-lg max-w-md mb-10 leading-relaxed">
              Мы переосмыслили сервис. Бесплатный забор техники, профессиональная диагностика и возврат в идеальном состоянии.
            </p>
            <div className="flex flex-wrap gap-4">
              <button onClick={() => setIsModalOpen(true)} className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-400 text-white font-bold rounded-xl hover:scale-105 transition-all shadow-lg shadow-blue-500/20">
                ОСТАВИТЬ ЗАЯВКУ
              </button>
              <div className="px-6 py-4 bg-white/5 rounded-xl border border-white/10 text-sm font-bold">
                НАШ TELEGRAM <br /> <span className="text-gray-400 font-normal">@rmn_service</span>
              </div>
            </div>
          </motion.div>
          <div className="relative aspect-square bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-[40px] border border-white/5 overflow-hidden">
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-24 px-6 bg-[#080808]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-black mb-16 uppercase text-center">Наши услуги</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: 'Чистка и ТО', price: '1 500', icon: '🧹', desc: 'Замена термопасты, чистка радиаторов, смазка кулеров.' },
              { title: 'Установка Windows', price: '1 200', icon: '💿', desc: 'Настройка системы, драйверы, офисный пакет.' },
              { title: 'Сборка ПК', price: '3 000', icon: '🖥️', desc: 'Подбор железа, сборка, тестирование.' },
              { title: 'Модульный ремонт', price: '800', icon: '🔧', desc: 'Замена БП, апгрейд ОЗУ, установка SSD.' }
            ].map((s, i) => (
              <div key={i} className="p-10 bg-[#111] border border-white/5 rounded-[32px] hover:border-blue-500/50 transition-all group">
                <div className="flex justify-between items-start mb-6">
                  <span className="text-4xl">{s.icon}</span>
                  <span className="text-blue-500 font-bold">от {s.price} ₽</span>
                </div>
                <h3 className="text-2xl font-bold mb-4 uppercase">{s.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-8">{s.desc}</p>
                <button onClick={() => setIsModalOpen(true)} className="w-full py-3 bg-white/5 rounded-xl font-bold group-hover:bg-blue-600 transition-all">ЗАКАЗАТЬ</button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default RMNLanding;
