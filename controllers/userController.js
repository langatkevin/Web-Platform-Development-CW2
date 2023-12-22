const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const JWT = 'SECRET_KEY'
const UserController = {
    // Create a new user (registration)
    register: async (req, res) => {
        try {
            const { username, email, password, role } = req.body;

            // Check if the email is already registered
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ error: 'Email already exists' });
            }

            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create a new user
            const newUser = new User({
                username,
                email,
                password: hashedPassword,
                role,
            });

            await newUser.save();

            res.status(201).json({ message: 'User registered successfully' ,user: newUser});
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },


    // login route
    login: async (req, res) => {
        try {
            const { username, password } = req.body;

            // Find the user by username
            const user = await User.findOne({ username });

            if (!user) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }

            // Compare the password
            const passwordMatch = await bcrypt.compare(password, user.password);

            if (!passwordMatch) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }

            // Generate JWT
            const token = jwt.sign({ userId: user._id, role: user.role }, JWT, {
                expiresIn: '1h',
            });

            // Send all user data and token in the response
            res.status(200).json({ user, token });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    // Get user profile
    getProfile: async (req, res) => {
        try {
            const userId = req.user.userId; // Extracted from the JWT payload

            // Find the user by ID
            const user = await User.findById(userId);

            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            res.status(200).json({ user });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    // Get all users
    getAllUsers: async (req, res) => {
        try {
            const users = await User.find();
            res.status(200).json({ users });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    // Get a user by ID
    getUserById: async (req, res) => {
        try {
            const userId = req.params.id;
            const user = await User.findById(userId);

            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            res.status(200).json({ user });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    // Update a user by ID
    updateUserById: async (req, res) => {
        try {
            const userId = req.params.id;
            const { username, email, password, role } = req.body;

            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Update the user
            const updatedUser = await User.findByIdAndUpdate(
                userId,
                {
                    username,
                    email,
                    password: hashedPassword,
                    role,
                },
                { new: true } // Return the updated document
            );

            if (!updatedUser) {
                return res.status(404).json({ error: 'User not found' });
            }

            res.status(200).json({ message: 'User updated successfully', user: updatedUser });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    // Delete a user by ID
    deleteUserById: async (req, res) => {
        try {
            const userId = req.params.id;

            // Delete the user
            const deletedUser = await User.findByIdAndDelete(userId);

            if (!deletedUser) {
                return res.status(404).json({ error: 'User not found' });
            }

            res.status(200).json({ message: 'User deleted successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
};

module.exports = UserController;
