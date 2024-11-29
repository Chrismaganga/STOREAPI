import { Request, Response } from 'express';
import { ProductModel } from '../models/productModel';

const productModel = new ProductModel();

export const getAllProducts = async (_req: Request, res: Response) => {
  const products = await productModel.getAll();
  res.json(products);
};

export const getProductById = async (req: Request, res: Response) => {
  const product = await productModel.getById(Number(req.params.id));
  if (product) res.json(product);
  else res.status(404).json({ message: 'Product not found' });
};

export const createProduct = async (req: Request, res: Response) => {
  const product = await productModel.create(req.body);
  res.status(201).json(product);
};
