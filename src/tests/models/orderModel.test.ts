// import { OrderModel } from "../../models/orderModel";
// import { jest } from '@jest/globals';
// import { MockedFunction } from 'jest-mock';
// import pool from "../../config/db";
// import { Order } from "../../types/Order";

// jest.mock("../../config/db");

// const mockedPoolQuery = pool.query as MockedFunction<typeof pool.query>;

// const orderModel = new OrderModel();

// describe("OrderModel", () => {
//     afterEach(() => {
//         jest.clearAllMocks();
//     });

//     describe("getCurrentByUser", () => {
//             const mockOrder = { id: 1, userId: 1, status: "active" };
//             mockedPoolQuery.mockResolvedValueOnce({ rows: [mockOrder] });
//             (pool.query as jest.Mock<any>).mockResolvedValueOnce({ rows: [mockOrder] });

//             const result = await orderModel.getCurrentByUser(1);

//             expect(result).toEqual(mockOrder);
//             expect(pool.query).toHaveBeenCalledWith(
//                 `SELECT * FROM orders WHERE user_id = $1 AND status = 'active' LIMIT 1`,
//                 [1],
//                 expect.any(Function)
//             );
//         });
//             mockedPoolQuery.mockResolvedValueOnce({ rows: [] });
//         it("should return null if no active order is found", async () => {
//             (pool.query as jest.Mock).mockResolvedValueOnce({ rows: [] });

//             const result = await orderModel.getCurrentByUser(1);

//             expect(result).toBeNull();
//             expect(pool.query).toHaveBeenCalledWith(
//                 `SELECT * FROM orders WHERE user_id = $1 AND status = 'active' LIMIT 1`,
//                 [1]
//             );
//         });
//     });

//     describe("create", () => {
//         it("should create a new order", async () => {
//             mockedPoolQuery.mockResolvedValueOnce({ rows: [mockOrder] });
//             const newOrder: Order = { userId: 1, status: "active" };
//             (pool.query as jest.Mock).mockResolvedValueOnce({ rows: [mockOrder] });

//             const result = await orderModel.create(newOrder);

//             expect(result).toEqual(mockOrder);
//             expect(pool.query).toHaveBeenCalledWith(
//                 `INSERT INTO orders (user_id, status) VALUES ($1, $2) RETURNING *`,
//                 [newOrder.userId, newOrder.status]
//             );
//         });
//     });
// });