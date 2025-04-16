import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ShowResume = ({ id }) => {
    const [resumeData, setResumeData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState(null);

    useEffect(() => {
        const fetchResume = async () => {
            if (!id) {
                setLoading(false);
                return;
            }

            try {
                const metaRes = await axios.get(`http://localhost:5000/api/resumes/meta/${id}`);
                const resumeMeta = metaRes.data;
                setStatus(resumeMeta.status);

                if (resumeMeta.status === 'Active') {
                    const fileRes = await axios.get(`http://localhost:5000/api/resumes/${id}`, {
                        responseType: 'arraybuffer',
                    });

                    const file = new Blob([fileRes.data], { type: 'application/pdf' });
                    const fileURL = URL.createObjectURL(file);
                    setResumeData(fileURL);
                }
            } catch (err) {
                console.error('Error fetching resume:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchResume();
    }, [id]);

    if (loading || !resumeData || status !== 'Active') return null;

    return (
        <div>
            <h3>Resume Preview</h3>
            <iframe
                src={resumeData}
                width="100%"
                height="500"
                title="Resume"
                style={{ border: '1px solid #ccc' }}
            ></iframe>
        </div>
    );
};

export default ShowResume;
