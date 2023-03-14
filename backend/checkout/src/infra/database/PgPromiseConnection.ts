import { IConnection } from './IConnection';
import pgp from "pg-promise";

export class PgPromiseConnection implements IConnection {
    pgp: any;
    constructor() {
        this.pgp = pgp()("postgres://postgres:123456789@localhost:5432/ecommerce");
    }

    async query(statement: string, params: any): Promise<any> {
        return await this.pgp.query(statement, params);
    }

    close(): Promise<void> {
        return this.pgp.$pool.end();
    }
}