import React, { useState } from 'react';
import { register } from '../api/auth';
import { useNavigate, Link } from 'react-router-dom';
import '../css/login.css'; // Reusing the same CSS

const Register = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await register(formData);
            setSuccess(data.message);
            setError('');
            setTimeout(() => navigate('/login'), 1500); // Redirect after success
        } catch (err) {
            setError(err.message || 'Registration failed');
        }
    };

    return (
        <div className="container">
            <div className="form-container sign-in-container">
                <form onSubmit={handleSubmit}>
                    <h1>Create Account</h1>
                    <div className="social-container">
                        <a href="#"><i className="fab fa-facebook-f"></i></a>
                        <a href="#"><i className="fab fa-google-plus-g"></i></a>
                        <a href="#"><i className="fab fa-linkedin-in"></i></a>
                    </div>
                    <span>or use your email for registration</span>
                    {success && <p style={{ color: 'green' }}>{success}</p>}
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
                    <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
                    <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
                    <button type="submit">Register</button>
                </form>
            </div>

            <div className="overlay-container">
                <div className="overlay">
                    <div className="overlay-panel overlay-right">
                        <h1>Welcome Back!</h1>
                        <p>To keep connected with us, please login with your personal info</p>
                        <Link to="/Login">
                            <button className="ghost" id="signIn">Sign In</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
