import { IMailer } from './IMailer';
import { Mailer } from './Mailer';
import { ICurrencyGateway } from './ICurrencyGateway';
import { CurrencyGateway } from './CurrencyGateway';
import { ICouponData } from './ICouponData';
import { IProductData } from './IProductData';
import { validate } from "./cpfValidator";

export class Checkout {
    constructor(
        readonly productData: IProductData, 
        readonly couponData: ICouponData, 
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
            const volume = (product.width / 100) * (product.height / 100) * (product.length / 100);
            const density = parseFloat(product.weigth)/volume;
            const itemFreight = 1000 * volume * (density / 100);
            freight += (itemFreight >= 10) ? itemFreight : 10;
        }
        if(input.coupon) {
            const coupon = await this.couponData.getCoupon(input.coupon);
            const today = new Date();
            if(coupon && new Date(coupon.expire_date) > today) {
                total -= (total * coupon.percentage) / 100;
            }
        }
        if(input.email) {
            this.mailer.send(input.email, "checkout success", "...");
        }
        total += freight;
        return {total: total};
    }
}

type Input = {
    cpf: string,
    items: {idProduct: number, quantity: number}[],
    coupon?: string,
    email?: string
}