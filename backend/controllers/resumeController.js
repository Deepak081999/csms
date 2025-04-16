import Resume from '../models/Resume.js';
import multer from 'multer';

// Set up multer for memory storage (store file in memory buffer)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Upload resume route
export const uploadResume = async (req, res) => {
    try {
        const { name, status } = req.body; // Get name and status from the body
        const file = req.file; // Get file from the request

        if (!file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        // Create a new resume entry in the database
        const newResume = new Resume({
            name: name,
            file: file.buffer, // Store file buffer
            contentType: file.mimetype, // Store file type (PDF, etc.)
            status: status || 'Active' // Default status is 'Active' if not provided
        });

        await newResume.save(); // Save to MongoDB
        res.status(200).json({ message: 'Resume uploaded successfully', id: newResume._id });
    } catch (err) {
        res.status(500).json({ message: 'Error uploading resume', error: err.message });
    }
};

// Export the multer upload middleware
export const uploaded = upload.single('file');


// Get single resume by ID (PDF download)
export const getResume = async (req, res) => {
    try {
        const resume = await Resume.findById(req.params.id);

        if (!resume) {
            return res.status(404).json({ message: 'Resume not found' });
        }

        res.set('Content-Type', resume.contentType);
        res.send(resume.file);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching resume', error: err.message });
    }
};



// Get all resumes (excluding file buffer)
export const getAllResumes = async (req, res) => {
    try {
        const resumes = await Resume.find({}, { file: 0 });
        res.status(200).json(resumes);
    } catch (err) {
        res.status(500).json({
            message: 'Error fetching resumes',
            error: err.message
        });
    }
};

// Get metadata of a single resume by ID
export const getResumeMeta = async (req, res) => {
    try {
        const resume = await Resume.findById(req.params.id, 'status name');
        if (!resume) {
            return res.status(404).json({ message: 'Resume not found' });
        }
        res.status(200).json(resume);
    } catch (err) {
        res.status(500).json({
            message: 'Error fetching metadata',
            error: err.message
        });
    }
};


// Toggle status (active/inactive)
export const toggleStatus = async (req, res) => {
    try {
        const resume = await Resume.findById(req.params.id);

        if (!resume) {
            return res.status(404).json({ message: 'Resume not found' });
        }

        resume.status = resume.status === 'Active' ? 'Inactive' : 'Active';
        await resume.save();

        res.status(200).json({ message: `Resume status updated to ${resume.status}`, status: resume.status });
    } catch (err) {
        res.status(500).json({ message: 'Error updating status', error: err.message });
    }
};

// Delete a resume
export const deleteResume = async (req, res) => {
    try {
        const resume = await Resume.findByIdAndDelete(req.params.id);

        if (!resume) {
            return res.status(404).json({ message: 'Resume not found' });
        }

        res.status(200).json({ message: 'Resume deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting resume', error: err.message });
    }
};
