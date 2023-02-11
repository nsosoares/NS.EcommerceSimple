import { OrderData } from './OrderData';
import express from "express";
import { Checkout } from "./Checkout";
import { CouponData } from "./CouponData";
import { ProductData } from "./ProductData";

const app = express();
const PORT = 3000;
app.use(express.json());

app.get("/", (req, res) => {
    res.json({message: 'ok'});
});

app.post("/checkout", async (req, res) => {
    const input = req.body;
    try{
        const productData = new ProductData();
        const couponData = new CouponData();
        const orderData = new OrderData();
        const checkout = new Checkout(productData, couponData, orderData);
        const total = await checkout.execute(input);
        console.log(total);
        return res.status(200).json(total);
    } catch(error: any) {
        return res.status(422).json({
            message: error.message
        });
    }
});

app.listen(PORT, () => {
    console.log(`Rodando em ${PORT}`);
});