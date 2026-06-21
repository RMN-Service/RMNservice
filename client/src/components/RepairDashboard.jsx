'use client';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const RepairDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await fetch('/api/admin/orders');
      const json = await res.json();
      if (json.success) setOrders(json.data);
    } catch (err) {
      console.error('Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      const res = await fetch('/api/admin/orders', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (res.ok) fetchOrders();
    } catch (err) {
      console.error('Update failed');
    }
  };

  const statusColors = {
    new: 'text-brand-neon border-brand-neon/30 bg-brand-neon/10',
    in_progress: 'text-blue-400 border-blue-400/30 bg-blue-400/10',
    completed: 'text-green-400 border-green-400/30 bg-green-400/10',
    cancelled: 'text-red-400 border-red-400/30 bg-red-400/10',
  };

  return (
    <div className="min-h-screen bg-brand-dark text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-black uppercase tracking-tighter">Панель управления</h1>
            <p className="text-slate-400 font-mono text-sm mt-2">RMN Service // Orders Management</p>
          </div>
          <div className="bg-brand-navy/50 border border-brand-neon/20 px-6 py-3 rounded-xl">
            <span className="text-brand-neon font-mono">{orders.length}</span> <span className="text-xs uppercase text-slate-400">Заявок всего</span>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-brand-neon"></div>
          </div>
        ) : (
          <div className="grid gap-6">
            {orders.map((order) => (
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                key={order._id}
                className="bg-brand-navy/20 border border-white/5 p-6 rounded-2xl hover:border-brand-neon/30 transition-all"
              >
                <div className="flex flex-wrap justify-between items-start gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <h3 className="text-xl font-bold">{order.name}</h3>
                      <span className={`text-[10px] uppercase px-2 py-0.5 rounded border font-mono ${statusColors[order.status]}`}>
                        {order.status}
                      </span>
                    </div>
                    <p className="text-brand-neon font-mono text-sm">{order.phone}</p>
                    <p className="text-slate-300 text-sm mt-2"><span className="text-slate-500">Услуга:</span> {order.service}</p>
                    {order.message && (
                      <p className="text-slate-400 text-sm italic bg-black/20 p-3 rounded-lg mt-3 border-l-2 border-brand-neon/50">
                        "{order.message}"
                      </p>
                    )}
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <select 
                      value={order.status}
                      onChange={(e) => updateStatus(order._id, e.target.value)}
                      className="bg-brand-dark border border-white/10 rounded-lg px-4 py-2 text-xs font-mono outline-none focus:border-brand-neon"
                    >
                      <option value="new">Новый</option>
                      <option value="in_progress">В работе</option>
                      <option value="completed">Завершен</option>
                      <option value="cancelled">Отменен</option>
                    </select>
                    <span className="text-[10px] text-slate-500 font-mono text-right">
                      {new Date(order.createdAt).toLocaleString()}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
            {orders.length === 0 && (
              <div className="text-center py-20 border border-dashed border-white/10 rounded-3xl">
                <p className="text-slate-500 font-mono">Заявок пока нет</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default RepairDashboard;
