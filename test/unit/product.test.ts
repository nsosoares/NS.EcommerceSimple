import { Product } from "../../src/domain/entities/Product";

test("Deve calcular o volume", function () {
    const product = new Product(1, 10, 'A', 100, 30, 10, 3);
    expect(product.getVolume()).toBe(0.03);
});

test("Deve calcular a densidade", function () {
    const product = new Product(1, 10, 'A', 100, 30, 10, 3);
    expect(product.getDensity()).toBe(100);
});

test("Deve validar se possui algum produto com dimensões negativas", function() {
    const product = new Product(1, 10, 'B', -1, 50, 50, 22);
    expect(() => product.validateDimension()).toThrow(new Error("Item with negative dimension"));
});

test("Deve validar se possui algum produto com peso negativo", function() {
    const product = new Product(1, 10, 'B', 50, 50, 50, -1);
    expect(() =>  product.validateDimension()).toThrow(new Error("Item with negative weight"));
});