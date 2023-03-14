import { Currencies } from '../../domain/entities/Curriencies';
export interface ICurrencyGateway {
    getCurrencies(): Promise<Currencies>
}