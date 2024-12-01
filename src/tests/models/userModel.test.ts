import { UserModel } from '../../models/userModel';
import pool from '../../config/db';
import bcrypt from 'bcrypt';
type User = {
    firstName: string;
    lastName: string;
    password: string;
};

jest.mock('../config/db');
jest.mock('bcrypt');

describe('UserModel', () => {
    let userModel: UserModel;

    beforeEach(() => {
        userModel = new UserModel();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('create', () => {
        it('should create a new user and return user without password', async () => {
            const user: User = { firstName: 'John', lastName: 'Doe', password: 'password123' };
            const hashedPassword = 'hashedPassword123';
            const dbResponse = {
                rows: [{ id: 1, first_name: 'John', last_name: 'Doe', password_hash: hashedPassword }]
            };

            (bcrypt.hash as jest.Mock).mockResolvedValue(hashedPassword);
            (pool.query as jest.Mock).mockResolvedValue(dbResponse);

            const result = await userModel.create(user);

            expect(bcrypt.hash).toHaveBeenCalledWith(user.password, 10);
            expect(pool.query).toHaveBeenCalledWith(
                `INSERT INTO users (first_name, last_name, password_hash) VALUES ($1, $2, $3) RETURNING *`,
                [user.firstName, user.lastName, hashedPassword]
            );
            expect(result).toEqual({ id: 1, first_name: 'John', last_name: 'Doe' });
        });
    });

    describe('authenticate', () => {
        it('should return user without password if authentication is successful', async () => {
            const email = 'john.doe@example.com';
            const password = 'password123';
            const hashedPassword = 'hashedPassword123';
            const dbResponse = {
                rows: [{ id: 1, email, first_name: 'John', last_name: 'Doe', password_hash: hashedPassword }]
            };

            (pool.query as jest.Mock).mockResolvedValue(dbResponse);
            (bcrypt.compare as jest.Mock).mockResolvedValue(true);

            const result = await userModel.authenticate(email, password);

            expect(pool.query).toHaveBeenCalledWith(`SELECT * FROM users WHERE email = $1`, [email]);
            expect(bcrypt.compare).toHaveBeenCalledWith(password, hashedPassword);
            expect(result).toEqual({ id: 1, email, first_name: 'John', last_name: 'Doe' });
        });

        it('should return null if authentication fails', async () => {
            const email = 'john.doe@example.com';
            const password = 'password123';
            const dbResponse = { rows: [] };

            (pool.query as jest.Mock).mockResolvedValue(dbResponse);

            const result = await userModel.authenticate(email, password);

            expect(pool.query).toHaveBeenCalledWith(`SELECT * FROM users WHERE email = $1`, [email]);
            expect(result).toBeNull();
        });
    });
});