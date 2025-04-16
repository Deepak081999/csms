import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../css/Sidebar.css';

export default function Sidebar() {
    const [showResumeOptions, setShowResumeOptions] = useState(false);

    return (
        <aside className="sidebar">
            <nav className="sidebar-nav">
                <NavLink to="/dashboard/tickets" className="sidebar-item" activeClassName="active">
                    Ticket Manager
                </NavLink>

                {/* Resume Dropdown */}
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

                <NavLink to="/dashboard/linkedin" className="sidebar-item" activeClassName="active">
                    LinkedIn Profile
                </NavLink>
                <NavLink to="/dashboard/github" className="sidebar-item" activeClassName="active">
                    GitHub Repo List
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
            </nav>
        </aside>
    );
}
