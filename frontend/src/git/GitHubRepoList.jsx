import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GitHubProfile = () => {
    const [profile, setProfile] = useState(null);
    const [repos, setRepos] = useState([]);

    useEffect(() => {
        // Replace with your GitHub username
        const username = 'Deepak081999';

        // Fetch profile
        axios.get(`https://api.github.com/users/${username}`)
            .then(res => setProfile(res.data))
            .catch(err => console.error('Error fetching profile:', err));

        // Fetch repos
        axios.get(`https://api.github.com/users/${username}/repos`)
            .then(res => setRepos(res.data))
            .catch(err => console.error('Error fetching repos:', err));
    }, []);

    if (!profile) return <p className="text-white">Loading profile...</p>;

    return (
        <div className="bg-gray-900 text-white min-h-screen p-6">
            {/* Profile Section */}
            <div className="flex items-center space-x-6 mb-10">
                <img src={profile.avatar_url} alt="Profile" className="w-28 h-28 rounded-full border-4 border-gray-700" />
                <div>
                    <h1 className="text-3xl font-bold">{profile.name}</h1>
                    <p className="text-gray-400">@{profile.login}</p>
                    <p className="mt-1">
                        <a
                            href="https://www.linkedin.com/in/deepak-saini-435095230"
                            className="text-blue-400 hover:underline"
                            target="_blank"
                            rel="noreferrer"
                        >
                            LinkedIn Profile
                        </a>
                    </p>
                    <p className="mt-2 text-sm text-gray-400">
                        👥 {profile.followers} followers · {profile.following} following
                    </p>
                </div>
            </div>

            {/* Repo List */}
            <h2 className="text-2xl font-bold border-b border-gray-700 pb-2 mb-6">Repositories</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {repos.map(repo => (
                    <div key={repo.id} className="bg-gray-800 p-4 rounded-lg hover:shadow-lg transition">
                        <div className="flex justify-between items-center">
                            <a
                                href={repo.html_url}
                                target="_blank"
                                rel="noreferrer"
                                className="text-blue-400 font-semibold text-lg hover:underline"
                            >
                                {repo.name}
                            </a>
                            <span className="bg-gray-700 text-sm px-2 py-1 rounded-full">
                                ⭐ {repo.stargazers_count}
                            </span>
                        </div>
                        <p className="text-gray-400 mt-2">{repo.description || "No description provided."}</p>
                        <div className="text-sm text-gray-500 mt-2">
                            📝 {repo.language || "N/A"} · ⏱ {new Date(repo.updated_at).toLocaleDateString()}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GitHubProfile;
