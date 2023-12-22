const express = require('express');
const UserController = require('../controllers/userController');
const { authenticateUser } = require('../controllers/auth');

const router = express.Router();

// Register a new user
router.post('/register', UserController.register);

// Login and generate JWT
router.post('/login', UserController.login);

// Get user profile (requires authentication)
router.get('/profile', authenticateUser, UserController.getProfile);

// Get all users
router.get('/', UserController.getAllUsers);

// Get a user by ID
router.get('/:id', UserController.getUserById);

// Update a user by ID
router.put('/:id', UserController.updateUserById);

// Delete a user by ID
router.delete('/:id', UserController.deleteUserById);

module.exports = router;
