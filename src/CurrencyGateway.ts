import { ICurrencyGateway } from './ICurrencyGateway';
export class CurrencyGateway implements ICurrencyGateway {
    async getCurrencies() {
        return {
            "USD": 3 + Math.random(),
            "BRL": 1
        }
    }
}