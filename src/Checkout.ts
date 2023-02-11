import { Coupon } from './Coupon';
import { IOrderData } from './IOrderData';
import { IMailer } from './IMailer';
import { Mailer } from './Mailer';
import { ICurrencyGateway } from './ICurrencyGateway';
import { CurrencyGateway } from './CurrencyGateway';
import { ICouponData } from './ICouponData';
import { IProductData } from './IProductData';
import { validate } from "./cpfValidator";
import { FreightCalculator } from './FreightCalculator';

export class Checkout {
    constructor(
        readonly productData: IProductData, 
        readonly couponData: ICouponData,
        readonly orderData: IOrderData, 
        readonly currencyGateway: ICurrencyGateway = new CurrencyGateway(),
        readonly mailer: IMailer = new Mailer()) {
    }

    async execute(input: Input) {
        const cpfIsValid = validate(input.cpf);
        if(!cpfIsValid) {
            throw new Error("Invalid CPF");
        }
        let total = 0;
        let freight = 0;
        const items = input.items;
        const currencies: any = await this.currencyGateway.getCurrencies();
        for(let item of items) {
            const ItemSameId = items.filter((product: any) => product.idProduct === item.idProduct);
            if(ItemSameId.length > 1) {
                throw new Error("Has repeated item");
            }
            if(item.quantity <= 0) {
                throw new Error("Invalid product quantity");
            }
            const product = await this.productData.getProduct(item.idProduct);
            if(!product) {
                throw new Error("Product not exist");
            }
            if(product.width <= 0 || product.height <= 0 || product.width <= 0 || product.length <= 0) {
                throw new Error("Item with negative dimension");
            }
            if(product.weigth <= 0) {
                throw new Error("Item with negative weight");
            }
            total += parseFloat(product.price) * (currencies[product.currency] || 1) * item.quantity;
            freight += FreightCalculator.calculate(product);
        }
        if(input.coupon) {
            const couponData = await this.couponData.getCoupon(input.coupon);
            if(couponData) {
                const coupon = new Coupon(couponData.code, couponData.percentage, couponData.expire_date);
                if(couponData && !coupon.isExpired()){
                    total -= coupon.getDiscount(total);
                }
            }
        }
        if(input.email) {
            this.mailer.send(input.email, "checkout success", "...");
        }
        total += freight;
        const year = new Date().getFullYear();
        const sequence = await this.orderData.count() + 1;
        const code = `${year}${new String(sequence).padStart(8, "0")}`;
        await this.orderData.save({cpf: input.cpf, total: total});
        return {
            total: total,
            code: code
        };
    }
}

type Input = {
    cpf: string,
    items: {idProduct: number, quantity: number}[],
    coupon?: string,
    email?: string
}