import { Request, Response, NextFunction } from 'express';
import { jest } from '@jest/globals';
import { authMiddleware } from '../../middlewares/authMiddleware';
import jwt from 'jsonwebtoken';

describe('authMiddleware', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let next: jest.Mock;

    beforeEach(() => {
        req = {
            headers: {}
        };
        next = jest.fn();
        res = {
            status: jest.fn().mockReturnThis() as unknown as Response['status'],
            json: jest.fn().mockReturnThis() as unknown as Response['json']
        } as Partial<Response>;
    });

    it('should return 401 if no authorization header is present', () => {
        const decodedToken = { id: 1, username: 'testuser' };
        jest.spyOn(jwt, 'verify').mockReturnValue(decodedToken as any);
        authMiddleware(req as Request, res as Response, next);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ message: 'Unauthorized' });
    });

    it('should return 401 if token is invalid', () => {
    it('should return 401 if token is invalid', () => {
        req.headers = { authorization: 'Token abc123' };

        authMiddleware(req as Request, res as Response, next);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ message: 'Unauthorized' });
    });

    it('should return 403 if token is invalid', () => {
        req.headers = { authorization: 'Bearer invalidtoken' };

        authMiddleware(req as Request, res as Response, next);

        expect(res.status).toHaveBeenCalledWith(403);
        expect(res.json).toHaveBeenCalledWith({ message: 'Forbidden' });
    });

    it('should call next if token is valid', () => {
        req.headers = { authorization: 'Bearer validtoken' };
        const decodedToken = { id: 1, username: 'testuser' };
        jest.spyOn(jwt, 'verify').mockReturnValue(decodedToken as any);

        authMiddleware(req as Request, res as Response, next);

        expect(req.body.user).toEqual(decodedToken);
        expect(next).toHaveBeenCalled();
    });
        req.headers = { authorization: 'Bearer validtoken' };
        const decodedToken = { id: 1, username: 'testuser' };
        jest.spyOn(jwt, 'verify').mockReturnValue(decodedToken as any);

        authMiddleware(req as Request, res as Response, next);

        expect(req.body.user).toEqual(decodedToken);
        expect(next).toHaveBeenCalled();
    });
});