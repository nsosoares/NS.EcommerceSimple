import { Checkout } from './Checkout';
import amqp from "amqplib";
import { ProductData } from './ProductData';
import { CouponData } from './CouponData';

async function init() {
    const connectionQueue = await amqp.connect("amqp://localhost");
    const channel = await connectionQueue.createChannel();
    await channel.assertQueue("checkout", { durable: true });
    await channel.consume("checkout", async function(msg: any) {
        const input = JSON.parse(msg.content.toString());
        try {
            const productData = new ProductData();
            const couponData = new CouponData();
            const checkout = new Checkout(productData, couponData);
            const total = await checkout.execute(input);
            console.log(total);
        } catch(error: any) {
            console.log(error.message);
        }
        channel.ack(msg);
    })
}

init();