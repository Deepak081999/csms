import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Navbar.css';

const Navbar = ({ onLogout }) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const role = user?.role || '';
    // console.log(user); // For debugging purposes, remove in production

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
                            {/* Conditionally show "Manage Roles" for superadmin */}
                            {role === 'superadmin' && (
                                <Link to="/dashboard/role" className="navbar-item">Manage Roles</Link>
                            )}
                            {/* Conditionally show "Settings" for admin or superadmin */}
                            {role === 'admin' || role === 'superadmin' ? (
                                <Link to="/dashboard/settings" className="navbar-item">Settings</Link>
                            ) : null}
                            <button className="logout-btn" onClick={onLogout}>Logout</button>
                        </>
                    ) : (
                        <Link to="/login" className="navbar-item">Login</Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
