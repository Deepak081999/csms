import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Role from './models/Role.js'; // adjust path as needed

dotenv.config();

const roles = ['superadmin', 'admin', 'user'];

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('MongoDB connected ✅');

        for (const name of roles) {
            const exists = await Role.findOne({ name });
            if (!exists) {
                await Role.create({ name });
                console.log(`➕ Role "${name}" created`);
            } else {
                console.log(`⚠️ Role "${name}" already exists`);
            }
        }

        console.log('✅ Seeding completed');
        process.exit(0);
    } catch (err) {
        console.error('❌ Seeding error:', err);
        process.exit(1);
    }
};

connectDB();
