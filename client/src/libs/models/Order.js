import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  service: { type: String, default: 'Не указана' },
  message: { type: String },
  status: { 
    type: String, 
    enum: ['new', 'in_progress', 'completed', 'cancelled'], 
    default: 'new' 
  },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Order || mongoose.model('Order', OrderSchema);
