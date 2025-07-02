// src/interfaces/http/middleware/rateLimiter.js
import ratelimit from '../../../infrastructure/config/upstash.js';

const rateLimiter = async (req, res, next) => {
  try {
    // Use a unique identifier for the user, IP is a good default
    const identifier = req.ip; 
    const { success } = await ratelimit.limit(identifier);

    if (!success) {
      return res.status(429).json({ message: 'Too many requests, please try again later.' });
    }
    
    next();
  } catch (error) {
    // If the rate limiter itself fails, it's better to let the request through
    // than to block all users. Log the error for monitoring.
    console.error('Rate limiter error:', error);
    next();
  }
};

export default rateLimiter;