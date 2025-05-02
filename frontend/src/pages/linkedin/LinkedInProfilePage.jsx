import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../css/LinkedInProfilePage.css'; // Import the CSS file

const LinkedInProfilePage = () => {
    const [activeProfiles, setActiveProfiles] = useState([]);

    useEffect(() => {
        const fetchActive = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/linkedin/active');
                setActiveProfiles(res.data.profiles);
            } catch (err) {
                console.error('Failed to load active profiles:', err);
            }
        };
        fetchActive();
    }, []);

    return (
        <div className="linkedin-profile-card">
            <h2>Active LinkedIn Profiles</h2>
            <div className="profile-list">
                {activeProfiles.map((profile) => (
                    <div className="linkedin-profile" key={profile._id}>
                        <div className="profile-header">
                            <img src={profile.image} alt="Profile" className="profile-image" />
                            <h2>{profile.name}</h2>
                        </div>
                        <p><strong>Headline:</strong> {profile.headline}</p>
                        <p><strong>Location:</strong> {profile.location}</p>
                        <p><strong>About:</strong> {profile.about}</p>
                        <p><strong>Skills:</strong> {profile.skills.join(', ')}</p>

                        {profile.experience.length > 0 && (
                            <>
                                <h4>Experience:</h4>
                                {profile.experience.map((exp, index) => (
                                    <div key={index}>
                                        <p>{exp.role} at {exp.company} ({exp.duration})</p>
                                    </div>
                                ))}
                            </>
                        )}

                        {profile.education.length > 0 && (
                            <>
                                <h4>Education:</h4>
                                {profile.education.map((edu, index) => (
                                    <div key={index}>
                                        <p>{edu.degree} - {edu.college}</p>
                                    </div>
                                ))}
                            </>
                        )}

                        <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                            View LinkedIn Profile 🔗
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LinkedInProfilePage;
