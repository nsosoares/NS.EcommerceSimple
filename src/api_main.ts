import { RestController } from './infra/controller/RestController';
import { PgPromiseConnection } from './infra/database/PgPromiseConnection';
import { OrderData } from './infra/data/OrderData';
import { Checkout } from "./application/Checkout";
import { CouponData } from "./infra/data/CouponData";
import { ProductData } from "./infra/data/ProductData";
import { ExpressHttpServer } from './infra/http/ExpressHttpServer';
import { HapiHttpServer } from './infra/http/HapiHttpServer';

const connection = new PgPromiseConnection();
const httpServer = new ExpressHttpServer();
//const httpServer = new HapiHttpServer();
const productData = new ProductData(connection);
const couponData = new CouponData(connection);
const orderData = new OrderData(connection);
const checkout = new Checkout(productData, couponData, orderData);
new RestController(httpServer, checkout);
httpServer.listen(3000);