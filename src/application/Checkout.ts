import { IOrderData } from '../domain/data/IOrderData';
import { IMailer } from '../infra/mailer/IMailer';
import { Mailer } from '../infra/mailer/Mailer';
import { ICurrencyGateway } from '../infra/gateway/ICurrencyGateway';
import { CurrencyGateway } from '../infra/gateway/CurrencyGateway';
import { ICouponData } from '../domain/data/ICouponData';
import { IProductData } from '../domain/data/IProductData';
import { Order } from '../domain/entities/Order';

export class Checkout {
    constructor(
        readonly productData: IProductData, 
        readonly couponData: ICouponData,
        readonly orderData: IOrderData, 
        readonly currencyGateway: ICurrencyGateway = new CurrencyGateway(),
        readonly mailer: IMailer = new Mailer()) {
    }

    async execute(input: Input) {
        const currencies = await this.currencyGateway.getCurrencies();
        const today = new Date();
        const sequence = await this.orderData.count() + 1;
        const order = new Order(input.cpf, today, sequence);
        for(let item of input.items) {
            const product = await this.productData.getProduct(item.idProduct);
            order.addItem(product, item.quantity, product.currency, currencies.getCurrency(product.currency));
        }
        if(input.coupon) {
            const coupon = await this.couponData.getCoupon(input.coupon);
            order.addCoupon(coupon);
        }
        if(input.email) {
            this.mailer.send(input.email, "checkout success", "...");
        }
        await this.orderData.save(order);
        return {
            total: order.getTotal(),
            code: order.getCode()
        };
    }
}

type Input = {
    cpf: string,
    items: {idProduct: number, quantity: number}[],
    coupon?: string,
    email?: string
}