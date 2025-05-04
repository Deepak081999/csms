import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

export default function LinkedInOptions() {
    const [showlinkedinOptions, setShowlinkedinOptions] = useState(false);

    return (
        <div>
            <div
                className="sidebar-item"
                onClick={() => setShowlinkedinOptions(!showlinkedinOptions)}
                style={{ cursor: 'pointer' }}
            >
                LinkedIn Profile
            </div>
            {showlinkedinOptions && (
                <div className="submenu">
                    <NavLink to="/dashboard/AddLinkedInPage" className="sidebar-item" activeClassName="active">
                        Add New LinkedIn Profile
                    </NavLink>
                    <NavLink to="/dashboard/LinkedInProfilePage" className="sidebar-item" activeClassName="active">
                        Show LinkedIn Profile
                    </NavLink>
                </div>
            )}
        </div>
    );
}
