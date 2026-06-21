import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useConfiguratorStore } from '../store/useConfiguratorStore';
import ComponentCard from './ComponentCard';

const Configurator = () => {
  const { selectedComponents, totalPrice, errors, addComponent, removeComponent } = useConfiguratorStore();

  const categories = [
    { id: 'cpu', name: 'Процессор', icon: '🔌' },
    { id: 'motherboard', name: 'Материнская плата', icon: '📟' },
    { id: 'gpu', name: 'Видеокарта', icon: '🎮' },
    { id: 'ram', name: 'Оперативная память', icon: '🧠' },
    { id: 'psu', name: 'Блок питания', icon: '⚡' },
    { id: 'case', name: 'Корпус', icon: '📦' }
  ];

  // Имитация данных из API
  const mockComponents = {
    cpu: [
      { id: 1, brand: 'Intel', model: 'Core i9-13900K', price: 580, specifications: { socket: 'LGA1700', tdp: 125 } },
      { id: 2, brand: 'AMD', model: 'Ryzen 9 7950X', price: 550, specifications: { socket: 'AM5', tdp: 170 } }
    ],
    motherboard: [
      { id: 3, brand: 'ASUS', model: 'ROG STRIX Z790-E', price: 450, specifications: { socket: 'LGA1700', ramType: 'DDR5', formFactor: 'ATX' } },
      { id: 4, brand: 'MSI', model: 'MPG X670E CARBON', price: 430, specifications: { socket: 'AM5', ramType: 'DDR5', formFactor: 'ATX' } }
    ]
  };

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white p-8 font-sans">
      <header className="max-w-7xl mx-auto flex justify-between items-center mb-12">
        <div>
          <h1 className="text-4xl font-black tracking-tighter bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
            KODIK CONFIGURATOR
          </h1>
          <p className="text-slate-500 mt-2">Сборка премиальных систем с гарантией совместимости</p>
        </div>
        <div className="text-right">
          <div className="text-sm text-slate-500 uppercase tracking-widest">Итоговая стоимость</div>
          <div className="text-5xl font-mono font-bold text-blue-500">${totalPrice}</div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Левая колонка: Категории */}
        <div className="lg:col-span-3 space-y-4">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`w-full flex items-center p-4 rounded-xl border transition-all ${
                selectedComponents[cat.id] 
                ? 'border-blue-500/50 bg-blue-500/5' 
                : 'border-slate-800 bg-slate-900/50 hover:border-slate-700'
              }`}
            >
              <span className="text-2xl mr-4">{cat.icon}</span>
              <div className="text-left">
                <div className="text-xs text-slate-500 uppercase">{cat.name}</div>
                <div className="text-sm font-medium truncate w-40">
                  {selectedComponents[cat.id]?.model || 'Не выбрано'}
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Центральная колонка: Выбор */}
        <div className="lg:col-span-9">
          <AnimatePresence mode="wait">
            {errors.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-xl text-red-400 flex items-center"
              >
                <span className="mr-3">⚠️</span>
                {errors[0]}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {/* Здесь будет маппинг реальных компонентов */}
            {mockComponents.cpu.map(comp => (
              <ComponentCard 
                key={comp.id}
                component={comp}
                onSelect={() => addComponent('cpu', comp)}
                isSelected={selectedComponents.cpu?.id === comp.id}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Configurator;
