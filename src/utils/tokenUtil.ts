import jwt from 'jsonwebtoken';
import { User } from '../types/User';


export const generateToken = (user: User) => {
  return jwt.sign(
    { id: user.id, firstName: user.firstName, lastName: user.lastName },
    process.env.JWT_SECRET as string,
    { expiresIn: '1h' }
  );
};
