import { Coupon } from './Coupon';
import { ICouponData } from './ICouponData';
export class ValidateCoupon {
    constructor(readonly couponData: ICouponData) {

    }

    async execute(code: string, total: number): Promise<Output> {
        const couponData = await this.couponData.getCoupon(code);
        const coupon = new Coupon(couponData.code, couponData.percentage, couponData.expire_date);
        return {
            isExpired: coupon.isExpired(),
            discount: coupon.getDiscount(total)
        }
    }
}

type Output = {
    isExpired: boolean,
    discount: number
}