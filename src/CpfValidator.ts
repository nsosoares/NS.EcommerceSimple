// @ts-nocheck

const MINIMUM_AMOUNT_OF_CHARACTERS = 11;


export function validate (cpf: string) {
    const cleanCpf = clearCpf(cpf);
    const checkDigits = extractDigits(cleanCpf);
    if(!cpfIsValid(cleanCpf)) return false;
    if(allDigitsTheSame(cleanCpf)) return false;
    //TODO:Refatoras esse calculo
    let resultadoPrimeiroDigito, resultadoSegundoDigito;  
    let primeiroDigitoVerificador, segundoDigitoVerificador, resultadoRestoDaDivisao;  
    let digito;  
    resultadoPrimeiroDigito = resultadoSegundoDigito = 0;  
    primeiroDigitoVerificador = segundoDigitoVerificador = resultadoRestoDaDivisao = 0;  
    for (let nCount = 1; nCount < cleanCpf.length - 1; nCount++) {  
        digito = parseInt(cleanCpf.substring(nCount - 1, nCount));  							
        resultadoPrimeiroDigito = resultadoPrimeiroDigito + ( 11 - nCount ) * digito;  
        resultadoSegundoDigito = resultadoSegundoDigito + ( 12 - nCount ) * digito;  
    };  
    resultadoRestoDaDivisao = (resultadoPrimeiroDigito % 11);  
    primeiroDigitoVerificador = (resultadoRestoDaDivisao < 2) ? primeiroDigitoVerificador = 0 : 11 - resultadoRestoDaDivisao;  
    resultadoSegundoDigito += 2 * primeiroDigitoVerificador;  
    resultadoRestoDaDivisao = (resultadoSegundoDigito % 11);  
    segundoDigitoVerificador = resultadoRestoDaDivisao < 2 ? 0 : 11 - resultadoRestoDaDivisao;
    const VerifierDigitsResult = `${primeiroDigitoVerificador}${segundoDigitoVerificador}`;  
    return checkDigits === VerifierDigitsResult;
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

function calculateDigits(cleanCpf: string) {
    let result = 0;
}

