import mongoose from 'mongoose';

const ticketSchema = new mongoose.Schema({
    customerName: String,
    issue: String,
    status: { type: String, default: 'open' },
}, { timestamps: true });

export default mongoose.model('Ticket', ticketSchema);
