import { FreightCalculator } from './FreightCalculator';
import { IProductData } from './IProductData';
export class SimulateFreight {
    constructor(readonly productData: IProductData) {

    }

    async execute(input: Input): Promise<Output> {
        let total = 0;
        for(let item of input.items) {
            const product = await this.productData.getProduct(item.idProduct);
            if(product) {
                total += FreightCalculator.calculate(product);
            } else {
                throw new Error("Product not exist");
            }
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