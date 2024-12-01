import { Request, Response } from 'express';
import { jest } from '@jest/globals';
import { createUser, authenticateUser } from '../../controllers/userController';
import { UserModel } from '../../models/userModel';
import { generateToken } from '../../utils/tokenUtil';

jest.mock('../models/userModel');
jest.mock('../utils/tokenUtil');

const mockUserModel = UserModel as jest.Mocked<typeof UserModel>;
const mockGenerateToken = generateToken as jest.MockedFunction<typeof generateToken>;

describe('UserController', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let statusMock: jest.Mock;
    let jsonMock: jest.Mock;

    beforeEach(() => {
        req = {};
        statusMock = jest.fn().mockReturnThis();
        jsonMock = jest.fn();
        res = {
            status: statusMock as unknown as Response['status'],
            json: jsonMock as unknown as Response['json'],
        };
    });

    describe('createUser', () => {
        it('should create a user and return a token', async () => {
            const user = { id: 1, name: 'John Doe', firstName: 'John', lastName: 'Doe', password: 'password' };
            const token = 'fake-token';
            req.body = { name: 'John Doe' };

            mockUserModel.prototype.create.mockResolvedValue(user);
            mockGenerateToken.mockReturnValue(token);

            await createUser(req as Request, res as Response);

            expect(mockUserModel.prototype.create).toHaveBeenCalledWith(req.body);
            expect(mockGenerateToken).toHaveBeenCalledWith(user);
            expect(statusMock).toHaveBeenCalledWith(201);
            expect(jsonMock).toHaveBeenCalledWith({ user, token });
        });
    });

    describe('authenticateUser', () => {
        it('should authenticate a user and return a token', async () => {
            const user = { id: 1, name: 'John Doe', firstName: 'John', lastName: 'Doe', password: 'password' };
            const token = 'fake-token';
            req.body = { email: 'john@example.com', password: 'password' };

            mockUserModel.prototype.authenticate.mockResolvedValue(user);
            mockGenerateToken.mockReturnValue(token);

            await authenticateUser(req as Request, res as Response);

            expect(mockUserModel.prototype.authenticate).toHaveBeenCalledWith('john@example.com', 'password');
            expect(mockGenerateToken).toHaveBeenCalledWith(user);
            expect(jsonMock).toHaveBeenCalledWith({ user, token });
        });

        it('should return 401 if authentication fails', async () => {
            req.body = { email: 'john@example.com', password: 'wrongpassword' };

            mockUserModel.prototype.authenticate.mockResolvedValue(null);

            await authenticateUser(req as Request, res as Response);

            expect(mockUserModel.prototype.authenticate).toHaveBeenCalledWith('john@example.com', 'wrongpassword');
            expect(statusMock).toHaveBeenCalledWith(401);
            expect(jsonMock).toHaveBeenCalledWith({ message: 'Invalid credentials' });
        });
    });
});