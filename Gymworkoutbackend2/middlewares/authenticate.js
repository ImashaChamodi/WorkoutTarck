const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'J9kRjF4&c5D$@7!m1WbZ';

const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    console.log('Authorization header:', req.headers.authorization);

    if (!token) {
        console.log('No token provided');
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.userId = decoded.userId;
        console.log('Token verified. User ID:', req.userId);
        next();
    } catch (error) {
        console.error('Token verification failed:', error);
        res.status(401).json({ message: 'Unauthorized', error: error.message });
    }
};

module.exports = authenticate;

