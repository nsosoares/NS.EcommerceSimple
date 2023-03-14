import { Checkout } from "../../application/Checkout";
import { IQueueHandler } from "../queue/IQueueHandler";

export class QueueController {
    constructor(handler: IQueueHandler, checkout: Checkout) {
        handler.on("checkout", async function(input: any) {
            const output = await checkout.execute(input);
            console.log(output);
        });
    }
}