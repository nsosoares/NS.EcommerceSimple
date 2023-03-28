export class Product {
    constructor(readonly idProduct: number, readonly description: string, readonly price: number, readonly width: number, readonly height: number, readonly length: number, readonly weight: number, readonly currency: string = "BRL") {
        
    }

    validateDimension() {
        if(this.width <= 0 || this.height <= 0 || this.width <= 0 || this.length <= 0) {
            throw new Error("Item with negative dimension");
        }
        if(this.weight <= 0) {
            throw new Error("Item with negative weight");
        }
    }

    getVolume() {
        return (this.width / 100) * (this.height / 100) * (this.length / 100);
    }

    getDensity() {
        return  this.weight / this.getVolume();
    }
}