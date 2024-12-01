import { generateToken } from '../../utils/tokenUtil';
import jwt from 'jsonwebtoken';
import { User } from '../../types/User';
import { jest } from '@jest/globals';
import { Mock } from 'jest-mock';

jest.mock('jsonwebtoken');

describe('generateToken', () => {
    const user: User = {
        id: 123,
        firstName: 'John',
        lastName: 'Doe',
        password: 'password123',
    };

    it('should generate a token with the correct payload and options', () => {
        const mockSign = jwt.sign as Mock;
        mockSign.mockReturnValue('mockToken');

        const token = generateToken(user);

        expect(mockSign).toHaveBeenCalledWith(
            { id: user.id, firstName: user.firstName, lastName: user.lastName },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
        expect(token).toBe('mockToken');
    });
});