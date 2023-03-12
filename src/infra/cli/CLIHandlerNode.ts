import { CLIHandler } from "./CLIHandler";

export class CLIHandlerNode extends CLIHandler {

    constructor() {
        super();
        process.stdin.on("data", (chunck) => {
            const text = chunck.toString().replace(/\n/g, '');
            this.type(text);
        });
    }

    write(text: string): void {
        console.log(text);
    }
}