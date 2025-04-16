import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ShowResume from './ShowResume';
import '../../css/resume/ResumeTable.css'; // Import the CSS

const ResumeTable = () => {
    const [resumes, setResumes] = useState([]);
    const [selectedId, setSelectedId] = useState(null);

    useEffect(() => {
        const fetchResumes = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/resumes');
                setResumes(response.data);
                console.log(response.data);
            } catch (err) {
                console.error('Error fetching resumes:', err);
            }
        };

        fetchResumes();
    }, []);

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

    const deleteResume = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/resumes/${id}`);
            setResumes(resumes.filter((resume) => resume._id !== id));
        } catch (err) {
            console.error('Error deleting resume:', err);
        }
    };

    return (
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
                                <button
                                    className="view-btn"
                                    onClick={() => setSelectedId(resume._id)}
                                >
                                    View PDF
                                </button>
                                <button
                                    className="status-btn"
                                    onClick={() => toggleStatus(resume._id)}
                                >
                                    Toggle Status
                                </button>
                                <button
                                    className="delete-btn"
                                    onClick={() => deleteResume(resume._id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {selectedId && (
                <div className="resume-preview">
                    <h3>Previewing Resume PDF</h3>
                    <ShowResume id={selectedId} />
                </div>
            )}
        </div>
    );
};

export default ResumeTable;
