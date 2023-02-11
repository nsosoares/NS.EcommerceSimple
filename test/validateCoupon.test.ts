import { ValidateCoupon } from '../src/ValidateCoupon';
import { CouponData } from './../src/CouponData';

test("Deve validar um cupom de desconto", async function() {
    const couponData = new CouponData();
    const validateCoupon = new ValidateCoupon(couponData);
    const output = await validateCoupon.execute('VALE20', 50);
    expect(output.isExpired).toBeFalsy();
});