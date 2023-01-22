import { Coupon } from "../src/Coupon";
import { RegisterOrder } from "../src/Main";
import { Order } from "../src/Order";
import { OrderItem } from "../src/OrderItem";
import { Product } from "../src/Product";

const orderItems: OrderItem[] = [
    new OrderItem(new Product(1, 'Lanterna', 20), 1),
    new OrderItem(new Product(2, 'Bermuda', 15), 1),
    new OrderItem(new Product(3, 'Calça', 12), 1),
];

test("Deve criar um pedido com 3 produtos e calcular valor total", function() {
    const order = new Order("987.654.321-00", orderItems);
    const totalPrice = RegisterOrder(order);
    expect(totalPrice).toBe(47);
});

test("Deve criar um pedido com 3 produtos, associar um cupom de desconto e calcular o total", function() {
    const order = new Order("987.654.321-00", orderItems, new Coupon("nic10", 10));
    const totalPrice = RegisterOrder(order);
    expect(totalPrice).toBe(42.3);
});

test("Não deve criar um pedido com cpf inválido (lançar algum tipo de erro)", function() {
    const order = new Order("111.111.111-11", orderItems);
    expect(() => RegisterOrder(order)).toThrow(new Error("Invalid CPF"));
});