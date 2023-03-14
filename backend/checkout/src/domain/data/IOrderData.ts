import { Order } from '../entities/Order';
export interface IOrderData {
    save(order: Order): Promise<void>;
    getByCpf(cpf: string): Promise<any>;
    count(): Promise<number>;
}