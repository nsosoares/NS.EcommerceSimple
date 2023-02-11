import { IOrderData } from './IOrderData';
import pgp from "pg-promise";

export class OrderData implements IOrderData {
   
    async save(order: any): Promise<void> {
        const connection = pgp()("postgres://postgres:123456789@localhost:5432/ecommerce");
        await connection.query(`insert into ecommerce.order (cpf, total) values ('${order.cpf}', ${order.total})`);
        await connection.$pool.end();
    }

    async getByCpf(cpf: string): Promise<any> {
        const connection = pgp()("postgres://postgres:123456789@localhost:5432/ecommerce");
        const [order] = await connection.query(`select * from ecommerce.order where cpf = '${cpf}'`);
        await connection.$pool.end();
        return order;
    }

    async count(): Promise<number> {
        const connection = pgp()("postgres://postgres:123456789@localhost:5432/ecommerce");
        const [options] = await connection.query('select count(*)::integer from ecommerce.order', []);
        await connection.$pool.end();
        return options.count;    
    }
}