const express = require('express');
const MentorController = require('../controllers/mentorController');
const { authenticateUser, authorizeAdmin } = require('../controllers/auth');

const router = express.Router();

// Get all mentors
router.get('/', MentorController.getAllMentors);

// Create a new mentor (requires authentication and admin authorization)
// router.post('/create', authenticateUser, authorizeAdmin, MentorController.createMentor);


router.post('/create',MentorController.createMentor);

router.put('/update/:id',MentorController.updateMentor)

// Delete a mentor (requires authentication and admin authorization)
router.delete('/delete/:id', MentorController.deleteMentor);

module.exports = router;
