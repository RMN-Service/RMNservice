import React from 'react';
import { motion } from 'framer-motion';

/**
 * Premium Component: ComponentCard
 * Используется в конфигураторе ПК
 */
const ComponentCard = ({ component, onSelect, isSelected }) => {
  return (
    <motion.div 
      whileHover={{ scale: 1.02, translateY: -5 }}
      className={`relative p-6 rounded-2xl border-2 transition-all ${
        isSelected 
        ? 'border-blue-500 bg-blue-500/10 shadow-[0_0_20px_rgba(59,130,246,0.3)]' 
        : 'border-slate-800 bg-slate-900 hover:border-slate-700'
      }`}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 rounded-lg bg-slate-800">
          {/* Иконка категории */}
          <span className="text-2xl">💻</span>
        </div>
        <span className="text-xl font-bold text-white">${component.price}</span>
      </div>

      <h3 className="text-lg font-semibold text-slate-100 mb-2">{component.brand} {component.model}</h3>
      
      <div className="space-y-2 mb-6">
        {Object.entries(component.specifications).map(([key, value]) => (
          <div key={key} className="flex justify-between text-sm">
            <span className="text-slate-400 uppercase tracking-wider text-[10px]">{key}</span>
            <span className="text-slate-200 font-medium">{value}</span>
          </div>
        ))}
      </div>

      <button 
        onClick={() => onSelect(component)}
        className={`w-full py-3 rounded-xl font-bold transition-all ${
          isSelected 
          ? 'bg-blue-500 text-white' 
          : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
        }`}
      >
        {isSelected ? 'В сборке' : 'Добавить в конфигурацию'}
      </button>

      {isSelected && (
        <motion.div 
          layoutId="outline"
          className="absolute inset-0 border-2 border-blue-400 rounded-2xl pointer-events-none"
        />
      )}
    </motion.div>
  );
};

export default ComponentCard;
