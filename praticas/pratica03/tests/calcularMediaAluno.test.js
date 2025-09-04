const { calcularMediaAluno} = require('../src/calcularMediaAluno');

describe('Calcular a Media', () => {
    test('Deve existir a função calcularMediaAluno', () => {
      expect(calcularMediaAluno).toBeDefined();
    });

    test('teste para quando "a1" ou "a2" estiverem indefinidos  ', () => {
        expect(() => calcularMediaAluno(5, undefined).toThrow("Notas não indefinidas"));
        expect(() => calcularMediaAluno(undefined, 8).toThrow("Notas não indefinidas"));
      });

      test('teste para quando "a1" ou "a2" forem negativos ', () => {
        expect(() => calcularMediaAluno(5, -4).toThrow("Notas a1 ou a2 não podem ser negativas"));
        expect(() => calcularMediaAluno(-2, 8).toThrow("Notas a1 ou a2 não podem ser negativas"));
      });

      test('teste para cálculo base quando "a3" não é informada', () => {
        expect(() => calcularMediaAluno(6, 5).toBeCloseTo(6 * 0.4 + 4 * 0.6));
      });

      test('teste para quando "a3" for negativa', () => {
        expect(() => calcularMediaAluno(6, 5, -7).toThrow("Nota a3 não pode ser negativa"));
      });

      test('teste para quando "a3" é informada e a melhor combinação é "a1" com "a3" ', () => {
        expect(() => calcularMediaAluno(6, 2, 6).ToBeCloseTo(6 * 0.4 + 6 * 0.6));
      });

      test('teste para quando "a3" é informada e a melhor combinação é "a2" com "a3" ', () => {
        expect(() => calcularMediaAluno(3, 7, 6).ToBeCloseTo(7 * 0.4 + 6 * 0.6));
      });


});   