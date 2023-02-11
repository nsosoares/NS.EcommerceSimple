import { Checkout } from './../src/Checkout';
import { OrderData } from './../src/OrderData';
import { ProductData } from './../src/ProductData';
import { CouponData } from './../src/CouponData';
import { GetOrderByCpf } from '../src/GetOrderByCpf';

test("Deve consultar um pedido", async function() {
    const couponData = new CouponData();
    const productData = new ProductData();
    const orderData = new OrderData();
    const checkout = new Checkout(productData, couponData, orderData);
    const input = {
        cpf: "828.683.357-05",
        items: [
            {idProduct: 6, quantity: 1}
        ]
    };
    await checkout.execute(input);
    const getOrderByCpf = new GetOrderByCpf(orderData);
    const output = await getOrderByCpf.execute("828.683.357-05");
    expect(output.total).toBe(20);
});