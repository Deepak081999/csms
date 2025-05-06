import React, { useEffect, useState } from 'react';

const FetchGithubRepositories = () => {
    const [repos, setRepos] = useState([]);

    useEffect(() => {
        const fetchRepos = async () => {
            try {
                const resUser = await fetch('http://localhost:5000/api/github/latest');
                const { username } = await resUser.json();

                const resRepos = await fetch(`http://localhost:5000/api/github/repos/${username}`);
                const data = await resRepos.json();
                setRepos(data);
            } catch (error) {
                console.error('Error fetching repositories:', error);
            }
        };

        fetchRepos();
    }, []);

    if (!repos.length) return <p>Loading Repositories...</p>;

    return (
        <div>
            <h2>GitHub Repositories</h2>
            <ul>
                {repos.map((repo) => (
                    <li key={repo.name}>
                        <a href={repo.html_url} target="_blank" rel="noreferrer">
                            {repo.name}
                        </a>
                        <p>{repo.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FetchGithubRepositories;
