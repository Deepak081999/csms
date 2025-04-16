import mongoose from 'mongoose';

const resumeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    file: { type: Buffer, required: true },
    contentType: { type: String, required: true },
    status: {
        type: String,
        enum: ['Active', 'Inactive'],
        default: 'Active'
    }
}, {
    timestamps: true
});

const Resume = mongoose.model('Resume', resumeSchema);

export default Resume;
