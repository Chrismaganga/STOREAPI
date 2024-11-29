import { Request, Response } from 'express';
import { OrderModel } from '../models/orderModel';

const orderModel = new OrderModel();

export const createOrder = async (req: Request, res: Response) => {
  const order = await orderModel.create(req.body);
  res.status(201).json(order);
};

export const getCurrentOrderByUser = async (req: Request, res: Response) => {
  const userId = Number(req.params.userId);
  const order = await orderModel.getCurrentByUser(userId);
  if (order) res.json(order);
  else res.status(404).json({ message: 'No active order found' });
};
