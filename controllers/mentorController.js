const Mentor = require('../models/mentorModel');

const MentorController = {
    // Get all mentors
    getAllMentors: async (req, res) => {
        try {
            const mentors = await Mentor.find();
            res.status(200).json({ mentors });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    // Get a single mentor by ID
    getMentorById: async (req, res) => {
        try {
            const mentorId = req.params.id;
            const mentor = await Mentor.findById(mentorId);

            if (!mentor) {
                return res.status(404).json({ error: 'Mentor not found' });
            }

            res.status(200).json({ mentor });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },


    // Create one or multiple mentors
    createMentors: async (req, res) => {
        try {
            const mentorsData = req.body;

            // Ensure mentorsData is an array
            if (!Array.isArray(mentorsData)) {
                return res.status(400).json({ error: 'Invalid data format. Array of mentors expected.' });
            }

            // Create mentors in bulk
            const createdMentors = await Mentor.insertMany(mentorsData);

            res.status(201).json({ message: 'Mentors created successfully', mentors: createdMentors });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    createMentor: async (req, res) => {
        try {
            const mentorData = req.body;

            // Create the mentor
            const createdMentor = await Mentor.create(mentorData);

            res.status(201).json({ message: 'Mentor created successfully', mentor: createdMentor });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    // Update a mentor
    updateMentor: async (req, res) => {
        try {
            const mentorId = req.params.id;
            const updateData = req.body;

            const updatedMentor = await Mentor.findByIdAndUpdate(mentorId, updateData, { new: true });

            if (!updatedMentor) {
                return res.status(404).json({ error: 'Mentor not found' });
            }

            res.status(200).json({ message: 'Mentor updated successfully', mentor: updatedMentor });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    // Delete a mentor
    deleteMentor: async (req, res) => {
        try {
            const mentorId = req.params.id;

            // Delete the mentor
            const deletedMentor = await Mentor.findByIdAndDelete(mentorId);

            if (!deletedMentor) {
                return res.status(404).json({ error: 'Mentor not found' });
            }

            res.status(200).json({ message: 'Mentor deleted successfully', mentor: deletedMentor });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
};

module.exports = MentorController;
