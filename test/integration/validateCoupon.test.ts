import { PgPromiseConnection } from '../../src/infra/database/PgPromiseConnection';
import { ValidateCoupon } from '../../src/application/ValidateCoupon';
import { CouponData } from '../../src/infra/data/CouponData';

test("Deve validar um cupom de desconto", async function() {
    const connection = new PgPromiseConnection();
    const couponData = new CouponData(connection);
    const validateCoupon = new ValidateCoupon(couponData);
    const output = await validateCoupon.execute('VALE20', 50);
    expect(output.isExpired).toBeFalsy();
    await connection.close();
});