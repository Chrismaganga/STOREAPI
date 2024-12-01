import { ProductModel } from '../../models/productModel';
import { Product } from '../../types/Product';
import { jest } from '@jest/globals';
import pool from '../../config/db';

jest.mock('../config/db', () => {
    const mPool = {
        query: jest.fn(),
    };
    return { __esModule: true, default: mPool };
});


describe('ProductModel', () => {
    let productModel: ProductModel;

    beforeEach(() => {
        productModel = new ProductModel();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('getAll', () => {
        it('should return all products', async () => {
            const mockProducts: Product[] = [
                { id: 1, name: 'Product 1', price: 100, category: 'Category 1' },
                { id: 2, name: 'Product 2', price: 200, category: 'Category 2' },
            ];
            (pool.query as jest.Mock).mockResolvedValue({ rows: mockProducts });

            const result = await productModel.getAll();

            expect(pool.query).toHaveBeenCalledWith('SELECT * FROM products');
            expect(result).toEqual(mockProducts);
        });
    });

    describe('getById', () => {
        it('should return a product by id', async () => {
            const mockProduct: Product = { id: 1, name: 'Product 1', price: 100, category: 'Category 1' };
            (pool.query as jest.Mock).mockResolvedValue({ rows: [mockProduct] });

            const result = await productModel.getById(1);

            expect(pool.query).toHaveBeenCalledWith('SELECT * FROM products WHERE id = $1', [1]);
            expect(result).toEqual(mockProduct);
        });

        it('should return null if product not found', async () => {
            (pool.query as jest.Mock).mockResolvedValue({ rows: [] });

            const result = await productModel.getById(1);

            expect(pool.query).toHaveBeenCalledWith('SELECT * FROM products WHERE id = $1', [1]);
            expect(result).toBeNull();
        });
    });

    describe('create', () => {
        it('should create a new product', async () => {
            const newProduct: Product = { id: 1, name: 'Product 1', price: 100, category: 'Category 1' };
            const { name, price, category } = newProduct;
            (pool.query as jest.Mock).mockResolvedValue({ rows: [newProduct] });

            const result = await productModel.create(newProduct);

            expect(pool.query).toHaveBeenCalledWith(
                'INSERT INTO products (name, price, category) VALUES ($1, $2, $3) RETURNING *',
                [name, price, category]
            );
            expect(result).toEqual(newProduct);
        });
    });
});
