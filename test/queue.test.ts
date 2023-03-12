import Sinon from "sinon";
import { Checkout } from "../src/application/Checkout";
import { QueueController } from "../src/infra/controller/QueueController";
import { CouponData } from "../src/infra/data/CouponData";
import { OrderData } from "../src/infra/data/OrderData";
import { ProductData } from "../src/infra/data/ProductData";
import { PgPromiseConnection } from "../src/infra/database/PgPromiseConnection";
import { QueueMemory } from "../src/infra/queue/QueueMemory";

test("Deve testar a fila", async function () {
    const connection = new PgPromiseConnection();
    const productData = new ProductData(connection);
    const couponData = new CouponData(connection);
    const orderData = new OrderData(connection);
    const checkout = new Checkout(productData, couponData, orderData);
    const checkoutSpy = Sinon.spy(checkout, "execute");
    const queue = new QueueMemory();
    new QueueController(queue, checkout);
    const order = {
        cpf: "772.801.132-49",
        items: [
            {idProduct: 1, quantity: 1},
        ]
    };
    await queue.execute("checkout", order);
    const [returnValues] = checkoutSpy.returnValues;
    const output = await returnValues;
    expect(output.code).toBe("202300000001");
    expect(output.total).toBe(40);
    checkoutSpy.restore();
});