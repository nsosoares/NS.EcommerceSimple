import { Currencies } from '../../domain/entities/Curriencies';
import { ICurrencyGateway } from './ICurrencyGateway';
export class CurrencyGateway implements ICurrencyGateway {
    async getCurrencies(): Promise<Currencies> {
        const currencies = new Currencies();
        currencies.addCurrency('USD', 3 + Math.random());
        currencies.addCurrency('BRL', 1);
        return currencies;
    }
}