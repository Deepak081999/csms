import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../css/github.css'; // import your custom CSS file

const GitHubProfile = () => {

    const [repos, setRepos] = useState([]);
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const resUser = await fetch('http://localhost:5000/api/github/latest');
                const { username } = await resUser.json();

                // Fetch user profile data
                const resProfile = await fetch(`https://api.github.com/users/${username}`);
                const userProfile = await resProfile.json();
                setProfile(userProfile);

                // Fetch repositories data
                const resRepos = await fetch(`http://localhost:5000/api/github/repos/${username}`);
                const data = await resRepos.json();
                setRepos(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    if (!profile || !repos.length) return <p>Loading...</p>;

    return (

        <div className="profile-container">
            <h2> Linkedin Profile ....</h2>
            {/* Profile Section */}
            <div className="profile-header">
                <img src={profile.avatar_url} alt="Avatar" className="avatar" />
                <div className="profile-info">
                    <h1 className="profile-name">{profile.name}</h1>
                    <p className="profile-username">@{profile.login}</p>
                    <p className="profile-followers">
                        👥 {profile.followers} followers · {profile.following} following
                    </p>
                    <a
                        href="https://www.linkedin.com/in/deepak-saini-435095230"
                        target="_blank"
                        rel="noreferrer"
                        className="linkedin-link"
                    >
                        🔗 LinkedIn Profile
                    </a>
                </div>
            </div>

            {/* Repositories Section */}
            <div className="repo-list">
                {repos.map(repo => (
                    <div key={repo.id} className="repo-card">
                        <div className="repo-header">
                            <div className="repo-info">
                                <a href={repo.html_url} target="_blank" rel="noreferrer" className="repo-name">
                                    {repo.name}
                                </a>
                                <span className="repo-public">Public</span>
                                <p className="repo-desc">{repo.description || 'No description provided.'}</p>
                                <div className="repo-meta">
                                    {repo.language && (
                                        <span className="repo-lang">
                                            <span
                                                className="lang-dot"
                                                style={{ backgroundColor: repo.language === 'JavaScript' ? '#f1e05a' : repo.language === 'PHP' ? '#4F5D95' : '#ccc' }}
                                            ></span>
                                            {repo.language}
                                        </span>
                                    )}
                                    {repo.license?.name && <span>📝 {repo.license.name}</span>}
                                    <span>⏱ Updated {new Date(repo.updated_at).toLocaleDateString()}</span>
                                </div>
                            </div>
                            <div className="star-buttons">
                                <button className="star-btn">⭐ Star</button>
                                <button className="dropdown-btn">▼</button>
                            </div>
                        </div>
                        <div className="repo-graph"></div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GitHubProfile;
