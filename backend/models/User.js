import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: mongoose.Schema.Types.ObjectId, ref: 'Role' },  // Reference to Role
    permissions: { type: [String], required: true }  // Permissions array for user
});

const User = mongoose.model('User', UserSchema);

export default User;
