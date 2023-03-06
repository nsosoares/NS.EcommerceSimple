export class Product {
    constructor(readonly idProduct: number, readonly price: number, readonly description: string, readonly width: number, readonly height: number, readonly length: number, readonly weigth: number, readonly currency: string = 'BRL') {
        
    }

    validateDimension() {
        if(this.width <= 0 || this.height <= 0 || this.width <= 0 || this.length <= 0) {
            throw new Error("Item with negative dimension");
        }
        if(this.weigth <= 0) {
            throw new Error("Item with negative weight");
        }
    }

    getVolume() {
        return (this.width / 100) * (this.height / 100) * (this.length / 100);
    }

    getDensity() {
        return  this.weigth / this.getVolume();
    }
}