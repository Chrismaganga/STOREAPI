import { Request, Response } from 'express';
import { getAllProducts, getProductById, createProduct } from '../../controllers/productController';
import { ProductModel } from '../../models/productModel';
import { jest } from '@jest/globals';

jest.mock('../models/productModel');

const mockRequest = (params = {}, body = {}) => ({
    params,
    body,
} as Request);

const mockResponse = () => {
    const res = {} as Response;
    res.status = jest.fn().mockReturnValue(res) as unknown as (code: number) => Response;
    res.json = jest.fn().mockReturnValue(res) as unknown as (body: any) => Response;
    return res;
};

describe('Product Controller', () => {
    let productModel: jest.Mocked<ProductModel>;

    beforeEach(() => {
        productModel = new ProductModel() as jest.Mocked<ProductModel>;
    });

    describe('getAllProducts', () => {
        it('should return all products', async () => {
            const products = [{ id: 1, name: 'Product 1', price: 100 }];
            productModel.getAll.mockResolvedValue(products);

            const req = mockRequest();
            const res = mockResponse();

            await getAllProducts(req, res);

            expect(productModel.getAll).toHaveBeenCalled();
            expect(res.json).toHaveBeenCalledWith(products);
        });
    });

    describe('getProductById', () => {
        it('should return a product if found', async () => {
            const product = { id: 1, name: 'Product 1', price: 100 };
            productModel.getById.mockResolvedValue(product);

            const req = mockRequest({ id: '1' });
            const res = mockResponse();

            await getProductById(req, res);

            expect(productModel.getById).toHaveBeenCalledWith(1);
            expect(res.json).toHaveBeenCalledWith(product);
        });

        it('should return 404 if product not found', async () => {
            productModel.getById.mockResolvedValue(null);

            const req = mockRequest({ id: '1' });
            const res = mockResponse();

            await getProductById(req, res);

            expect(productModel.getById).toHaveBeenCalledWith(1);
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: 'Product not found' });
        });
    });

    describe('createProduct', () => {
        it('should create a new product', async () => {
            const newProduct = { id: 1, name: 'Product 1', price: 100 };
            productModel.create.mockResolvedValue(newProduct);

            const req = mockRequest({}, { name: 'Product 1', price: 100 });
            const res = mockResponse();

            await createProduct(req, res);

            expect(productModel.create).toHaveBeenCalledWith({ name: 'Product 1', price: 100 });
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(newProduct);
        });
    });
});