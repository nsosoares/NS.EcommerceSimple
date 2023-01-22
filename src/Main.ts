import { validate } from './CpfValidator';
import { Order } from './Order';


export function RegisterOrder(order: Order) {
    const cpfIsValid = validate(order.cpf);
    if(!cpfIsValid) throw new Error("Invalid CPF");
    return order.getTotalPrice();
}