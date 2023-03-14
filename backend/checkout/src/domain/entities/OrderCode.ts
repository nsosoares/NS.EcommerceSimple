export class OrderCode {
    private value: string;
    constructor(readonly date: Date, readonly sequence: number) {
        if(sequence <= 0) throw new Error("Sequence is negative");
        this.value = `${date.getFullYear()}${new String(sequence).padStart(8, "0")}`;
    }

    getValue(): string {
        return  this.value;
    }
}