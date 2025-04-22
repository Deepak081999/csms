// components/AdminAssignRole.js
import React, { useState, useEffect } from 'react';
import { getUsers, assignRole } from '../api/admin';

export default function AdminAssignRole() {
    const [users, setUsers] = useState([]);
    const [selectedRole, setSelectedRole] = useState('');
    const [userId, setUserId] = useState('');

    useEffect(() => {
        async function fetchUsers() {
            const res = await getUsers();
            setUsers(res.data);
        }
        fetchUsers();
    }, []);

    const handleRoleChange = async (e) => {
        e.preventDefault();
        try {
            await assignRole(userId, selectedRole);
            alert('Role assigned successfully');
        } catch (err) {
            alert(err.response.data.message);
        }
    };

    return (
        <div>
            <h2>Assign Role to User</h2>
            <form onSubmit={handleRoleChange}>
                <select onChange={(e) => setUserId(e.target.value)} required>
                    <option value="">Select User</option>
                    {users.map((user) => (
                        <option key={user._id} value={user._id}>
                            {user.name}
                        </option>
                    ))}
                </select>
                <select onChange={(e) => setSelectedRole(e.target.value)} required>
                    <option value="">Select Role</option>
                    <option value="admin">Admin</option>
                    <option value="superadmin">Superadmin</option>
                    <option value="user">User</option>
                </select>
                <button type="submit">Assign Role</button>
            </form>
        </div>
    );
}
