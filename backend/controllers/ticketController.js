import Ticket from '../models/Ticket.js';

export const getTickets = async (req, res) => {
    const tickets = await Ticket.find();
    res.json(tickets);
};

export const createTicket = async (req, res) => {
    const ticket = new Ticket(req.body);
    await ticket.save();
    res.status(201).json(ticket);
};

export const updateTicket = async (req, res) => {
    const ticket = await Ticket.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(ticket);
};

export const deleteTicket = async (req, res) => {
    await Ticket.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted successfully' });
};
