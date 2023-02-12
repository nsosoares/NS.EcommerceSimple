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
    expect(output.total).toBe(300);
});

test("Deve validar produto não existente", async function () {
    const order = {
        cpf: "772.801.132-49",
        items: [
            {idProduct: 8, quantity: 1}
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
    expect(output.total).toBe(292);
});

test("Deve fazer um pedido com cupom expirado", async function() {
    const order = {
        cpf: "772.801.132-49",
        items: [
            {idProduct: 1, quantity: 1},
            {idProduct: 2, quantity: 1},
            {idProduct: 3, quantity: 2}
        ],
        coupon: "VALE10"
    };
    const response = await axios.post("http://localhost:3000/checkout", order);
    const output = response.data;
    expect(output.total).toBe(300);
});

test("Deve fazer um pedido com cupom inexistente", async function() {
    const order = {
        cpf: "772.801.132-49",
        items: [
            {idProduct: 1, quantity: 1},
            {idProduct: 2, quantity: 1},
            {idProduct: 3, quantity: 2}
        ],
        coupon: "VALE40"
    };
    const response = await axios.post("http://localhost:3000/checkout", order);
    const output = response.data;
    expect(output.message).toBe("Invalid Coupon");
});

test("Deve fazer um pedido com a quantidade negativa", async function() {
    const order = {
        cpf: "772.801.132-49",
        items: [
            {idProduct: 2, quantity: -1},
        ]
    };
    const response = await axios.post("http://localhost:3000/checkout", order);
    expect(response.status).toBe(422);
    const output = response.data;
    expect(output.message).toBe("Invalid product quantity");
});

test("Deve fazer um pedido com items repetidos", async function() {
    const order = {
        cpf: "772.801.132-49",
        items: [
            {idProduct: 2, quantity: 2},
            {idProduct: 2, quantity: 2},
        ]
    };
    const response = await axios.post("http://localhost:3000/checkout", order);
    expect(response.status).toBe(422);
    const output = response.data;
    expect(output.message).toBe("Has repeated item");
});

test("Deve fazer um pedido com item com dimensão negativa", async function() {
    const order = {
        cpf: "772.801.132-49",
        items: [
            {idProduct: 4, quantity: 2},
        ]
    };
    const response = await axios.post("http://localhost:3000/checkout", order);
    expect(response.status).toBe(422);
    const output = response.data;
    expect(output.message).toBe("Item with negative dimension");
});

test("Deve fazer um pedido com item com peso negativo", async function() {
    const order = {
        cpf: "772.801.132-49",
        items: [
            {idProduct: 1, quantity: 1},
            {idProduct: 5, quantity: 2},
        ]
    };
    const response = await axios.post("http://localhost:3000/checkout", order);
    expect(response.status).toBe(422);
    const output = response.data;
    expect(output.message).toBe("Item with negative weight");
});

test("Deve fazer um pedido calculando o frete", async function() {
    const order = {
        cpf: "772.801.132-49",
        items: [
            {idProduct: 1, quantity: 1},
        ]
    };
    const response = await axios.post("http://localhost:3000/checkout", order);
    const output = response.data;
    expect(output.total).toBe(40);
});

test("Deve fazer um pedido calculando o valor minimo de frete", async function() {
    const order = {
        cpf: "772.801.132-49",
        items: [
            {idProduct: 6, quantity: 1},
        ]
    };
    const response = await axios.post("http://localhost:3000/checkout", order);
    const output = response.data;
    expect(output.total).toBe(20);
});