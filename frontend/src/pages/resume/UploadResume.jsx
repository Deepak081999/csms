import React, { useState } from 'react';
import axios from 'axios';
import '../../css/resume/UploadResume.css';

const UploadResume = () => {
    const [resume, setResume] = useState(null);
    const [name, setName] = useState('');
    const [status, setStatus] = useState('Active');
    const [loading, setLoading] = useState(false);  // Track loading state
    const [error, setError] = useState('');  // Track error message
    const [successMessage, setSuccessMessage] = useState('');  // Track success message

    const handleFileChange = (e) => {
        setResume(e.target.files[0]);
    };

    const handleStatusChange = (e) => {
        setStatus(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);  // Start loading

        const formData = new FormData();
        formData.append('file', resume);
        formData.append('name', name);
        formData.append('status', status);

        try {
            const response = await axios.post('http://localhost:5000/api/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response.data);
            setLoading(false);
            setSuccessMessage('Resume uploaded successfully!');
            setError('');  // Clear any previous error message
        } catch (error) {
            setLoading(false);
            setError('Error uploading resume. Please try again.');
            setSuccessMessage('');  // Clear any previous success message
        }
    };

    return (
        <div className="upload-resume-container">
            <h2>Upload Resume</h2>
            <form onSubmit={handleSubmit} className="upload-form">
                <div className="form-group">
                    <label>Resume Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="input-field"
                    />
                </div>
                <div className="form-group">
                    <label>Upload Resume (PDF):</label>
                    <input
                        type="file"
                        accept="application/pdf"
                        onChange={handleFileChange}
                        required
                        className="input-field"
                    />
                </div>
                <div className="form-group">
                    <label>Status:</label>
                    <select
                        value={status}
                        onChange={handleStatusChange}
                        className="input-field"
                    >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                    </select>
                </div>
                <div className="form-actions">
                    <button type="submit" className="submit-btn" disabled={loading}>
                        {loading ? 'Uploading...' : 'Upload'}
                    </button>
                </div>
            </form>

            {successMessage && <p className="success-message">{successMessage}</p>}
            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

export default UploadResume;
