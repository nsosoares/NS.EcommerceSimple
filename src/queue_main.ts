import { PgPromiseConnection } from './infra/database/PgPromiseConnection';
import { OrderData } from './infra/data/OrderData';
import { Checkout } from './application/Checkout';
import { ProductData } from './infra/data/ProductData';
import { CouponData } from './infra/data/CouponData';
import { RabbitMqAdapter } from './infra/queue/RabbitMqAdapter';
import { QueueController } from './infra/controller/QueueController';

async function init() {
    const queue = new RabbitMqAdapter();
    await queue.connect();
    const connection = new PgPromiseConnection();
    const productData = new ProductData(connection);
    const couponData = new CouponData(connection);
    const orderData = new OrderData(connection);
    const checkout = new Checkout(productData, couponData, orderData);
    new QueueController(queue, checkout);
}

init();