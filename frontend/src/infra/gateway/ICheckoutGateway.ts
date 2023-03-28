import Product from "../../domain/Product";

export default interface ICheckoutGateway {
    getProducts(): Promise<Product[]>;
    checkout(input: any): Promise<any>;
}