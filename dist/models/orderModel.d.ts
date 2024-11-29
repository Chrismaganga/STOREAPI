import { Order } from "../types/Order";
export declare class OrderModel {
    getCurrentByUser(userId: number): Promise<Order | null>;
    create(order: Order): Promise<Order>;
}
