export class Cpf {
    private value: string;
    constructor(cpf: string) {
        if(!this.validate(cpf)) {
            throw new Error("Invalid CPF");
        }
        this.value = cpf;
    }

    private validate (rawCpf:string) {
        if(!rawCpf) return false;
        const cleanCpf = this.clearCpf(rawCpf);
        if(this.cpfIsInvalidLength(cleanCpf)) return false;
        if(this.allDigitsTheSame(cleanCpf)) return false;
        const digit1 = this.calculateDigits(cleanCpf, 10);
        const digit2 = this.calculateDigits(cleanCpf, 11);  
        const verificationDigits = this.extractDigits(cleanCpf);  
        const resultDigits = `${digit1}${digit2}`;  
        return verificationDigits === resultDigits;
    }
    
    private clearCpf(cpf: string) {
        return cpf.replace(/\D/g, ""); 
    }
    
    private cpfIsInvalidLength(cpf: string) {
        return cpf.length !== 11;
    }
    
    private allDigitsTheSame(cpf: string) {
        const [firstDigit] = cpf;
        return [...cpf].every(digit => digit === firstDigit);
    }
    
    private extractDigits(cpf: string) {
        return cpf.slice(9);
    }
    
    private calculateDigits(cpf: string, factor: number) {
        let total = 0;
        for(let digit of cpf) {
            if(factor > 1) total += (parseInt(digit) * factor--);
        }
        const rest = total % 11;
        return (rest < 2) ? 0 : 11 - rest;
    }

    getValue(): string {
        return this.value;
    }
}