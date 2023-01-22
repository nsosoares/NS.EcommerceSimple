import { Coupon } from './Coupon';
import { OrderItem } from './OrderItem';
export class Order {
    constructor(readonly cpf: string, readonly orderItems: OrderItem[], readonly coupon?: Coupon) {}

    public getTotalPrice() {
        let total = 0;
        for (let orderItem of this.orderItems) {
            total += orderItem.getTotalPrice();
        }
        if(this.coupon == null) return total;
        return total - ((total * this.coupon.percentage) / 100)
    }
}