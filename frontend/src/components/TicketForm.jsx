import { useState } from 'react';
import { createTicket } from '../api';

export default function TicketForm({ refresh }) {
    const [form, setForm] = useState({ customerName: '', issue: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        await createTicket(form);
        setForm({ customerName: '', issue: '' });
        refresh();
    };

    return (
        <form onSubmit={handleSubmit}>
            <input placeholder="Customer Name" value={form.customerName} onChange={(e) => setForm({ ...form, customerName: e.target.value })} />
            <input placeholder="Issue" value={form.issue} onChange={(e) => setForm({ ...form, issue: e.target.value })} />
            <button type="submit">Submit</button>
        </form>
    );
}
