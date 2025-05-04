import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ShowResume = () => {
    const [resumes, setResumes] = useState([]);
    const [selectedPdfUrl, setSelectedPdfUrl] = useState(null);

    useEffect(() => {
        const fetchActiveResumes = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/resumes');
                const activeResumes = response.data.filter(resume => resume.status === 'Active');
                setResumes(activeResumes);
            } catch (err) {
                console.error('Error fetching active resumes:', err);
            }
        };

        fetchActiveResumes();
    }, []);

    const handleDownloadAndView = async (resumeId, fileName) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/resumes/${resumeId}`, {
                responseType: 'blob',
            });

            const blob = new Blob([response.data], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            setSelectedPdfUrl(url); // Set the PDF URL to display on the page

            // Trigger the download action
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', fileName || 'resume.pdf');
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (err) {
            console.error('Download or View failed:', err);
        }
    };

    return (
        <div className="active-resume-container">
            <h2>Active Resumes</h2>
            {resumes.map(resume => (
                <div key={resume._id} className="resume-card">
                    <h3>{resume.name}</h3>
                    <button onClick={() => handleDownloadAndView(resume._id, `${resume.name}.pdf`)}>Download & View</button>
                </div>
            ))}

            {selectedPdfUrl && (
                <div className="pdf-viewer" style={{ marginTop: '20px' }}>
                    <h3>Resume Preview</h3>
                    <embed
                        src={selectedPdfUrl}
                        width="100%"
                        height="600px"
                        type="application/pdf"
                        title="PDF Viewer"
                    />
                </div>
            )}
        </div>
    );
};

export default ShowResume;
