import { IConnection } from './../database/IConnection';
import { Coupon } from '../../domain/entities/Coupon';
import { ICouponData } from '../../domain/data/ICouponData';

export class CouponData implements ICouponData {
    constructor(readonly connection: IConnection) {

    }

    async getCoupon(code: string): Promise<Coupon> {
        const [couponData] = await this.connection.query(`select * from ecommerce.coupon where code = '${code}'`, [code]);
        if(!couponData) throw new Error("Invalid Coupon");
        const coupon = new Coupon(couponData.code, parseFloat(couponData.percentage), couponData.expire_date);
        return coupon;    
    }
}