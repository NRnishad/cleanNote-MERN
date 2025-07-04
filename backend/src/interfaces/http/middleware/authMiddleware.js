import jwt from 'jsonwebtoken';
import { MongoUserRepository } from '../../../infrastructure/database/MongoUserRepository.js';

const userRepository = new MongoUserRepository();

export const protect = async (req, res, next) => {
  let token;
  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await userRepository.findById(decoded.userId);
      next();
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};