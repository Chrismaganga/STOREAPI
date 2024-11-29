import { Request, Response } from 'express';
import { UserModel } from '../models/userModel';
import { generateToken } from '../utils/tokenUtil';

const userModel = new UserModel();

export const createUser = async (req: Request, res: Response) => {
  const user = await userModel.create(req.body);
  const token = generateToken(user);
  res.status(201).json({ user, token });
};

export const authenticateUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await userModel.authenticate(email, password);

  if (user) {
    const token = generateToken(user);
    res.json({ user, token });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
};
