const Opportunity = require('../models/opportunityModel');
const Student  = require('../models/userModel')

const OpportunityController = {
    // Get all opportunities
    getAllOpportunities: async (req, res) => {
        try {
            const opportunities = await Opportunity.find().populate('mentor');
            res.status(200).json({ opportunities });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    // Get a single opportunity by ID
    getOpportunityById: async (req, res) => {
        try {
            const opportunityId = req.params.id;
            const opportunity = await Opportunity.findById(opportunityId).populate('mentor');

            if (!opportunity) {
                return res.status(404).json({ error: 'Opportunity not found' });
            }

            res.status(200).json({ opportunity });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    // Create one or multiple opportunities
    createOpportunitys: async (req, res) => {
        try {
            const opportunitiesData = req.body;

            // Ensure opportunitiesData is an array
            if (!Array.isArray(opportunitiesData)) {
                return res.status(400).json({ error: 'Invalid data format. Array of opportunities expected.' });
            }

            // Create opportunities in bulk
            const createdOpportunities = await Opportunity.insertMany(opportunitiesData);

            res.status(201).json({ message: 'Opportunities created successfully', opportunities: createdOpportunities });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    // Create a single opportunity
    createOpportunity: async (req, res) => {
        try {
            const opportunityData = req.body;

            // Create the opportunity
            const createdOpportunity = await Opportunity.create(opportunityData);

            res.status(201).json({
                message: 'Opportunity created successfully',
                opportunity: createdOpportunity,
            });
        } catch (error) {
            console.error('Error creating opportunity:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    // Update an opportunity
    updateOpportunity: async (req, res) => {
        try {
            const opportunityId = req.params.id;
            const updateData = req.body;

            const updatedOpportunity = await Opportunity.findByIdAndUpdate(opportunityId, updateData, { new: true }).populate('mentor');

            if (!updatedOpportunity) {
                return res.status(404).json({ error: 'Opportunity not found' });
            }

            res.status(200).json({ message: 'Opportunity updated successfully', opportunity: updatedOpportunity });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    // Delete an opportunity
    deleteOpportunity: async (req, res) => {
        try {
            const opportunityId = req.params.id;

            // Delete the opportunity
            const deletedOpportunity = await Opportunity.findByIdAndDelete(opportunityId).populate('mentor');

            if (!deletedOpportunity) {
                return res.status(404).json({ error: 'Opportunity not found' });
            }

            res.status(200).json({ message: 'Opportunity deleted successfully', opportunity: deletedOpportunity });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    // Get opportunities by requestor ID
    getOpportunitiesByRequestorId: async (req, res) => {
        try {
            const requestorId = req.params.requestorId;

            // Find opportunities where the requestor matches the specified ID
            const opportunities = await Opportunity.find({ requestor: requestorId }).populate('mentor');

            if (!opportunities || opportunities.length === 0) {
                return res.status(404).json({ error: 'Opportunities not found for the specified requestor ID' });
            }

            res.status(200).json({ opportunities });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    addStudentToOpportunity: async (req, res) => {
        try {
            const { opportunityId } = req.params;
            const { studentId } = req.body;

            // Check if the opportunity and student exist
            const opportunity = await Opportunity.findById(opportunityId);
            const student = await Student.findById(studentId);

            if (!opportunity || !student) {
                return res.status(404).json({ error: 'Opportunity or student not found' });
            }

            // Check if the student is already in the opportunity
            if (opportunity.students.includes(studentId)) {
                return res.status(400).json({ error: 'Student is already in the opportunity' });
            }

            // Add the student to the opportunity
            opportunity.students.push(studentId);
            await opportunity.save();

            res.status(200).json({ message: 'Student added to the opportunity successfully', opportunity });
        } catch (error) {
            console.error('Error adding student to opportunity:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    // Get opportunities joined by a specific student
    getOpportunitiesByStudentId: async (req, res) => {
        try {
            const { studentId } = req.params;

            // Find opportunities where the student is included in the students array
            const opportunities = await Opportunity.find({ students: studentId }).populate('mentor');

            if (!opportunities || opportunities.length === 0) {
                return res.status(404).json({ error: 'Opportunities not found for the specified student ID' });
            }

            res.status(200).json({ opportunities });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
};

module.exports = OpportunityController;
