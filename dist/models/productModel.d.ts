import { Product } from "../types/Product";
export declare class ProductModel {
    getAll(): Promise<Product[]>;
    getById(id: number): Promise<Product | null>;
    create(product: Product): Promise<Product>;
}
