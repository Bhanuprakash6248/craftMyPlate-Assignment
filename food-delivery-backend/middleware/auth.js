const jwt = require('jsonwebtoken');
const dotenv = require("dotenv")

dotenv.config()

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization; 


  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authorization header missing or malformed' });

  }


  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token not provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET , (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    req.user = user; 
    next();
  });
};

module.exports = auth;
