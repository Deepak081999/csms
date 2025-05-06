import React, { useEffect, useState } from 'react';

const FetchGithubOverview = () => {
    const [overview, setOverview] = useState(null);

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

    if (!overview) return <p>Loading Overview...</p>;

    return (
        <div>
            <h2>GitHub Overview</h2>
            <img src={overview.avatar_url} alt="Avatar" width="100" />
            <p><strong>Name:</strong> {overview.name}</p>
            <p><strong>Bio:</strong> {overview.bio}</p>
            <p><strong>Followers:</strong> {overview.followers}</p>
            <p><strong>Following:</strong> {overview.following}</p>
        </div>
    );
};

export default FetchGithubOverview;
