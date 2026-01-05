import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ 
        success: false,
        message: 'Access denied. Authentication required.' 
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
  
    const user = await User.findById(decoded.id).select('-password');
    
    if (!user) {
      return res.status(401).json({ 
        success: false,
        message: 'User no longer exists or has been deleted.' 
      });
    }
    
    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ 
        success: false,
        message: 'Invalid token' 
      });
    }
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        success: false,
        message: 'Token has expired. Please login again.' 
      });
    }
    
    return res.status(500).json({ 
      success: false,
      message: 'Server error during authentication',
      error: error.message 
    });
  }
};

