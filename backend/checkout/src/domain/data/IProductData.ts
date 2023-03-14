import { Product } from "../entities/Product";

export interface IProductData {
    getProduct(idProduct: number): Promise<Product>;
}