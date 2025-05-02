import LinkedInProfile from '../models/LinkedInProfile.js';

export const addProfile = async (req, res) => {
    try {
        const newProfile = new LinkedInProfile(req.body);
        await newProfile.save();
        res.status(201).json({ success: true, profile: newProfile });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getAllProfiles = async (req, res) => {
    try {
        const profiles = await LinkedInProfile.find();
        res.status(200).json({ success: true, profiles });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getActiveProfiles = async (req, res) => {
    try {
        const profiles = await LinkedInProfile.find({ isActive: true });
        res.status(200).json({ success: true, profiles });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const updateStatus = async (req, res) => {
    try {
        const { id, status } = req.body;
        await LinkedInProfile.findByIdAndUpdate(id, { isActive: status });
        res.json({ message: 'Status updated' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to update status' });
    }
};