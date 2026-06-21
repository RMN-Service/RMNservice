'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const OrderModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: 'Ремонт ноутбука',
    message: ''
  });
  const [status, setStatus] = useState('idle'); // idle, loading, success, error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const res = await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus('success');
        setTimeout(() => {
          onClose();
          setStatus('idle');
          setFormData({ name: '', phone: '', service: 'Ремонт ноутбука', message: '' });
        }, 2000);
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        />
        
        <motion.div 
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="relative w-full max-w-md bg-brand-dark border border-brand-neon/30 p-8 rounded-2xl shadow-neon-glow"
        >
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-400 hover:text-brand-neon"
          >
            ✕
          </button>

          <h2 className="text-2xl font-bold mb-6 text-white">Оставить заявку</h2>

          {status === 'success' ? (
            <div className="text-center py-10">
              <div className="text-5xl mb-4">✅</div>
              <p className="text-brand-neon font-bold">Заявка отправлена!</p>
              <p className="text-slate-400 text-sm mt-2">Мы свяжемся с вами в ближайшее время.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-brand-silver uppercase mb-1">Ваше имя</label>
                <input 
                  required
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-brand-navy/30 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-brand-neon outline-none transition-all"
                  placeholder="Иван Иванов"
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-brand-silver uppercase mb-1">Телефон</label>
                <input 
                  required
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full bg-brand-navy/30 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-brand-neon outline-none transition-all"
                  placeholder="+7 (___) ___-__-__"
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-brand-silver uppercase mb-1">Услуга</label>
                <select 
                  value={formData.service}
                  onChange={(e) => setFormData({...formData, service: e.target.value})}
                  className="w-full bg-brand-navy/30 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-brand-neon outline-none transition-all appearance-none"
                >
                  <option>Ремонт ноутбука</option>
                  <option>Сборка ПК</option>
                  <option>Диагностика</option>
                  <option>Восстановление данных</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-mono text-brand-silver uppercase mb-1">Сообщение (необязательно)</label>
                <textarea 
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full bg-brand-navy/30 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-brand-neon outline-none transition-all h-24 resize-none"
                  placeholder="Опишите проблему..."
                />
              </div>

              <button 
                disabled={status === 'loading'}
                type="submit"
                className="w-full py-4 bg-brand-neon text-black font-bold rounded-xl hover:scale-[1.02] transition-transform shadow-neon-glow disabled:opacity-50"
              >
                {status === 'loading' ? 'Отправка...' : 'Отправить заявку'}
              </button>
              
              {status === 'error' && (
                <p className="text-red-500 text-xs text-center mt-2">Произошла ошибка. Попробуйте позже.</p>
              )}
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default OrderModal;
