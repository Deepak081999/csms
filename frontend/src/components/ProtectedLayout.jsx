import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

export default function ProtectedLayout() {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) navigate('/login');
    }, [navigate]);

    const logout = () => {
        localStorage.clear();
        navigate('/login');
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
            {/* Navbar at top */}
            <Navbar onLogout={logout} />

            {/* Body: Sidebar + Content */}
            <div style={{ display: 'flex', flexGrow: 1, minHeight: 0 }}>
                {/* Sidebar (fixed, no scroll) */}
                <div style={{ width: '250px', flexShrink: 0, overflow: 'hidden' }}>
                    <Sidebar />
                </div>

                {/* Main Content (scrollable) */}
                <div style={{ flexGrow: 1, overflowY: 'auto', padding: '20px', minHeight: 0 }}>
                    <Outlet />
                </div>
            </div>
        </div>
    );
}
