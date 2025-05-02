import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../css/AddLinkedInPage.css';

const AddLinkedInPage = () => {
    const [form, setForm] = useState({
        name: '',
        headline: '',
        location: '',
        about: '',
        skills: '',
        linkedin: '',
        image: '',
        isActive: false,
    });

    const [profiles, setProfiles] = useState([]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm({
            ...form,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            ...form,
            skills: form.skills.split(',').map(skill => skill.trim()),
        };
        try {
            await axios.post('http://localhost:5000/api/linkedin/add', payload);
            fetchProfiles(); // refresh list
            setForm({
                name: '',
                headline: '',
                location: '',
                about: '',
                skills: '',
                linkedin: '',
                image: '',
                isActive: false,
            });
        } catch (err) {
            console.error('Failed to submit:', err);
        }
    };

    const fetchProfiles = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/linkedin/all');
            setProfiles(res.data.profiles);
        } catch (err) {
            console.error('Error fetching profiles:', err);
        }
    };
    const handleStatusChange = async (id, status) => {
        try {
            await axios.post('http://localhost:5000/api/linkedin/update-status', {
                id,
                status,
            });
            fetchProfiles();
        } catch (err) {
            console.error('Failed to update status:', err);
        }
    };
    useEffect(() => {
        fetchProfiles();
    }, []);

    return (
        <div style={{ padding: '2rem', backgroundColor: 'white', color: 'black' }}>
            <h2>Add LinkedIn Profile</h2>
            <form onSubmit={handleSubmit}>
                <input
                    name="name"
                    placeholder="Name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    style={{ margin: '5px 0' }}
                /><br />
                <input
                    name="headline"
                    placeholder="Headline"
                    value={form.headline}
                    onChange={handleChange}
                    required
                    style={{ margin: '5px 0' }}
                /><br />
                <input
                    name="location"
                    placeholder="Location"
                    value={form.location}
                    onChange={handleChange}
                    style={{ margin: '5px 0' }}
                /><br />
                <textarea
                    name="about"
                    placeholder="About"
                    value={form.about}
                    onChange={handleChange}
                    style={{ margin: '5px 0', width: '100%', minHeight: '100px' }}
                /><br />
                <input
                    name="skills"
                    placeholder="Skills (comma-separated)"
                    value={form.skills}
                    onChange={handleChange}
                    style={{ margin: '5px 0' }}
                /><br />
                <input
                    name="linkedin"
                    placeholder="LinkedIn URL"
                    value={form.linkedin}
                    onChange={handleChange}
                    style={{ margin: '5px 0' }}
                /><br />
                <input
                    name="image"
                    placeholder="Image URL"
                    value={form.image}
                    onChange={handleChange}
                    style={{ margin: '5px 0' }}
                /><br />
                <label>
                    <input
                        type="checkbox"
                        name="isActive"
                        checked={form.isActive}
                        onChange={handleChange}
                        style={{ margin: '5px 0' }}
                    />
                    Is Active
                </label><br />
                <button
                    type="submit"
                    style={{ margin: '10px 0', padding: '10px', backgroundColor: '#4CAF50', color: 'white' }}
                >
                    Add Profile
                </button>
            </form>

            <hr />

            <h2>All Profiles</h2>
            <table border="1" cellPadding="10">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Headline</th>
                        <th>Skills</th>
                        <th>Status</th>
                        <th>Toggle</th>
                    </tr>
                </thead>
                <tbody>
                    {profiles.map(profile => (
                        <tr key={profile._id}>
                            <td>{profile.name}</td>
                            <td>{profile.headline}</td>
                            <td>{profile.skills.join(', ')}</td>
                            <td>{profile.isActive === 1 ? 'Active' : 'Inactive'}</td>
                            <td>
                                <button
                                    onClick={() =>
                                        handleStatusChange(profile._id, profile.isActive === 1 ? 0 : 1)
                                    }
                                >
                                    {profile.isActive === 1 ? 'Deactivate' : 'Activate'}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AddLinkedInPage;
