import mongoose from 'mongoose';

const RoleSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    permissions: { type: [String], required: true }  // List of permissions
});

const Role = mongoose.model('Role', RoleSchema);

export default Role;
