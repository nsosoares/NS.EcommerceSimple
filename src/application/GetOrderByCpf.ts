import { IOrderData } from '../domain/data/IOrderData';
export class GetOrderByCpf {
    constructor(readonly orderData: IOrderData) {

    }

    async execute(cpf: string): Promise<Output> {
        const order = await this.orderData.getByCpf(cpf);
        return {
            total: parseFloat(order.total)
        }
    }
}

type Output = {
    total: number
}