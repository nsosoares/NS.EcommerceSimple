import express from 'express';
import { IHttpServer } from './IHttpServer';
export class ExpressHttpServer implements IHttpServer {
    private app: any;
    constructor() {
        this.app = express();
        this.app.use(express.json());
    }

    on(method: string, url: string, callback: Function): void {
        this.app[method](url, async function (req: any, res: any){
            try {
                const output = await callback(req.params, req.body);
                res.json(output);
            } catch (error: any) {
                res.status(422).json({
                    message: error.message
                });
            }
        });
    }

    listen(port: number): void {
        this.app.listen(port, () => {
            console.log(`Rodando em ${port}`);
        });
    }
}