import Sinon from "sinon";
import { Checkout } from "../src/application/Checkout";
import { CLIController } from "../src/infra/controller/CLIController";
import { CouponData } from "../src/infra/data/CouponData";
import { OrderData } from "../src/infra/data/OrderData";
import { ProductData } from "../src/infra/data/ProductData";
import { PgPromiseConnection } from "../src/infra/database/PgPromiseConnection";
import { CLIHandlerMemory } from "../src/infra/cli/CLIHandlerMemory";

test("Deve testar o CLI", async function() {
    const connection = new PgPromiseConnection();
    const productData = new ProductData(connection);
    const couponData = new CouponData(connection);
    const orderData = new OrderData(connection);
    const checkout = new Checkout(productData, couponData, orderData);
    const checkoutSpy = Sinon.spy(checkout, "execute");
    const handler = new CLIHandlerMemory();
    new CLIController(handler, checkout);
    await handler.type("set-cpf 772.801.132-49");
    await handler.type("add-item 1 1");
    await handler.type("checkout");
    const [returnValues] = checkoutSpy.returnValues;
    const output = await returnValues;
    console.log(output);
    expect(output.code).toBe('202300000001');
    expect(output.total).toBe(40);
    checkoutSpy.restore();
});