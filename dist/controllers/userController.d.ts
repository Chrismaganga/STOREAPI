import { Request, Response } from 'express';
export declare const createUser: (req: Request, res: Response) => Promise<void>;
export declare const authenticateUser: (req: Request, res: Response) => Promise<void>;
