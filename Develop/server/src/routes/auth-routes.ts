import { Router, Request, Response } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const login = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      res.status(400).json({ message: 'Invalid credentials.' });
      return;
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      res.status(400).json({ message: 'Invalid credentials.' });
      return;
    }

    const token = jwt.sign({ username: user.username }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
    return;
  } catch (error) {
    res.status(500).json({ message: 'Internal server error.' });
  }
};

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || "defaultSecret";

// POST /login - Login a user
router.post('/login', login);

export default router;