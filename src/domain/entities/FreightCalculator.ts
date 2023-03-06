import { Product } from './Product';
export class FreightCalculator {
    static calculate(product: Product): number {
        const volume = product.getVolume();
        const density = product.getDensity();
        const itemFreight = 1000 * volume * (density / 100);
        return (itemFreight >= 10) ? itemFreight : 10;
    }
}