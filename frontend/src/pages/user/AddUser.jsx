import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../css/users.css'; // Make sure this path matches your folder structure
import PermissionsModal from '../models/PermissionsModal'; // Import the modal component

const AddUser = () => {
    const [users, setUsers] = useState([]);
    const [permissions, setPermissions] = useState([]);
    const [roles, setRoles] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [selectedUserPermissions, setSelectedUserPermissions] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const fetchUsers = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/users');
            setUsers(res.data.users);
            setPermissions(res.data.permissions);
            setRoles(res.data.roles);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleRoleChange = async (userId, newRoleId) => {
        try {
            await axios.put(`http://localhost:5000/api/users/${userId}`, {
                role: newRoleId
            });
            fetchUsers();
        } catch (error) {
            alert('Failed to update user role', error);
        }
    };

    const handleDeleteUser = async (userId) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                await axios.delete(`http://localhost:5000/api/users/${userId}`);
                alert('User deleted successfully');
                fetchUsers();
            } catch (error) {
                console.error('Error deleting user:', error);
                alert('Failed to delete user');
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const newUser = { name, email, password, role: 'admin' };

        try {
            const response = await axios.post('http://localhost:5000/api/users/add', newUser);
            alert(response.data.message || 'User added successfully');
            setName('');
            setEmail('');
            setPassword('');
            fetchUsers();
        } catch (error) {
            console.error(error);
            alert('Error adding user');
        } finally {
            setIsLoading(false);
        }
    };

    const handlePermissionsClick = (userPermissions) => {
        setSelectedUserPermissions(userPermissions);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <div className="users-container">
            <div className="user-container">
                <h2>Add New User</h2>
                <form className="user-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">

                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">

                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-actions">

                        <button type="submit" className="submit-btn" disabled={isLoading}>
                            {isLoading ? 'Adding...' : 'Add User'}
                        </button>
                    </div>
                </form>

            </div>
            <div className='user-table-container'>
                <h2>All Users</h2>
                <table border="1" cellPadding="10" cellSpacing="0" style={{ backgroundColor: '#fff', color: '#000', width: '100%', textAlign: 'left' }}>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Permissions</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    <select
                                        value={user.role}
                                        onChange={(e) => handleRoleChange(user._id, e.target.value)}
                                    >
                                        {roles.map((role) => (
                                            <option key={role._id} value={role._id}>
                                                {role.name}
                                            </option>
                                        ))}
                                    </select>
                                </td>
                                <td>
                                    <button onClick={() => handlePermissionsClick(user.permissions)}>
                                        View Permissions
                                    </button>
                                </td>
                                <td>
                                    <button onClick={() => handleDeleteUser(user._id)} style={{ background: 'red', color: 'white', padding: '5px 10px' }}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <PermissionsModal
                showModal={showModal}
                handleClose={handleCloseModal}
                permissions={permissions}
                userPermissions={selectedUserPermissions}
            />
        </div >
    );
};

export default AddUser;
