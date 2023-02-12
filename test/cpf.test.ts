import { Cpf } from "../src/domain/entities/Cpf";

const invalidCpfs = [
    "111.111.111-11",
    "222.2222.222-22",
    "333.333.333-33",
    "444.444.444-44",
    "555.555.555-55",
    "666.666.666-66",
    "777.777.777-77",
    "888.888.888-88",
    "999.999.999-99",
    "648.772.256-12",
    "366.289.702-56",
    "36628970256",
]

const validCpfs = [
    "772.801.132-49",
    "843.312.726-80",
    "306.261.804-30",
    "30626180430"
]

test.each(invalidCpfs)("Deve validar cpf invalido: %s", function(cpf) {
    expect(() => new Cpf(cpf)).toThrow("Invalid CPF"); 
});

test.each(validCpfs)("Deve validar CPF valido: %s", function(cpf) {
    expect(new Cpf(cpf).getValue()).toBe(cpf); 
});

test("Deve validar um CPF com caracteres Invalidos", function() {
    expect(() => new Cpf('123')).toThrow("Invalid CPF"); 
});