const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const authHeader = req.header('Authorization'); 
    if (!authHeader) return res.status(401).json({ error: 'Access Denied: No Token Provided' });

    const token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : '';

    if (!token) return res.status(401).json({ error: 'Access Denied: Invalid Token' });

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET); 
        req.user = verified; 
        next(); 
    } catch (error) {
        res.status(403).json({ error: 'Invalid or Expired Token' });
    }
};

module.exports = { authenticateToken };

