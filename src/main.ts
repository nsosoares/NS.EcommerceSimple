import express from "express";
import { validate } from "./cpfValidator";
import pgp from "pg-promise";

const app = express();
const PORT = 3000;
app.use(express.json());

const connection = pgp()("postgres://postgres:123456789@localhost:5432/ecommerce");
//const connection = pgp()("server=localhost;port=5432;database=gso20012023;user id=postgres;password=123456789;");


// const products = [
//     {idProduct: 1, price: 10, description: "A"},
//     {idProduct: 2, price: 10, description: "B"},
//     {idProduct: 3, price: 10, description: "C"}
// ];

// const coupons = [
//     {code: "VALE20", percentage: 20}
// ];

app.get("/", (req, res) => {
    res.json({message: 'ok'});
});

app.post("/checkout", async (req, res) => {
    const cpfIsValid = validate(req.body.cpf);
    if(!cpfIsValid) {
        return res.status(422).json({
            message: "Invalid CPF"
        });
    }
    let total = 0;
    const items = req.body.items;
    for(let item of items) {
        // const product = products.find((product) => product.idProduct === item.idProduct);
        const [product] = await connection.query(`select * from ecommerce.product where id_product = ${item.idProduct}`);
        if(!product) {
            return res.status(422).json({
                message: "Product not exist"
            });
        }
        total += product.price * item.quantity;
    }

    if(req.body.coupon) {
    //    const coupon = coupons.find((coupon) => coupon.code === req.body.coupon);
        const [coupon] = await connection.query(`select * from ecommerce.coupon where code = '${req.body.coupon}'`);
       if(coupon) {
            total -= (total * coupon.percentage) / 100;
       } 
    }

    return res.status(422).json({
        total: total
    });
});

app.listen(PORT, () => {
    console.log(connection);
    console.log(`Rodando em ${PORT}`);
});