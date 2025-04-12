import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/github.css'; // import your custom CSS file

const GitHubProfile = () => {
    const [profile, setProfile] = useState(null);
    const [repos, setRepos] = useState([]);

    useEffect(() => {
        const username = 'Deepak081999';

        axios.get(`https://api.github.com/users/${username}`)
            .then(res => setProfile(res.data))
            .catch(err => console.error('Profile error:', err));

        axios.get(`https://api.github.com/users/${username}/repos`)
            .then(res => setRepos(res.data))
            .catch(err => console.error('Repo error:', err));
    }, []);

    if (!profile) return <div className="loading">Loading...</div>;

    return (
        <div className="profile-container">
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
