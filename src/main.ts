import express from "express";
import { validate } from "./cpfValidator";

const app = express();
const PORT = 3000;
app.use(express.json());

const products = [
    {idProduct: 1, price: 10, description: "A"},
    {idProduct: 2, price: 10, description: "B"},
    {idProduct: 3, price: 10, description: "C"}
];

const coupons = [
    {code: "VALE20", percentage: 20}
];

app.get("/", (req, res) => {
    res.json({message: 'ok'});
});

app.post("/checkout", (req, res) => {
    const cpfIsValid = validate(req.body.cpf);
    if(!cpfIsValid) {
        return res.status(422).json({
            message: "Invalid CPF"
        });
    }
    let total = 0;
    const items = req.body.items;
    for(let item of items) {
        const product = products.find((product) => product.idProduct === item.idProduct);
        if(!product) {
            return res.status(422).json({
                message: "Product not exist"
            });
        }
        total += product.price * item.quantity;
    }

    if(req.body.coupon) {
       const coupon = coupons.find((coupon) => coupon.code === req.body.coupon);
       if(coupon) {
            total -= (total * coupon.percentage) / 100;
       } 
    }

    return res.status(422).json({
        total: total
    });
});

app.listen(PORT, () => {
    console.log(`Rodando em ${PORT}`);
});