//1- primeiro passo é criar um export default function que recebe o campo como parâmetro
export default function ehUmCPF(campo) {
    const cpf = campo.value.replace(/\.|-/g, ""); // substitui os pontos e traços por uma string vazia
    if (
        validaNumerosRepetidos(cpf) ||
        validaPrimeiroDigito(cpf) ||
        validaSegundoDigito(cpf)
    ) {
        campo.setCustomValidity("Esse cpf não é válido");
    }
}

//2- segundo passo é criar a função que valida numeros repetidos
function validaNumerosRepetidos(cpf) {
    const numerosRepetidos = [
        "00000000000",
        "11111111111",
        "22222222222",
        "33333333333",
        "44444444444",
        "55555555555",
        "66666666666",
        "77777777777",
        "88888888888",
        "99999999999",
    ]; // cria um array com os numeros repetidos

    return numerosRepetidos.includes(cpf); // retorna true se o cpf estiver no array
}

//3- terceiro passo é criar a função que valida o primeiro digito
function validaPrimeiroDigito(cpf) {
    let soma = 0;
    let multiplicador = 10;

    for (let tamanho = 0; tamanho < 9; tamanho++) {
        // percorre o cpf até o penúltimo caractér
        soma += cpf[tamanho] * multiplicador; // soma o valor do caractér vezes o multiplicador
        multiplicador--;
    }

    soma = (soma * 10) % 11; // multiplica a soma por 10 e divide por 11

    if (soma == 10 || soma == 11) {
        // se o resto da divisão for 10 ou 11, o valor da soma é 0
        soma = 0;
    }

    return soma != cpf[9]; // retorna true se o valor da soma for diferente do último caractér do cpf
}

//4- quarto passo é criar a função que valida o segundo digito
function validaSegundoDigito(cpf) {
    let soma = 0;
    let multiplicador = 11;

    for (let tamanho = 0; tamanho < 10; tamanho++) {
        soma += cpf[tamanho] * multiplicador;
        multiplicador--;
    }

    soma = (soma * 10) % 11;

    if (soma == 10 || soma == 11) {
        soma = 0;
    }

    return soma != cpf[10];
}
