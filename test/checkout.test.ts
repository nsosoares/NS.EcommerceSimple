import { Currencies } from '../src/domain/entities/Curriencies';
import { Coupon } from '../src/domain/entities/Coupon';
import { IMailer } from '../src/infra/mailer/IMailer';
import { ICurrencyGateway } from '../src/infra/gateway/ICurrencyGateway';
import { Mailer } from '../src/infra/mailer/Mailer';
import { ICouponData } from '../src/domain/data/ICouponData';
import { IProductData } from '../src/domain/data/IProductData';
import { Checkout } from '../src/application/Checkout';
import Sinon from 'sinon';
import { CurrencyGateway } from '../src/infra/gateway/CurrencyGateway';
import { IOrderData } from '../src/domain/data/IOrderData';

let checkout: Checkout;
let productData: IProductData;
let couponData: ICouponData;
let orderData: IOrderData;
beforeEach(() => {
    productData = {
        async getProduct(idProduct: number): Promise<any> {
            const products: {[idProduct: number]: any} = {
                1: {idProduct: 1, price: 10, description: 'A', width: 100, height: 30, length: 10, weigth: 3, currency: 'BRL'},
                2: {idProduct: 2, price: 10, description: 'B', width: 50, height: 50, length: 50, weigth: 22, currency: 'BRL'},          
                3: {idProduct: 3, price: 10, description: 'C', width: 10, height: 10, length: 10, weigth: 0.9, currency: 'BRL'},          
                4: {idProduct: 4, price: 10, description: 'D', width: 10, height: 0, length: 10, weigth: 0.9, currency: 'BRL'},          
                5: {idProduct: 5, price: 10, description: 'E', width: 10, height: 10, length: 10, weigth: 0, currency: 'BRL'},          
                6: {idProduct: 6, price: 10, description: 'F', width: 10, height: 6, length: 4, weigth: 0.9, currency: 'BRL'},
                7: {idProduct: 7, price: 10, description: 'G', width: 10, height: 6, length: 4, weigth: 0.9, currency: 'USD'}         
            }
            return products[idProduct];
        }
    };
    couponData = {
        async getCoupon(code: string): Promise<Coupon> {
            const coupons: {[code: string]: any}= {
                'VALE20': {code: 'VALE20', percentage: 20, expire_date: new Date('2023-02-15')},
                'VALE10': {code: 'VALE10', percentage: 20, expire_date: new Date('2023-01-01')}
            }
            const couponObtained = coupons[code];
            const coupon = new Coupon(couponObtained.code, couponObtained.percentage, couponObtained.expire_date);
            return coupon;
        }
    };

   orderData = {
    async save(order: any): Promise<void> {
    },
    async getByCpf(cpf: string): Promise<any> {
    },
    async count(): Promise<number> {
        return 0;
    } 
   }

    checkout = new Checkout(productData, couponData, orderData);
});

test("Deve criar um pedido com 3 produtos", async function() {
    const order = {
        cpf: "772.801.132-49",
        items: [
            {idProduct: 1, quantity: 1},
            {idProduct: 2, quantity: 1},
            {idProduct: 3, quantity: 2},
        ]
    };
    const output = await checkout.execute(order);
    expect(output.total).toBe(300);
});

test("Deve fazer um pedido com 3 produtos com cupom de desconto", async function() {
    const order = {
        cpf: "772.801.132-49",
        items: [
            {idProduct: 1, quantity: 1},
            {idProduct: 2, quantity: 1},
            {idProduct: 3, quantity: 2}
        ],
        coupon: 'VALE20'
    };
    const output = await checkout.execute(order);
    expect(output.total).toBe(292);
});

test("Deve fazer um pedido com cupom expirado", async function() {
    const order = {
        cpf: "772.801.132-49",
        items: [
            {idProduct: 1, quantity: 1},
            {idProduct: 2, quantity: 1},
            {idProduct: 3, quantity: 2}
        ],
        coupon: 'VALE10'
    };
    const output = await checkout.execute(order);
    expect(output.total).toBe(300);
});

test("Deve fazer um pedido calculando o frete", async function() {
    const order = {
        cpf: "772.801.132-49",
        items: [
            {idProduct: 1, quantity: 1},
        ]
    };
    const output = await checkout.execute(order);
    expect(output.total).toBe(40);
});

test("Deve fazer um pedido calculando o valor minimo de frete", async function() {
    const order = {
        cpf: "772.801.132-49",
        items: [
            {idProduct: 6, quantity: 1},
        ]
    };
    const output = await checkout.execute(order);
    expect(output.total).toBe(20);
});

test("Deve fazer um pedido com items com moedas diferentes sem mock", async function() {
    const currencies = new Currencies();
    currencies.addCurrency('USD', 3);
    currencies.addCurrency('BRL', 1);
    const currencyGatewayStub = Sinon.stub(CurrencyGateway.prototype, "getCurrencies").resolves(currencies);
    // const mailerStub = Sinon.stub(Mailer.prototype, "send").resolves()
    const mailerSpy = Sinon.spy(Mailer.prototype, "send");
    const order = {
        cpf: "772.801.132-49",
        items: [
            {idProduct: 6, quantity: 1},
            {idProduct: 7, quantity: 1}
        ],
        email: 'nsosoares@gmail.com'
    };
    const output = await checkout.execute(order);
    expect(output.total).toBe(60);
    // expect(mailerSpy.calledOnce).toBeTruthy();
    // expect(mailerSpy.calledWith("nsosoares@gmail.com", "checkout success", "...")).toBeTruthy();
    currencyGatewayStub.restore();
    // mailerStub.restore();
    mailerSpy.restore();
});

test("Deve fazer um pedido com items com moedas diferentes com mock", async function() {
    const currencies = new Currencies();
    currencies.addCurrency('USD', 3);
    currencies.addCurrency('BRL', 1);
    const currencyGatewayMock = Sinon.mock(CurrencyGateway.prototype);
	currencyGatewayMock.expects("getCurrencies")
		.once()
		.resolves(currencies);
    const mailerMock = Sinon.mock(Mailer.prototype);
    mailerMock.expects("send")
    .once()
    .withArgs("nsosoares@gmail.com", "checkout success", "...");
    const order = {
        cpf: "772.801.132-49",
        items: [
            {idProduct: 6, quantity: 1},
            {idProduct: 7, quantity: 1}
        ],
        email: 'nsosoares@gmail.com'
    };
    const output = await checkout.execute(order);
    expect(output.total).toBe(60);
    // mailerMock.verify();
    // mailerMock.restore();
    currencyGatewayMock.verify();
    currencyGatewayMock.restore();
});

test("Deve fazer um pedido com items com moedas diferentes com fake", async function() {
    const order = {
        cpf: "772.801.132-49",
        items: [
            {idProduct: 6, quantity: 1},
            {idProduct: 7, quantity: 1}
        ],
        email: 'nsosoares@gmail.com'
    };

    const currencyGatewayFake: ICurrencyGateway = {
        async getCurrencies(): Promise<any> {
            const currencies = new Currencies();
            currencies.addCurrency('USD', 3);
            currencies.addCurrency('BRL', 1);
            return currencies;
        }
    }

    const log: {to: string, subject: string, message: string}[] = [];
    const mailerFake: IMailer = {
        async send(to: string, subject: string, message: string) {
            log.push({to, subject, message});
        }
    }
    
    const output = await new Checkout(productData, couponData, orderData, currencyGatewayFake, mailerFake).execute(order);
    expect(output.total).toBe(60);
    // expect(log).toHaveLength(1);
    // expect(log[0].to).toBe("nsosoares@gmail.com");
    // expect(log[0].subject).toBe("checkout success");
    // expect(log[0].message).toBe("...");
});

test("Deve fazer um pedido e obter o código do pedido", async function() {
    const order = {
        cpf: "772.801.132-49",
        items: [
            {idProduct: 6, quantity: 1},
        ]
    };
    
    const output = await checkout.execute(order);
    const year = new Date().getFullYear();
    expect(output.code).toBe(`${year}00000001`);
});