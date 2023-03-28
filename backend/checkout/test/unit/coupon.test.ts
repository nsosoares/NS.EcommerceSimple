import { Coupon } from "../../src/domain/entities/Coupon";

test("Deve validar se um cupom esta expirado", function() {
    const coupon = new Coupon('VALE20', 20, new Date('2022-02-15'));
    expect(coupon.isExpired()).toBeTruthy();
});

test("Deve obter um desconto encima de um valor total", function() {
    const coupon = new Coupon('VALE20', 20, new Date('2023-05-15'));
    expect(coupon.getDiscount(200)).toBe(40);
})