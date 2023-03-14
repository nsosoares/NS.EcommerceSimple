import { FreightCalculator } from '../domain/entities/FreightCalculator';
import { IProductData } from '../domain/data/IProductData';
export class SimulateFreight {
    constructor(readonly productData: IProductData) {

    }

    async execute(input: Input): Promise<Output> {
        let total = 0;
        for(let item of input.items) {
            const product = await this.productData.getProduct(item.idProduct);
            total += FreightCalculator.calculate(product);
        }
        return {
            total: total
        }
    }
}

type Input = {
    items: {idProduct: number, quantity: number}[]
}

type Output = {
    total: number
}