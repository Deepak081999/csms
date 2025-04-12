import '../css/Navbar.css';

export default function Navbar({ onLogout }) {
    const user = JSON.parse(localStorage.getItem('user'));

    return (
        <div className="navbar">
            <div className="navbar-left">
                <span className="logo">📞</span>
                <span className="app-name">Customer Service System</span>
            </div>
            <div className="navbar-right">
                <span className="username">{user?.name}</span>
                <button onClick={onLogout}>Logout</button>
            </div>
        </div>
    );
}
