import { PgPromiseConnection } from '../../src/infra/database/PgPromiseConnection';
import { SimulateFreight } from '../../src/application/SimulateFreight';
import { ProductData } from '../../src/infra/data/ProductData';
test("Deve simular o valor de um frete", async function() {
    const input = {
        cpf: "772.801.132-49",
        items: [
            {idProduct: 1, quantity: 1},
            {idProduct: 2, quantity: 1},
            {idProduct: 3, quantity: 2},
        ]
    };
    const connection = new PgPromiseConnection();
    const productData = new ProductData(connection);
    const simulateFreight = new SimulateFreight(productData);
    const output = await simulateFreight.execute(input);
    expect(output.total).toBe(260);
    await connection.close();
});