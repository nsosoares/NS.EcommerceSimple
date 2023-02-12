import { PgPromiseConnection } from './infra/database/PgPromiseConnection';
import { OrderData } from './infra/data/OrderData';
import { CouponData } from './infra/data/CouponData';
import { ProductData } from './infra/data/ProductData';
import { Checkout } from "./application/Checkout";

const input: any = {
    items: []
}

process.stdin.on("data", async function (chunck) {
    const command = chunck.toString().replace(/\n/g, '');
    if(command.startsWith("set-cpf")){
        const params = command.replace("set-cpf ", "");
        input.cpf = params;
    }
    if(command.startsWith("add-item")) {
        const params = command.replace("add-item ", "");
        const [idProduct, quantity] = params.split(" ");
        input.items.push({ idProduct, quantity });
    }
    if(command.startsWith("checkout")) {
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
    }
});


