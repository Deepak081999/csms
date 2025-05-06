import Github from '../models/githubModel.js';
import axios from 'axios';

// Store GitHub username
export const storeUsername = async (req, res) => {
    try {
        const { username } = req.body;

        // Check if the username already exists
        let existingUser = await Github.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        // Save the username
        const newGithubUser = new Github({ username });
        await newGithubUser.save();
        res.status(201).json({ message: 'GitHub username saved successfully', data: newGithubUser });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
// Get latest stored username
export const getLatestUsername = async (req, res) => {
    try {
        const user = await Github.findOne().sort({ createdAt: -1 }); // latest user
        if (!user) {
            return res.status(404).json({ message: 'No username found' });
        }
        res.status(200).json({ username: user.username });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Get overview of that username
export const fetchGithubOverview = async (req, res) => {
    try {
        const { username } = req.params;
        const userResponse = await axios.get(`https://api.github.com/users/${username}`);

        const overview = {
            name: userResponse.data.name,
            bio: userResponse.data.bio,
            followers: userResponse.data.followers,
            following: userResponse.data.following,
            avatar_url: userResponse.data.avatar_url
        };

        res.status(200).json(overview);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching GitHub overview', error });
    }
};

// Get repositories of that username
export const fetchGithubRepositories = async (req, res) => {
    try {
        const { username } = req.params;
        const userResponse = await axios.get(`https://api.github.com/users/${username}/repos`);

        const repositories = userResponse.data.map(repo => ({
            name: repo.name,
            description: repo.description,
            html_url: repo.html_url
        }));

        res.status(200).json(repositories);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching GitHub repositories', error });
    }
};
