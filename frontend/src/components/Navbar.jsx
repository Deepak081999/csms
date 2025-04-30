import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Navbar.css';

const Navbar = ({ onLogout }) => {
    const user = JSON.parse(localStorage.getItem('user'));
    // const role = user?.role || ''; // Assuming user role is stored in user object

    // Handle role change
    // const handleRoleChange = (newRole) => {
    //     const updatedUser = { ...user, role: newRole };
    //     localStorage.setItem('user', JSON.stringify(updatedUser)); // Update the role in localStorage
    //     window.location.reload(); // Reload to apply role-based changes immediately
    // };

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

                            {/* Dropdown for selecting role (visible only for superadmin) */}
                            {/* {role.name === 'superadmin' && (
                                <div className="dropdown">
                                    <button className="dropdown-btn">Select Role</button>
                                    <div className="dropdown-content">
                                        <button onClick={() => handleRoleChange('superadmin')}>Superadmin</button>
                                        <button onClick={() => handleRoleChange('admin')}>Admin</button>
                                        <button onClick={() => handleRoleChange('user')}>User</button>
                                    </div>
                                </div>
                            )} */}


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
