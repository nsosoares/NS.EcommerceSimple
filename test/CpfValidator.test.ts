import { validate } from "../src/CpfValidator"

const validCpfs = [
	"987.654.321-00",
	"714.602.380-01",
	"313.030.210-72",
	"144.796.170-60",
	"14479617060"
];

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
	"987.654.321-01",
	"714.602.380-10",
	"313.030.210-70",
	"144.796.170-10",
	"14479617010"
];

test.each(validCpfs)("Deve testar um CPF valido: %s", function(cpf: string) {
    const isValid = validate(cpf);
    expect(isValid).toBeTruthy();
});

test.each(invalidCpfs)("Deve testar um CPF invalido: %s", function(cpf: string) {
    const isValid = validate(cpf);
    expect(isValid).toBeFalsy();
});

test("Deve testar CPF com tamanho errado", function() {
    const isValid = validate('1234');
    expect(isValid).toBeFalsy();
});

