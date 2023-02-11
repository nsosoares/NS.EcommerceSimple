import { OrderData } from './OrderData';
import { CouponData } from './CouponData';
import { ProductData } from './ProductData';
import { Checkout } from "./Checkout";

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
            const productData = new ProductData();
            const couponData = new CouponData();
            const orderData = new OrderData();
            const checkout = new Checkout(productData, couponData, orderData);
            const total = await checkout.execute(input);
            console.log(total);
        } catch(error: any) {
            console.log(error.message);
        }
    }
});


