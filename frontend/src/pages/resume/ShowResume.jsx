import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ShowResume = () => {
    const [resumes, setResumes] = useState([]);
    const [selectedPdfUrl, setSelectedPdfUrl] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchActiveResumes = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/resumes');
                const activeResumes = response.data.filter(resume => resume.status === 'Active');
                setResumes(activeResumes);

                if (activeResumes.length > 0) {
                    // Automatically show the first active resume
                    handleViewResume(activeResumes[0]._id, `${activeResumes[0].name}.pdf`);
                }
            } catch (err) {
                console.error('Error fetching active resumes:', err);
            }
        };

        fetchActiveResumes();
    }, []);

    const handleViewResume = async (resumeId, fileName) => {
        try {
            setLoading(true); // Show loading while fetching
            const response = await axios.get(`http://localhost:5000/api/resumes/${resumeId}`, {
                responseType: 'blob',
            });

            const blob = new Blob([response.data], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            setSelectedPdfUrl(url); // Set the PDF URL to display on the page
            setLoading(false); // Hide loading when PDF is ready
        } catch (err) {
            console.error('Failed to load resume:', err);
            setLoading(false);
        }
    };

    const handleDownload = () => {
        if (!selectedPdfUrl) return;

        const link = document.createElement('a');
        link.href = selectedPdfUrl;
        link.setAttribute('download', 'resume.pdf'); // Set default download name
        document.body.appendChild(link);
        link.click();
        link.remove();
    };

    return (
        <div className="active-resume-container">
            <h2>Active Resumes</h2>
            {resumes.map(resume => (
                <div key={resume._id} className="resume-card">
                    <h3>{resume.name}</h3>
                </div>
            ))}
            <button onClick={handleDownload} style={{ marginTop: '20px' }}>
                Download Resume
            </button>

            {loading && <div>Loading...</div>}

            {selectedPdfUrl && (
                <div className="pdf-viewer" style={{ marginTop: '20px' }}>
                    <h3>Resume Preview</h3>
                    <embed
                        src={selectedPdfUrl}
                        width="100%"
                        height="600px"
                        type="application/pdf"
                    />

                </div>
            )}
        </div>
    );
};

export default ShowResume;
