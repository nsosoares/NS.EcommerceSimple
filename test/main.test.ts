import axios from "axios";

axios.defaults.validateStatus = function () {
    return true;
}

test("Deve validar um pedido com CPF invalido", async function() {
    const input = {
        cpf: "772.801.132-43"
    }
    const response = await axios.post("http://localhost:3000/checkout", input);
    expect(response.status).toBe(422);
    const output = response.data;
    expect(output.message).toBe("Invalid CPF");
});

test("Deve criar um pedido com 3 produtos", async function() {
    const order = {
        cpf: "772.801.132-49",
        items: [
            {idProduct: 1, quantity: 1},
            {idProduct: 2, quantity: 1},
            {idProduct: 3, quantity: 2},
        ]
    };
    const response = await axios.post("http://localhost:3000/checkout", order);
    const output = response.data;
    expect(output.total).toBe(40);
});

test("Deve validar produto não existente", async function () {
    const order = {
        cpf: "772.801.132-49",
        items: [
            {idProduct: 4, quantity: 1}
        ]
    };
    const response = await axios.post("http://localhost:3000/checkout", order);
    const output = response.data;
    expect(output.message).toBe("Product not exist");
});

test("Deve fazer um pedido com 3 produtos com cupom de desconto", async function() {
    const order = {
        cpf: "772.801.132-49",
        items: [
            {idProduct: 1, quantity: 1},
            {idProduct: 2, quantity: 1},
            {idProduct: 3, quantity: 2}
        ],
        coupon: "VALE20"
    };
    const response = await axios.post("http://localhost:3000/checkout", order);
    const output = response.data;
    expect(output.total).toBe(32);
});

