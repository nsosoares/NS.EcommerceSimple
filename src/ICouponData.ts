export interface ICouponData {
    getCoupon(code: string): Promise<any>
}