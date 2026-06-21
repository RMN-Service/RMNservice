import { create } from 'zustand';
// import compatibilityEngine from '../../libs/compatibility-engine';

/**
 * Global Store для конфигуратора ПК
 */
export const useConfiguratorStore = create((set, get) => ({
  selectedComponents: {
    cpu: null,
    motherboard: null,
    gpu: null,
    ram: null,
    psu: null,
    storage: null,
    case: null
  },
  errors: [],
  totalPrice: 0,

  addComponent: (category, component) => {
    const current = get().selectedComponents;
    
    // Проверка совместимости перед добавлением
    if (category === 'motherboard' && current.cpu) {
      const check = compatibilityEngine.checkCpuAndMotherboard(current.cpu, component);
      if (!check.compatible) {
        set({ errors: [check.reason] });
        return;
      }
    }

    const newComponents = { ...current, [category]: component };
    
    // Пересчет цены
    const newTotal = Object.values(newComponents)
      .reduce((sum, item) => sum + (item?.price || 0), 0);

    set({ 
      selectedComponents: newComponents, 
      totalPrice: newTotal,
      errors: [] 
    });
  },

  removeComponent: (category) => {
    const newComponents = { ...get().selectedComponents, [category]: null };
    const newTotal = Object.values(newComponents)
      .reduce((sum, item) => sum + (item?.price || 0), 0);
    
    set({ selectedComponents: newComponents, totalPrice: newTotal });
  }
}));
