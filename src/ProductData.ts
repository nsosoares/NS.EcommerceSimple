import { IProductData } from './IProductData';
import pgp from "pg-promise";

export class ProductData implements IProductData {
    async getProduct(idProduct: number): Promise<any> {
        const connection = pgp()("postgres://postgres:123456789@localhost:5432/ecommerce");
        const [product] = await connection.query(`select * from ecommerce.product where id_product = ${idProduct}`);
        await connection.$pool.end();
        return product;
    }
}