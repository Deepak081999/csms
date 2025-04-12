import { NavLink } from 'react-router-dom';
import '../css/Sidebar.css';

export default function Sidebar() {
    return (
        <div className="sidebar">
            <NavLink to="/dashboard/new">New Ticket</NavLink>
            <NavLink to="/dashboard/tickets">Ticket List</NavLink>
            <NavLink to="/dashboard/github">GitHub Repo List</NavLink>
            <NavLink to="/dashboard/settings">Settings</NavLink>
            <NavLink to="/dashboard/role">Role</NavLink>
            <NavLink to="/dashboard/permission">Permission</NavLink>
            <NavLink to="/dashboard/resume">Resume</NavLink>
        </div>
    );
}
