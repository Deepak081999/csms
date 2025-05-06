import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../css/resume/ResumeTable.css';
// import '../../css/resume/UploadResume.css';

const ResumeManager = () => {
    const [resumes, setResumes] = useState([]);
    const [resume, setResume] = useState(null);
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    // Fetch resumes on load
    useEffect(() => {
        const fetchResumes = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/resumes');
                setResumes(response.data);
            } catch (err) {
                console.error('Error fetching resumes:', err);
            }
        };
        fetchResumes();
    }, []);

    // Upload resume
    const handleFileChange = (e) => setResume(e.target.files[0]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append('file', resume);
        formData.append('name', name);
        formData.append('status', 'Inactive'); // Always set to Inactive

        try {
            await axios.post('http://localhost:5000/api/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            setLoading(false);
            setSuccessMessage('Resume uploaded successfully!');
            setError('');
            setName('');
            setResume(null);

            // Fetch latest resumes after upload
            const response = await axios.get('http://localhost:5000/api/resumes');
            setResumes(response.data);
        } catch (err) {
            setLoading(false);
            setError('Error uploading resume. Please try again.');
            setSuccessMessage('');
        }
    };


    // Toggle resume status
    const toggleStatus = async (id) => {
        try {
            const response = await axios.patch(`http://localhost:5000/api/resumes/toggle-status/${id}`);
            const updatedResumes = resumes.map((resume) =>
                resume._id === id ? { ...resume, status: response.data.status } : resume
            );
            setResumes(updatedResumes);
        } catch (err) {
            console.error('Error toggling status:', err);
        }
    };

    // Delete resume
    const deleteResume = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/resumes/${id}`);
            setResumes(resumes.filter((resume) => resume._id !== id));
        } catch (err) {
            console.error('Error deleting resume:', err);
        }
    };

    return (
        <div className="resume-manager-container">
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
                    <div className="form-actions">
                        <button type="submit" className="submit-btn" disabled={loading}>
                            {loading ? 'Uploading...' : 'Upload'}
                        </button>
                    </div>
                </form>
                {successMessage && <p className="success-message">{successMessage}</p>}
                {error && <p className="error-message">{error}</p>}
            </div>

            <div className="resume-table-container">
                <h2>Resume List</h2>
                <table className="resume-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Uploaded At</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {resumes.map((resume) => (
                            <tr key={resume._id}>
                                <td>{resume.name}</td>
                                <td>{resume.contentType}</td>
                                <td>{new Date(resume.createdAt).toLocaleString()}</td>
                                <td>{resume.status}</td>
                                <td>
                                    <button className="status-btn" onClick={() => toggleStatus(resume._id)}>
                                        Toggle Status
                                    </button>
                                    <button className="delete-btn" onClick={() => deleteResume(resume._id)}>
                                        Delete
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

export default ResumeManager;
