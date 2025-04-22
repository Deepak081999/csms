import React, { useState } from 'react';
import { register } from '../api/auth'; // adjust path if needed

const Register = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await register(formData);
            setSuccess(data.message);
            setError('');
        } catch (err) {
            setError(err.message || 'Registration failed');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Register</h2>
            {success && <p style={{ color: 'green' }}>{success}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <input type="text" name="name" onChange={handleChange} placeholder="Name" required />
            <input type="email" name="email" onChange={handleChange} placeholder="Email" required />
            <input type="password" name="password" onChange={handleChange} placeholder="Password" required />
            <button type="submit">Register</button>
        </form>
    );
};

export default Register;
