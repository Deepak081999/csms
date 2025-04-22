import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Role from './models/Role.js';
import Permission from './models/Permission.js';

dotenv.config();

const permissionsList = [
    'view_resume',
    'upload_resume',
    'view_github',
    'create_github',
    'view_linkedin',
    'create_linkedin',
    'update_linkedin',
    'access_settings'
];

const roles = {
    superadmin: [...permissionsList],
    admin: [
        'upload_resume',
        'view_resume',
        'create_github',
        'view_github',
        'create_linkedin',
        'update_linkedin',
        'view_linkedin',
        'access_settings'
    ],
    user: [
        'view_resume',
        'view_github',
        'view_linkedin'
    ]
};

const seed = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected ✅');

        // Create permissions
        const permissionDocs = {};
        for (const name of permissionsList) {
            let permission = await Permission.findOne({ name });
            if (!permission) {
                permission = await Permission.create({ name });
                console.log(`Permission created: ${name}`);
            }
            permissionDocs[name] = permission._id;
        }

        // Create roles and assign permissions
        for (const [roleName, perms] of Object.entries(roles)) {
            let role = await Role.findOne({ name: roleName });
            if (!role) {
                role = new Role({ name: roleName });
            }
            role.permissions = perms.map(name => permissionDocs[name]);
            await role.save();
            console.log(`Role "${roleName}" saved with permissions.`);
        }

        console.log('✅ Seeding complete');
        process.exit();
    } catch (err) {
        console.error('❌ Error seeding:', err);
        process.exit(1);
    }
};

seed();
