export function validate (rawCpf:string) {
    if(!rawCpf) return false;
    const cleanCpf = clearCpf(rawCpf);
    if(cpfIsInvalidLength(cleanCpf)) return false;
    if(allDigitsTheSame(cleanCpf)) return false;
    const digit1 = calculateDigits(cleanCpf, 10);
    const digit2 = calculateDigits(cleanCpf, 11);  
    const verificationDigits = extractDigits(cleanCpf);  
    const resultDigits = `${digit1}${digit2}`;  
    return verificationDigits === resultDigits;
}

function clearCpf(cpf: string) {
    return cpf.replace(/\D/g, ""); 
}

function cpfIsInvalidLength(cpf: string) {
    return cpf.length !== 11;
}

function allDigitsTheSame(cpf: string) {
    const [firstDigit] = cpf;
    return [...cpf].every(digit => digit === firstDigit);
}

function extractDigits(cpf: string) {
    return cpf.slice(9);
}

function calculateDigits(cpf: string, factor: number) {
    let total = 0;
    for(let digit of cpf) {
        if(factor > 1) total += (parseInt(digit) * factor--);
    }
    const rest = total % 11;
    return (rest < 2) ? 0 : 11 - rest;
}