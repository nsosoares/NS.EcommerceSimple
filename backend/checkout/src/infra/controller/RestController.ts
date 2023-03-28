import { Checkout } from './../../application/Checkout';
import { IHttpServer } from './../http/IHttpServer';
export class RestController {
    constructor(httpServer: IHttpServer, checkout: Checkout) {
        httpServer.on('get', '/products', async function(params: any, body: any) {
            console.log('GET /products');
            const output = [
                { idProduct: 4, description: 'D', price: 1000 }
            ];
            return output;
        });
        httpServer.on('post', '/checkout', async function(params: any, body: any) {
            console.log('POST /checkout');
            console.log(body);
            const output = await checkout.execute(body);
            return output;
        });
    }
}