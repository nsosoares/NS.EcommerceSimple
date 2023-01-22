// @ts-nocheck
const MINIMUM_AMOUNT_OF_CHARACTERS = 11;

export function validate (cpf: string) {
    const cleanCpf = clearCpf(cpf);
    if(!cpfIsValid(cleanCpf)) return false;
    if(allDigitsTheSame(cleanCpf)) return false;
    const digit1 = calculateDigits(cleanCpf, 10);
    const digit2 = calculateDigits(cleanCpf, 11);
    const checkDigits = extractDigits(cleanCpf);
    const verifierDigitsResult = `${digit1}${digit2}`;  
    return checkDigits === verifierDigitsResult;
}

function clearCpf(cpf: string) {
    return cpf.replace(/\D/g, "");
}

function cpfIsValid(cleanCpf: string) {
    return cleanCpf !== null && cleanCpf !== undefined && cleanCpf.length === MINIMUM_AMOUNT_OF_CHARACTERS;
}

function allDigitsTheSame(cleanCpf: string) {
    const firstDigit = cleanCpf[0];
    return cleanCpf.split("").every(digit => digit === firstDigit);
}

function extractDigits(cleanCpf: string) {
    return cleanCpf.slice(9);
}

function calculateDigits(cleanCpf: string, factor: number) {
    let result = 0;
    for(const digit of cleanCpf) {
        if(factor > 1) result += factor-- * digit;
    }
    const rest = result % 11;
	return (rest < 2) ? 0 : 11 - rest;
}