function calcularMediaAluno(a1, a2, a3) {
    if (a1 === 0 || a2 === 0) {
        throw new Error("Notas não indefinidas")
    }


    if (a1 < 0 || a2 < 0) {
        throw new Error("Notas a1 ou a2 não podem ser negativas");
        
    }

    if (a3 === 0) {
      return a1 * 0.4 + a2 * 0.6
    }

    if (a3 < 0) {
        throw new Error("Nota a3 não pode ser negativa")
    }


    if (a2 < a3) {
        return a1 * 0.4 + a3 * 0.6
    }

    if (a1 < a3) {
        return a2 * 0.4 + a3 * 0.6
    }

    const notaSubstituta = Math.max(a1, a2);
    return notaSubstituta * 0.4 + a3 * 0.6;
}

module.exports = {calcularMediaAluno};