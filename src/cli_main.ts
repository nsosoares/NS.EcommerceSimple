import { Checkout } from "./application/Checkout";
import { CLIController } from "./infra/controller/CLIController";
import { CouponData } from "./infra/data/CouponData";
import { OrderData } from "./infra/data/OrderData";
import { ProductData } from "./infra/data/ProductData";
import { PgPromiseConnection } from "./infra/database/PgPromiseConnection";
import { CLIHandler } from "./infra/cli/CLIHandler";
import { CLIHandlerNode } from "./infra/cli/CLIHandlerNode";

const connection = new PgPromiseConnection();
const productData = new ProductData(connection);
const couponData = new CouponData(connection);
const orderData = new OrderData(connection);
const checkout = new Checkout(productData, couponData, orderData);
const handler = new CLIHandlerNode();
new CLIController(handler, checkout);
