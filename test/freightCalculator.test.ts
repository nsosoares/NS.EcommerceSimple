import { FreightCalculator } from "../src/domain/entities/FreightCalculator";
import { Product } from "../src/domain/entities/Product";

test("Deve calcular um frente de um produto", function () {
    const product = {
        idProduct: 1, 
        price: 10, 
        width: 100, 
        height: 30, 
        length: 10, 
        weigth: 3 }
    const output = FreightCalculator.calculate(new Product(1, 10, 'A', 100, 30, 10, 3));
    expect(output).toBe(30);
});

test("Deve calcular um frete mínimo", function() {
    const output = FreightCalculator.calculate(new Product(1, 10, 'B', 10, 10, 10, 0.7));
    expect(output).toBe(10);
});