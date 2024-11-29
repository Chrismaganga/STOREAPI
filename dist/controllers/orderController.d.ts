import { Request, Response } from 'express';
export declare const createOrder: (req: Request, res: Response) => Promise<void>;
export declare const getCurrentOrderByUser: (req: Request, res: Response) => Promise<void>;
