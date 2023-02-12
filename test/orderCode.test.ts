import { OrderCode } from "../src/domain/entities/OrderCode";

test("Deve gerar um código de pedido", function() {
    const orderCode = new OrderCode(new Date('2023-02, 12'), 1);
    expect(orderCode.getValue()).toBe('202300000001');
});

test("Deve validar se a sequecia é positiva", function() {
    expect(() => new OrderCode(new Date('2023-02, 12'), -1)).toThrow(new Error("Sequence is negative"))
});
