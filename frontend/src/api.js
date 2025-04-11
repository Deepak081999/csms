import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api/tickets' });

export const fetchTickets = () => API.get('/');
export const createTicket = (ticket) => API.post('/', ticket);
export const updateTicket = (id, ticket) => API.put(`/${id}`, ticket);
export const deleteTicket = (id) => API.delete(`/${id}`);
