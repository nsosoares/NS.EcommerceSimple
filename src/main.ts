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
    let freight = 0;
    const items = req.body.items;
    for(let item of items) {
        const ItemSameId = items.filter((product: any) => product.idProduct === item.idProduct);
        if(ItemSameId.length > 1) {
            return res.status(422).json({
                message: "Has repeated item"
            });
        }
        if(item.quantity <= 0) {
            return res.status(422).json({
                message: "Invalid product quantity"
            });
        }
        const [product] = await connection.query(`select * from ecommerce.product where id_product = ${item.idProduct}`);
        if(!product) {
            return res.status(422).json({
                message: "Product not exist"
            });
        }
        if(product.width <= 0 || product.height <= 0 || product.width <= 0 || product.length <= 0) {
            return res.status(422).json({
                message: "Item with negative dimension"
            });
        }
        if(product.weigth <= 0) {
            return res.status(422).json({
                message: "Item with negative weight"
            });
        }
        const volume = (product.width / 100) * (product.height / 100) * (product.length / 100);
        const density = parseFloat(product.weigth)/volume;
        const itemFreight = 1000 * volume * (density / 100);
        freight += (itemFreight >= 10) ? itemFreight : 10;
        total += product.price * item.quantity;
    }

    total += freight;

    if(req.body.coupon) {
    //    const coupon = coupons.find((coupon) => coupon.code === req.body.coupon);
        const [coupon] = await connection.query(`select * from ecommerce.coupon where code = '${req.body.coupon}'`);
        if(!coupon) {
            return res.status(422).json({
                message: "Coupon does not exist"
            });
        }
        if(coupon.expire_date < new Date()) {
            return res.status(422).json({
                message: "Expired Coupon"
            });
        }
        total -= (total * coupon.percentage) / 100;
    }

    return res.status(200).json({
        total: total
    });
});

app.listen(PORT, () => {
    console.log(`Rodando em ${PORT}`);
});