import mongoose from 'mongoose';

const githubSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    }
}, { timestamps: true });

const Github = mongoose.model('Github', githubSchema);

export default Github;
