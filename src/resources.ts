import pgp from "pg-promise";

export async function getProduct(idProduct: number): Promise<any> {
    const connection = pgp()("postgres://postgres:123456789@localhost:5432/ecommerce");
    const [product] = await connection.query(`select * from ecommerce.product where id_product = ${idProduct}`);
    return product;
}

export async function getCoupon(code: string): Promise<any> {
    const connection = pgp()("postgres://postgres:123456789@localhost:5432/ecommerce");
    const [coupon] = await connection.query(`select * from ecommerce.coupon where code = '${code}'`);
    return coupon;
}