import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

export default function GithubOptions() {
    const [showGithubOptions, setShowGithubOptions] = useState(false);

    return (
        <div>
            <div
                className="sidebar-item"
                onClick={() => setShowGithubOptions(!showGithubOptions)}
                style={{ cursor: 'pointer' }}
            >
                Git Hub
            </div>
            {showGithubOptions && (
                <div className="submenu">
                    <NavLink to="/dashboard/StoreGithubData" className="sidebar-item" activeClassName="active">
                        Add New GitHub
                    </NavLink>
                    <NavLink to="/dashboard/FetchGithubOverview" className="sidebar-item" activeClassName="active">
                        OverView
                    </NavLink>
                    <NavLink to="/dashboard/FetchGithubRepositories" className="sidebar-item" activeClassName="active">
                        Repositories
                    </NavLink>
                </div>
            )}
        </div>
    );
}
