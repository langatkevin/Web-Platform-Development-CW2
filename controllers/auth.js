const jwt = require('jsonwebtoken');

const JWT ='SECRET_KEY'
// Authentication middleware
const authenticateUser = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, JWT);
        req.user = decoded;
        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ error: 'Unauthorized' });
    }
};

// Authorization middleware for admin-only routes
const authorizeAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Forbidden' });
    }
    next();
};

module.exports = { authenticateUser, authorizeAdmin };
