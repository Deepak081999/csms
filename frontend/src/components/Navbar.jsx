import React from 'react';
import '../css/Navbar.css';

const Navbar = ({ onLogout }) => {
    const user = JSON.parse(localStorage.getItem('user'));

    return (
        <nav className="navbar-container">
            <div className="navbar-content">
                <div className="brand-logo">
                    <span role="img" aria-label="phone">📞</span>
                    <span className="app-title">Customer Service System</span>
                </div>
                <div className="user-info">
                    {user ? (
                        <>
                            <span className="username">{user.name}</span>
                            <button className="logout-btn" onClick={onLogout}>Logout</button>
                        </>
                    ) : (
                        <span>Please log in</span>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
