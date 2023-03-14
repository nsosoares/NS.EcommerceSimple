import { OrderCode } from './OrderCode';
import { FreightCalculator } from './FreightCalculator';
import { Coupon } from './Coupon';
import { Product } from './Product';
import { Item } from './Item';
import { Cpf } from "./Cpf";

export class Order {
    cpf: Cpf;
    items: Item[];
    coupon?: Coupon = undefined;
    freight: number = 0;
    code: OrderCode;
    constructor(cpf: string, readonly date: Date = new Date(), readonly sequence: number = 1) {
        this.cpf = new Cpf(cpf);
        this.items = [];
        this.code = new OrderCode(date, sequence);
    }

    addItem(product: Product, quantity: number, currencyCode: string = 'BRL', currencyValue: number = 1) {
        product.validateDimension();
        const hasRepeatedItems = this.items.some(item => item.idProduct === product.idProduct);
        if(hasRepeatedItems) throw new Error("Has repeated item");
        this.items.push(new Item(product.idProduct, product.price, quantity, currencyCode, currencyValue));
        this.freight += FreightCalculator.calculate(product);
    }

    addCoupon(coupon: Coupon) {
        if(!coupon.isExpired()) {
            this.coupon = coupon;
        } 
    }

    getCode(): string {
        return this.code.getValue();
    }

    getTotal(): number {
        let total = 0;
        for(let item of this.items) {
            total += item.getTotal();
        }
        if(this.coupon) {
            total -= this.coupon.getDiscount(total);
        }
        total += this.freight;
        return total;
    }
}