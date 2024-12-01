import { Request, Response } from 'express';
import { createOrder, getCurrentOrderByUser } from '../../controllers/orderController';
import { OrderModel } from '../../models/orderModel';

import { jest } from '@jest/globals';

jest.mock('../models/orderModel');

const mockOrderModel = OrderModel as jest.Mocked<typeof OrderModel>;

describe('Order Controller', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let statusMock: jest.Mock;
    let jsonMock: jest.Mock;

    beforeEach(() => {
        req = {};
        res = {
            status: jest.fn().mockReturnThis() as unknown as (code: number) => Response,
            json: jest.fn() as unknown as (body: any) => Response
        };
        statusMock = res.status as jest.Mock;
        jsonMock = res.json as jest.Mock;
    });

    describe('createOrder', () => {
        it('should create a new order and return it with status 201', async () => {
            const mockOrder = { id: 1, product: 'Test Product', quantity: 2, userId: 1, status: 'active' as 'active' };
            req.body = mockOrder;
            mockOrderModel.prototype.create.mockResolvedValue(mockOrder);

            await createOrder(req as Request, res as Response);

            expect(statusMock).toHaveBeenCalledWith(201);
            expect(jsonMock).toHaveBeenCalledWith(mockOrder);
        });
    });

    describe('getCurrentOrderByUser', () => {
        it('should return the current order for a user', async () => {
            const mockOrder = { id: 1, product: 'Test Product', quantity: 2, userId: 1, status: 'active' as 'active' };
            req.params = { userId: '1' };
            mockOrderModel.prototype.getCurrentByUser.mockResolvedValue(mockOrder);

            await getCurrentOrderByUser(req as Request, res as Response);

            expect(jsonMock).toHaveBeenCalledWith(mockOrder);
        });

        it('should return 404 if no active order is found', async () => {
            req.params = { userId: '1' };
            mockOrderModel.prototype.getCurrentByUser.mockResolvedValue(null);

            await getCurrentOrderByUser(req as Request, res as Response);

            expect(statusMock).toHaveBeenCalledWith(404);
            expect(jsonMock).toHaveBeenCalledWith({ message: 'No active order found' });
        });
    });
});