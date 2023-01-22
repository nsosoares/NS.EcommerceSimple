import { Product } from './Product';
export class OrderItem {
    public totalPrice: number = 0;
    constructor(readonly product: Product, readonly quantity: number){}

    public getTotalPrice() {
        return this.product.price * this.quantity;
    }
}