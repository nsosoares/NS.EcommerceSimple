import { FreightCalculator } from "../src/FreightCalculator";

test("Deve calcular um frente de um produto", function () {
    const product = {
        idProduct: 1, 
        price: 10, 
        width: 100, 
        height: 30, 
        length: 10, 
        weigth: 3 }
    const output = FreightCalculator.calculate(product);
    expect(output).toBe(30);
});

test("Deve calcular um frete mínimo", function() {
    const product = {
        idProduct: 1, 
        price: 10, 
        width: 10, 
        height: 10, 
        length: 10, 
        weigth: 0.7 }
    const output = FreightCalculator.calculate(product);
    expect(output).toBe(10);
});