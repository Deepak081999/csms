import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import '../css/Sidebar.css';

export default function Sidebar() {
    const [showResumeOptions, setShowResumeOptions] = useState(false);
    const [permissions, setPermissions] = useState([]);
    const [role, setRole] = useState('');

    useEffect(() => {
        const savedPermissions = JSON.parse(localStorage.getItem('permissions') || '[]');
        const savedUser = JSON.parse(localStorage.getItem('user') || '{}');
        setPermissions(savedPermissions);
        setRole(savedUser.role || '');
        console.log(savedPermissions);
    }, []);

    return (
        <aside className="sidebar">
            <nav className="sidebar-nav">
                {/* Accessible to all roles */}
                {/* Superadmin sees all options */}
                {role.name === 'superadmin' && (
                    <>
                        <NavLink to="/dashboard/tickets" className="sidebar-item" activeClassName="active">
                            Ticket Manager
                        </NavLink>
                        <div
                            className="sidebar-item"
                            onClick={() => setShowResumeOptions(!showResumeOptions)}
                            style={{ cursor: 'pointer' }}
                        >
                            Resume
                        </div>
                        {showResumeOptions && (
                            <div className="submenu">
                                <NavLink to="/dashboard/UploadResume" className="sidebar-subitem" activeClassName="active">
                                    Upload Resume
                                </NavLink>
                                <NavLink to="/dashboard/ResumeTable" className="sidebar-subitem" activeClassName="active">
                                    Resume Table
                                </NavLink>
                                <NavLink to="/dashboard/ShowResume" className="sidebar-subitem" activeClassName="active">
                                    Show Resume
                                </NavLink>
                            </div>
                        )}
                        <NavLink to="/dashboard/github" className="sidebar-item" activeClassName="active">
                            GitHub Repo List
                        </NavLink>
                        <NavLink to="/dashboard/linkedin" className="sidebar-item" activeClassName="active">
                            LinkedIn Profile
                        </NavLink>
                        <NavLink to="/dashboard/settings" className="sidebar-item" activeClassName="active">
                            Settings
                        </NavLink>
                        <NavLink to="/dashboard/role" className="sidebar-item" activeClassName="active">
                            Role
                        </NavLink>
                        <NavLink to="/dashboard/permission" className="sidebar-item" activeClassName="active">
                            Permission
                        </NavLink>
                    </>
                )}

                {/* Admin sees only specific options */}
                {role.name === 'admin' && (
                    <>
                        <div
                            className="sidebar-item"
                            onClick={() => setShowResumeOptions(!showResumeOptions)}
                            style={{ cursor: 'pointer' }}
                        >
                            Resume
                        </div>
                        {showResumeOptions && (
                            <div className="submenu">
                                <NavLink to="/dashboard/UploadResume" className="sidebar-subitem" activeClassName="active">
                                    Upload Resume
                                </NavLink>
                                <NavLink to="/dashboard/ResumeTable" className="sidebar-subitem" activeClassName="active">
                                    Resume Table
                                </NavLink>
                                <NavLink to="/dashboard/ShowResume" className="sidebar-subitem" activeClassName="active">
                                    Show Resume
                                </NavLink>
                            </div>
                        )}
                        {permissions.includes('create_github') && (
                            <NavLink to="/dashboard/github" className="sidebar-item" activeClassName="active">
                                GitHub Repo List
                            </NavLink>
                        )}
                        {permissions.includes('create_linkedin') && (
                            <NavLink to="/dashboard/linkedin" className="sidebar-item" activeClassName="active">
                                LinkedIn Profile
                            </NavLink>
                        )}
                        <NavLink to="/dashboard/settings" className="sidebar-item" activeClassName="active">
                            Settings
                        </NavLink>
                    </>
                )}

                {/* User sees only specific options based on permissions */}
                {role.name === 'user' && (
                    <>

                        {permissions.includes('view_resume') && (
                            <>
                                <div
                                    className="sidebar-item"
                                    onClick={() => setShowResumeOptions(!showResumeOptions)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    Resume
                                </div>
                                {showResumeOptions && (
                                    <div className="submenu">
                                        <NavLink to="/dashboard/ShowResume" className="sidebar-subitem" activeClassName="active">
                                            Show Resume
                                        </NavLink>
                                    </div>
                                )}
                            </>
                        )}
                        {permissions.includes('view_github') && (
                            <NavLink to="/dashboard/github" className="sidebar-item" activeClassName="active">
                                GitHub Repo List
                            </NavLink>
                        )}
                        {permissions.includes('view_linkedin') && (
                            <NavLink to="/dashboard/linkedin" className="sidebar-item" activeClassName="active">
                                LinkedIn Profile
                            </NavLink>
                        )}
                    </>
                )}
            </nav>
        </aside>
    );
}
