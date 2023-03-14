import { Checkout } from './../../application/Checkout';
import { IHttpServer } from './../http/IHttpServer';
export class RestController {
    constructor(httpServer: IHttpServer, checkout: Checkout) {
        httpServer.on('post', '/checkout', async function(params: any, body: any) {
            const output = await checkout.execute(body);
            return output;
        });
    }
}