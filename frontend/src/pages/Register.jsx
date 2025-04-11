import { useState } from 'react';
import { register } from '../api/auth';
import { useNavigate } from 'react-router-dom'; import { Link } from 'react-router-dom';
// import Login from './pages/Login';

export default function Register() {
    const [form, setForm] = useState({ name: '', email: '', password: '' });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(form);
            alert('Registered successfully');
            navigate('/login');
        } catch (err) {
            alert(err.response.data.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <input placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            <input placeholder="Password" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
            <button type="submit">Register</button>

            <hr />

            <p>Already have an account? <Link to="/login">Login here</Link></p>
        </form>
    );
}
