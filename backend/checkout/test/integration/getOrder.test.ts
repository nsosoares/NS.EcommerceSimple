import { PgPromiseConnection } from '../../src/infra/database/PgPromiseConnection';
import { Checkout } from '../../src/application/Checkout';
import { OrderData } from '../../src/infra/data/OrderData';
import { ProductData } from '../../src/infra/data/ProductData';
import { CouponData } from '../../src/infra/data/CouponData';
import { GetOrderByCpf } from '../../src/application/GetOrderByCpf';

test("Deve consultar um pedido", async function() {
    const connection = new PgPromiseConnection();
    const couponData = new CouponData(connection);
    const productData = new ProductData(connection);
    const orderData = new OrderData(connection);
    const checkout = new Checkout(productData, couponData, orderData);
    const input = {
        cpf: "828.683.357-05",
        items: [
            {idProduct: 3, quantity: 1}
        ]
    };
    await checkout.execute(input);
    const getOrderByCpf = new GetOrderByCpf(orderData);
    const output = await getOrderByCpf.execute("828.683.357-05");
    expect(output.total).toBe(40);
    await connection.close();
});