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
        <div style={{ display: 'flex', height: '100vh', flexDirection: 'column' }}>
            <Navbar onLogout={logout} />
            <div style={{ display: 'flex', flex: 1 }}>
                <Sidebar />
                <div style={{ padding: '20px', flex: 1 }}>
                    <Outlet />
                </div>
            </div>
        </div>
    );
}
