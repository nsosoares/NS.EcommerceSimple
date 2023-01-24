import { validate } from "../src/main"

const invalidCpfs = [
    "111.111.111-11",
    "222.222.222-22",
    "333.333.333-33",
    "444.444.444-44",
    "555.555.555-55",
    "666.666.666-66",
    "777.777.777-77",
    "888.888.888-88",
    "999.999.999-99",
    "000.000.000-00",
    "988.514.879-23",
    "988.514.879-14"
]

const validCpfs = [
    "988.514.879-52",
    "016.229.117-50",
    "172.843.501-30",
    "173.364.114-95"
]

test.each(invalidCpfs)("Deve validar um CPF invalido: %s", function(cpf) {
    const ehValido = validate(cpf);
    expect(ehValido).toBeFalsy();
});

test.each(validCpfs)("Deve validarr um CPF válido: %s", function(cpf) {
    const ehValido = validate(cpf);
    expect(ehValido).toBeTruthy();
});

test("Deve validar um CPF com Caracteres invalidos", function() {
    const ehValido = validate("123");
    expect(ehValido).toBeFalsy();
});