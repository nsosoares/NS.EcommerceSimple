import { ICouponData } from './ICouponData';
import pgp from "pg-promise";

export class CouponData implements ICouponData {
    async getCoupon(code: string): Promise<any> {
        const connection = pgp()("postgres://postgres:123456789@localhost:5432/ecommerce");
        const [coupon] = await connection.query(`select * from ecommerce.coupon where code = '${code}'`);
        await connection.$pool.end();
        return coupon;    
    }

}