import { Coupon } from '../entities/Coupon';
export interface ICouponData {
    getCoupon(code: string): Promise<Coupon>
}