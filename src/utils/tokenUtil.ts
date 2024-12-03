import jwt from 'jsonwebtoken';
import { User } from '../types/User';


export const generateToken = (user: User) => {
  return jwt.sign(
    { id: user.id, firstName: user.firstName, lastName: user.lastName },
    process.env.JWT_SECRET as string,
    { expiresIn: '10hr' }
  );
};
export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET as string);
  } catch (error) {
    throw new Error('Invalid token');
  }
};

export const decodeToken = (token: string) => {
  return jwt.decode(token);
};