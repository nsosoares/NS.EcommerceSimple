export interface IOrderData {
    save(order: any): Promise<void>;
    getByCpf(cpf: string): Promise<any>;
    count(): Promise<number>;
}