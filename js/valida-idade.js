export default function ehMaiorDeIdade(campo) {
    const dataNascimento = new Date(campo.value);
    if (!validaIdade(dataNascimento)) {
        //verifica se o usuário é maior de idade
        campo.setCustomValidity("O usuário não é maior de idade");
    }
}

function validaIdade(data) {
    const dataAtual = new Date(); //data atual
    const dataMais18 = new Date( //data atual + 18 anos
        data.getUTCFullYear() + 18,
        data.getUTCMonth(),
        data.getUTCDate()
    );

    return dataAtual >= dataMais18;
}
