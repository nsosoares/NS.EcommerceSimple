import { Coupon } from '../../src/domain/entities/Coupon';
import { Order } from "../../src/domain/entities/Order";
import { Product } from "../../src/domain/entities/Product";

test("Deve criar um pedido com cpf válido", function () {
    const order = new Order("772.801.132-49");
    expect(order.getTotal()).toBe(0);
});

test("Deve criar um pedido com cpf inválido", function() {
    expect(() => new Order("111.111.111-11")).toThrow(new Error("Invalid CPF"));
});

test("Deve criar um pedido com 3 items", function() {
    const order = new Order("772.801.132-49");
    order.addItem(new Product(1, 10, 'A', 100, 30, 10, 3), 1);
    order.addItem(new Product(2, 10, 'B', 50, 50, 50, 22), 1);
    order.addItem(new Product(3, 10, 'C', 10, 10, 10, 0.9), 2);
    expect(order.getTotal()).toBe(300);
});

test("Deve criar um pedido com 3 items e com cupom de desconto", function() {
    const order = new Order("772.801.132-49");
    order.addItem(new Product(1, 10, 'A', 100, 30, 10, 3), 1);
    order.addItem(new Product(2, 10, 'B', 50, 50, 50, 22), 1);
    order.addItem(new Product(3, 10, 'C', 10, 10, 10, 0.9), 2);
    order.addCoupon(new Coupon('VALE20', 20, new Date('2024-02-10')));
    expect(order.getTotal()).toBe(292);
});

test("Deve criar um pedido e gerar o código", function() {
    const order = new Order("772.801.132-49", new Date('2022-04-01'), 1);
    order.addItem(new Product(1, 10, 'A', 100, 30, 10, 3), 1);
    order.addItem(new Product(2, 10, 'B', 50, 50, 50, 22), 1);
    order.addItem(new Product(3, 10, 'C', 10, 10, 10, 0.9), 2);
    order.addCoupon(new Coupon('VALE20', 20, new Date('2024-02-10')));
    expect(order.getCode()).toBe('202200000001');
});

test("Deve validar se possui algum item repetido", function() {
    const order = new Order("772.801.132-49");
    order.addItem(new Product(1, 10, 'A', 100, 30, 10, 3), 1);
    expect(() =>  order.addItem(new Product(1, 10, 'B', 50, 50, 50, 22), 1)).toThrow(new Error("Has repeated item"));
});


test("Deve validar se possui algum item com quantidade negativa", function() {
    const order = new Order("772.801.132-49");
    expect(() =>  order.addItem(new Product(1, 10, 'B', 50, 50, 50, 22), -1)).toThrow(new Error("Invalid product quantity"));
});

test("Deve validar se possui algum produto com dimensões negativas", function() {
    const order = new Order("772.801.132-49");
    expect(() =>  order.addItem(new Product(1, 10, 'B', -1, 50, 50, 22), 1)).toThrow(new Error("Item with negative dimension"));
});

test("Deve validar se possui algum produto com peso negativo", function() {
    const order = new Order("772.801.132-49");
    const product = new Product(1, 10, 'B', 50, 50, 50, -1);
    expect(() =>  order.addItem(product, 1)).toThrow(new Error("Item with negative weight"));
});