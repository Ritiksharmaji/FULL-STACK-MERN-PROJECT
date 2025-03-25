const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const authHeader = req.header('Authorization'); // Get token from request headers
    if (!authHeader) return res.status(401).json({ error: 'Access Denied: No Token Provided' });

    const token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : authHeader;

    if (!token) return res.status(401).json({ error: 'Access Denied: Invalid Token' });

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET); // Verify token
        req.user = verified; // Attach user info to request
        next(); // Proceed to next middleware
    } catch (error) {
        res.status(403).json({ error: 'Invalid or Expired Token' });
    }
};

module.exports = { authenticateToken };

