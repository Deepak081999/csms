import mongoose from 'mongoose';

const linkedInProfileSchema = new mongoose.Schema({
    name: String,
    headline: String,
    location: String,
    about: String,
    skills: [String],
    experience: [
        {
            company: String,
            role: String,
            duration: String,
        },
    ],
    education: [
        {
            degree: String,
            college: String,
        },
    ],
    linkedin: String,
    image: String,
    isActive: { type: Number, default: 0 },
});

const LinkedInProfile = mongoose.model('LinkedInProfile', linkedInProfileSchema);
export default LinkedInProfile;
