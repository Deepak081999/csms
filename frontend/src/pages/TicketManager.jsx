import { useEffect, useState } from 'react';
import { createTicket, fetchTickets, deleteTicket, updateTicket } from '../api';
import '../css/TicketManager.css'; // 👈 Import the CSS

export default function TicketManager() {
    const [form, setForm] = useState({ customerName: '', issue: '' });
    const [tickets, setTickets] = useState([]);

    const getData = async () => {
        const res = await fetchTickets();
        setTickets(res.data);
    };

    useEffect(() => {
        getData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.customerName || !form.issue) return alert("Please fill all fields.");
        await createTicket(form);
        setForm({ customerName: '', issue: '' });
        getData();
    };

    const handleDelete = async (id) => {
        await deleteTicket(id);
        getData();
    };

    const handleUpdate = async (ticket) => {
        await updateTicket(ticket._id, {
            ...ticket,
            status: ticket.status === 'open' ? 'closed' : 'open'
        });
        getData();
    };

    return (
        <div className="ticket-container">
            <h2>Add New Ticket</h2>
            <form className="ticket-form" onSubmit={handleSubmit}>
                <input
                    placeholder="Customer Name"
                    value={form.customerName}
                    onChange={(e) => setForm({ ...form, customerName: e.target.value })}
                />
                <input
                    placeholder="Issue"
                    value={form.issue}
                    onChange={(e) => setForm({ ...form, issue: e.target.value })}
                />
                <button type="submit">Submit</button>
            </form>

            <hr />

            <h2>Tickets List</h2>
            <table className="ticket-table">
                <thead>
                    <tr>
                        <th>Customer Name</th>
                        <th>Issue</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tickets.map((ticket) => (
                        <tr key={ticket._id}>
                            <td>{ticket.customerName}</td>
                            <td>{ticket.issue}</td>
                            <td>{ticket.status}</td>
                            <td className="ticket-actions">
                                <button onClick={() => handleUpdate(ticket)}>Toggle Status</button>
                                <button onClick={() => handleDelete(ticket._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                    {tickets.length === 0 && (
                        <tr>
                            <td colSpan="4" style={{ textAlign: 'center' }}>No tickets found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
