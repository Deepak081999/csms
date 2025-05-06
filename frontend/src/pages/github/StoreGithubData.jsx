import React, { useState } from 'react';
import axios from 'axios';

const StoreGithubData = () => {
    const [username, setUsername] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/github/store', { username });
            setMessage(response.data.message);
        } catch (error) {
            setMessage('Error storing data');
        }
    };

    return (
        <div>
            <h2>Store GitHub Username</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="GitHub Username"
                    required
                />
                <button type="submit">Store</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default StoreGithubData;
