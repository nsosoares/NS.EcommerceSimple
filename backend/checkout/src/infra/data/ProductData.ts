import { Product } from '../../domain/entities/Product';
import { IProductData } from '../../domain/data/IProductData';
import { IConnection } from '../database/IConnection';

export class ProductData implements IProductData {
    constructor(readonly connection: IConnection) {

    }

    async getProduct(idProduct: number): Promise<Product> {
        const [productData] = await this.connection.query(`select * from ecommerce.product where id_product = ${idProduct}`, [idProduct]);
        if(!productData) throw new Error('Product not exist');
        return new Product(productData.id_product, productData.description, parseFloat(productData.price), productData.width, productData.height, productData.length, productData.weight);
    }
}