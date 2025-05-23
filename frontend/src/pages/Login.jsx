import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../api/auth';
import styles from '../css/login.module.css'; // Import the CSS Module

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
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            localStorage.setItem('permissions', JSON.stringify(data.permissions));
            navigate('/dashboard');
        } catch (err) {
            setError(err.message || 'Login failed');
        }
    };

    return (
        <div className={styles.authPage}>
            <div className={styles.container}>
                <div className={styles.formContainer}>
                    <form onSubmit={handleSubmit}>
                        <h1>Sign in</h1>
                        <div className={styles.socialContainer}>
                            {/* <a href="#"><i className="fab fa-facebook-f"></i></a>
                            <a href="#"><i className="fab fa-google-plus-g"></i></a>
                            <a href="#"><i className="fab fa-linkedin-in"></i></a> */}
                        </div>
                        {/* <span>or use your account</span> */}
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
                        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
                        {/* <a href="#">Forgot your password?</a> */}
                        <button type="submit">Sign In</button>
                    </form>
                </div>

                <div className={styles.overlayContainer}>
                    <div className={styles.overlay}>
                        <div className="overlayPanel overlay-right">
                            <h1>Hello, Friend!</h1>
                            <p>Enter your personal details and start your journey with us</p>
                            <Link to="/Register">
                                <button className="ghost" id="signUp">Sign Up</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
