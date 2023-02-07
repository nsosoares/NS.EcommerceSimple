export interface IProductData {
    getProduct(idProduct: number): Promise<any>;
}