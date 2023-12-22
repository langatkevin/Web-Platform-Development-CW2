const express = require('express');
const OpportunityController = require('../controllers/OpportunityController');
const { authenticateUser } = require('../controllers/auth');

const router = express.Router();

// Get all opportunities
router.get('/', OpportunityController.getAllOpportunities);

// Get a single opportunity by ID
router.get('/:id', OpportunityController.getOpportunityById);

// Create a new opportunity (requires authentication)
router.post('/create',OpportunityController.createOpportunity);

// Update an opportunity (requires authentication)
router.put('/update/:id', OpportunityController.updateOpportunity);

// Delete an opportunity (requires authentication)
router.delete('/delete/:id',OpportunityController.deleteOpportunity);

// Get opportunities by requestor ID
router.get('/requestor/:requestorId', OpportunityController.getOpportunitiesByRequestorId);

// Route for adding a student to an opportunity
router.post('/:opportunityId/addStudent', OpportunityController.addStudentToOpportunity);

// Route to get opportunities joined by a specific student
router.get('/student/:studentId/joinedOpportunities', OpportunityController.getOpportunitiesByStudentId);


module.exports = router;
