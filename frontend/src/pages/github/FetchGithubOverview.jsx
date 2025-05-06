import React, { useState, useEffect } from 'react';
import '../../css/gitoverview.css';

const App = () => {
    const [overview, setOverview] = useState({ repositories: [] });

    useEffect(() => {
        const fetchOverview = async () => {
            try {
                const resUser = await fetch('http://localhost:5000/api/github/latest');
                const { username } = await resUser.json();

                const resOverview = await fetch(`http://localhost:5000/api/github/overview/${username}`);
                const data = await resOverview.json();
                setOverview(data);
            } catch (error) {
                console.error('Error fetching overview:', error);
            }
        };

        fetchOverview();
    }, []);

    if (!overview) return <div className="container">Loading GitHub Overview...</div>;

    return (
        <div className="container" style={{ color: 'black' }}>
            <div className="layout">
                <div className="card profile">
                    <img
                        src={overview.avatar_url}
                        alt="avatar"
                        className="avatar"
                    />
                    <h2>{overview.name}</h2>
                    <p className="username">@{overview.username}</p>
                    <button className="edit-btn">Edit Profile</button>
                    <p>{overview.followers} followers • {overview.following} following</p>
                    <a
                        href={overview.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="link"
                    >
                        {overview.linkedin}
                    </a>
                </div>

                <div className="main-section">
                    <div className="card">
                        <h3>Repositories</h3>
                        <div className="repo-grid">
                            {overview.repositories && Array.isArray(overview.repositories) && overview.repositories.map((repo, i) => (
                                <div key={i}>
                                    <div className="repo-title">{repo.title}</div>
                                    <div className="repo-lang">{repo.language}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="card">
                        <p>{overview.contributions} contributions in the last year</p>
                        <div className="graph"></div>
                        <p className="graph-legend">
                            Less <span className="dot"></span> More
                        </p>
                    </div>

                    <div className="card">
                        <h3>Contribution Activity</h3>
                        <p className="month">{overview.currentMonth}</p>
                        <p>Created {overview.commits} commits in 1 repository</p>
                        <a href="#" className="link">{overview.repoName}</a>
                        <p className="more-activity">Show more activity</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;
