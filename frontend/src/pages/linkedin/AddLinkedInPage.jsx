import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../css/LinkedInProfilePage.css'; // Add the new CSS file for LinkedIn

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
        <div className="linkedin-container">
            <h2>Add LinkedIn Profile</h2>
            <form onSubmit={handleSubmit} className="linkedin-form">
                <input
                    name="name"
                    placeholder="LinkedIn Name"
                    value={form.name}
                    onChange={handleChange}
                    required
                /><br />
                <input
                    name="headline"
                    placeholder="Headline"
                    value={form.headline}
                    onChange={handleChange}
                    required
                /><br />
                <input
                    name="location"
                    placeholder="Location"
                    value={form.location}
                    onChange={handleChange}
                /><br />
                <textarea
                    name="about"
                    placeholder="About"
                    value={form.about}
                    onChange={handleChange}
                /><br />
                <input
                    name="skills"
                    placeholder="Skills (comma-separated)"
                    value={form.skills}
                    onChange={handleChange}
                /><br />
                <input
                    name="linkedin"
                    placeholder="LinkedIn URL"
                    value={form.linkedin}
                    onChange={handleChange}
                /><br />
                <input
                    name="image"
                    placeholder="Image URL"
                    value={form.image}
                    onChange={handleChange}
                /><br />
                <label>
                    <input
                        type="checkbox"
                        name="isActive"
                        checked={form.isActive}
                        onChange={handleChange}
                    />
                    Is Active
                </label><br />
                <button
                    type="submit"
                    className="submit-btn"
                >
                    Add Profile
                </button>
            </form>

            <hr />

            <h2>All LinkedIn Profiles</h2>
            <div className="linkedin-table-container">
                <table>
                    <thead>
                        <tr>
                            <th>LinkedIn Name</th>
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
        </div>
    );
};

export default AddLinkedInPage;
