import { ICouponData } from '../domain/data/ICouponData';
export class ValidateCoupon {
    constructor(readonly couponData: ICouponData) {

    }

    async execute(code: string, total: number): Promise<Output> {
        const coupon = await this.couponData.getCoupon(code);
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