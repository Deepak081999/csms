import { NavLink } from 'react-router-dom';
import '../css/Sidebar.css';

export default function Sidebar() {
    return (
        <aside className="sidebar">
            <nav className="sidebar-nav">
                <NavLink to="/dashboard/new" className="sidebar-item" activeClassName="active">
                    New Ticket
                </NavLink>
                <NavLink to="/dashboard/tickets" className="sidebar-item" activeClassName="active">
                    Ticket List
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
                <NavLink to="/dashboard/resume" className="sidebar-item" activeClassName="active">
                    Resume
                </NavLink>
            </nav>
        </aside>
    );
}
