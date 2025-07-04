import jwt from 'jsonwebtoken';

// Helper to generate token
const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });
};

export class AuthController {
  constructor(registerUserUseCase, loginUserUseCase) {
    this.registerUserUseCase = registerUserUseCase;
    this.loginUserUseCase = loginUserUseCase;
  }

  registerUser = async (req, res) => {
    try {
      const user = await this.registerUserUseCase.execute(req.body);
      generateToken(res, user._id);
      res.status(201).json({ id: user._id, name: user.name, email: user.email });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await this.loginUserUseCase.execute(email, password);
      generateToken(res, user._id);
      res.status(200).json({ id: user._id, name: user.name, email: user.email });
    } catch (error) {
      res.status(401).json({ message: error.message });
    }
  }

  logoutUser = (req, res) => {
    res.cookie('jwt', '', { httpOnly: true, expires: new Date(0) });
    res.status(200).json({ message: 'Logged out successfully' });
  }

  getCurrentUser = (req, res) => {
    res.status(200).json(req.user);
  }
}