// AddUser.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AddUser = () => {
    const [users, setUsers] = useState([]);
    const [permissions, setPermissions] = useState([]);
    const [roles, setRoles] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false); // Loading state

    // Fetch users, roles, and permissions
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

    // Function to handle role change
    const handleRoleChange = async (userId, newRoleId) => {
        try {
            await axios.put(`http://localhost:5000/api/users/${userId}`, {
                role: newRoleId
            });
            fetchUsers(); // Reload users list

        } catch (error) {
            // console.error('Error updating role:', error);
            alert('Failed to update user role', error);
        }
    };

    const handleDeleteUser = async (userId) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                await axios.delete(`http://localhost:5000/api/users/${userId}`);
                alert('User deleted successfully');
                fetchUsers(); // Refresh list
            } catch (error) {
                console.error('Error deleting user:', error);
                alert('Failed to delete user');
            }
        }
    };


    // Form submission logic with loading state
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true); // Set loading state to true

        const newUser = { name, email, password, role: 'admin' }; // Default to admin for simplicity

        try {
            const response = await axios.post('http://localhost:5000/api/users/add', newUser);
            alert(response.data.message || 'User added successfully');
            setName('');
            setEmail('');
            setPassword('');
            fetchUsers(); // Reload users list
        } catch (error) {
            console.error(error);
            alert('Error adding user');
        } finally {
            setIsLoading(false); // Set loading state back to false
        }
    };

    return (
        <div style={{ padding: '20px', backgroundColor: '#ffffff', color: '#000000', minHeight: '100vh' }}>
            <h2>Add New User</h2>
            <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    style={{ marginRight: '10px', padding: '5px' }}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{ marginRight: '10px', padding: '5px' }}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{ marginRight: '10px', padding: '5px' }}
                />

                <button type="submit" disabled={isLoading} style={{ padding: '5px 10px' }}>
                    {isLoading ? 'Adding...' : 'Add User'}
                </button>
            </form>

            <h2>All Users</h2>
            <table border="1" cellPadding="10" cellSpacing="0" style={{ backgroundColor: '#fff', color: '#000' }}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Permissions</th>
                        <th>Actions</th> {/* New column for actions */}
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
                                {user.permissions
                                    ?.filter(pid => pid) // Filter out null/undefined
                                    .map((pid, index) => {
                                        const perm = permissions.find((p) => p._id === pid);

                                        return (
                                            <span key={pid || `perm-${index}`} style={{ marginRight: '5px' }}>
                                                {perm ? perm.name : ''}
                                            </span>
                                        );
                                    })
                                }

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
    );
};

export default AddUser;
