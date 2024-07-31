
const jwt = require('jsonwebtoken');


const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

  try {
    const decoded = jwt.verify(token, 'your_jwt_secret');
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ message: 'Invalid token.' });
  }
};


const adminMiddleware = (req, res, next) => {
  if (!req.user.isAdmin) return res.status(403).json({ message: 'Access denied. Not an admin.' });
  next();
};

module.exports = {
  authMiddleware,
  adminMiddleware,
};
