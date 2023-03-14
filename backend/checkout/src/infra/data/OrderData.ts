import { IConnection } from './../database/IConnection';
import { Order } from '../../domain/entities/Order';
import { IOrderData } from '../../domain/data/IOrderData';

export class OrderData implements IOrderData {
   
    constructor(readonly connection: IConnection) {

    }

    async save(order: Order): Promise<void> {
        await this.connection.query(`insert into ecommerce.order (cpf, total) values ('${order.cpf.getValue()}', ${order.getTotal()})`, [order]);
    }

    async getByCpf(cpf: string): Promise<any> {
        const [order] = await this.connection.query(`select * from ecommerce.order where cpf = '${cpf}'`, [cpf]);
        return order;
    }

    async count(): Promise<number> {
        const [options] = await this.connection.query('select count(*)::integer from ecommerce.order', []);
        return options.count;    
    }
}