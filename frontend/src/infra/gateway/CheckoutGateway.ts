import Product from "../../domain/Product";
import HttpClient from "../http/HttpClient";
import ICheckoutGateway from "./ICheckoutGateway";

export default class CheckoutGateway implements ICheckoutGateway {
    constructor(readonly httpCliente: HttpClient, readonly baseUrl: string) {}
    async getProducts(): Promise<Product[]> {
        const productsData = await this.httpCliente.get(`${this.baseUrl}/products`);
        const products: Product[] = [];
        for (const product of productsData) {
            products.push(new Product(product.idProduct, product.description, product.price));
        }
        return products;
    }

    async checkout(input: any): Promise<any> {
        const output = await this.httpCliente.post(`${this.baseUrl}/checkout`, input);
        return output;
    }
}