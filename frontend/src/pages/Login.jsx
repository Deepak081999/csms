import React, { useState } from 'react';
import { login } from '../api/auth';

import { useNavigate, Link } from 'react-router-dom';// path depends on your file structure

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await login(formData);
            console.log('Login successful:', data);
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            localStorage.setItem('permissions', JSON.stringify(data.permissions));
            // redirect user, e.g., to dashboard
            navigate('/dashboard');
        } catch (err) {
            setError(err.message || 'Login failed');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <input type="email" name="email" onChange={handleChange} placeholder="Email" required />
            <input type="password" name="password" onChange={handleChange} placeholder="Password" required />
            <button type="submit">Login</button>


            <p>Create an account? <Link to="/Register">Register here</Link></p>
        </form>
    );
};

export default Login;
