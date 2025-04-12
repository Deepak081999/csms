import { useEffect, useState } from 'react';
import { fetchTickets, deleteTicket, updateTicket } from '../api';

export default function TicketList() {
    const [tickets, setTickets] = useState([]);

    const getData = async () => {
        const res = await fetchTickets();
        setTickets(res.data);
    };

    useEffect(() => {
        getData();
    }, []);

    const handleDelete = async (id) => {
        await deleteTicket(id);
        getData();
    };

    const handleUpdate = async (ticket) => {
        await updateTicket(ticket._id, { ...ticket, status: ticket.status === 'open' ? 'closed' : 'open' });
        getData();
    };

    return (
        <div>
            {tickets.map((ticket) => (
                <div key={ticket._id}>
                    <h4>{ticket.customerName}</h4>
                    <p>{ticket.issue}</p>
                    <p>Status: {ticket.status}</p>
                    <button onClick={() => handleUpdate(ticket)}>Toggle Status</button>
                    <button onClick={() => handleDelete(ticket._id)}>Delete</button>
                </div>
            ))}
        </div>
    );
}
