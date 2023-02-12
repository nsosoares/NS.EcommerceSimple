import { PgPromiseConnection } from './infra/database/PgPromiseConnection';
import { OrderData } from './infra/data/OrderData';
import { Checkout } from './application/Checkout';
import amqp from "amqplib";
import { ProductData } from './infra/data/ProductData';
import { CouponData } from './infra/data/CouponData';

async function init() {
    const connectionQueue = await amqp.connect("amqp://localhost");
    const channel = await connectionQueue.createChannel();
    await channel.assertQueue("checkout", { durable: true });
    await channel.consume("checkout", async function(msg: any) {
        const input = JSON.parse(msg.content.toString());
        try {
            const connection = new PgPromiseConnection();
            const productData = new ProductData(connection);
            const couponData = new CouponData(connection);
            const orderData = new OrderData(connection);
            const checkout = new Checkout(productData, couponData, orderData);
            const total = await checkout.execute(input);
            await connection.close();
            console.log(total);
        } catch(error: any) {
            console.log(error.message);
        }
        channel.ack(msg);
    })
}

init();