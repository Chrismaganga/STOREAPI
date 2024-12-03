import { Product } from "../types/Product";
export declare class ProductModel {
    delete(arg0: number): void;
    update(arg0: number, body: any): void;
    getAll(): Promise<Product[]>;
    getById(id: number): Promise<Product | null>;
    create(product: Product): Promise<Product>;
}
