import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AddUser = () => {
    const [users, setUsers] = useState([]);
    const [permissions, setPermissions] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // console.log(users);


    const fetchUsers = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/users');
            setUsers(res.data.users);
            setPermissions(res.data.permissions);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newUser = {
            name,
            email,
            password,
            roleName: 'admin'
        };

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
                <button type="submit" style={{ padding: '5px 10px' }}>Add User</button>
            </form>

            <h2>All Users</h2>
            <table border="1" cellPadding="10" cellSpacing="0" style={{ backgroundColor: '#fff', color: '#000' }}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Permissions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.role?.name || 'N/A'}</td><td>
                                {user.permissions
                                    .map((pid) => {
                                        const perm = permissions.find((p) => p._id === pid);
                                        return perm ? perm.name : '';
                                    })
                                    .join(', ')
                                }
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AddUser;
