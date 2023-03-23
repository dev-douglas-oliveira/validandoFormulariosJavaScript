import ehUmCPF from "./valida-cpf.js"; //importando a função de validação de cpf
import ehMaiorDeIdade from "./valida-idade.js"; //importando a função de validação de idade
import validaRG from "./valida-rg.js"; //importando a função de validação de rg

//1- primeiro passo é pegar todos os campos que são obrigatórios
const camposDoFormulario = document.querySelectorAll("[required]"); // pega todos os campos que são obrigatórios
const formulario = document.querySelector("[data-formulario]"); // pega o formulário

formulario.addEventListener("submit", (e) => {
    //adiciona um evento de submit no formulário
    e.preventDefault(); // impede o reload da página e faz o envio dos dados do formulário

    const listaRespostas = {
        nome: e.target.elements["nome"].value, //pega o valor do campo nome
        email: e.target.elements["email"].value, //pega o valor do campo email
        rg: e.target.elements["rg"].value, //pega o valor do campo rg
        cpf: e.target.elements["cpf"].value, //pega o valor do campo cpf
        aniversario: e.target.elements["aniversario"].value, //pega o valor do campo aniversario
    };

    localStorage.setItem("cadastro", JSON.stringify(listaRespostas)); //salva os dados no localStorage

    window.location.href = "./abrir-conta-form-2.html"; //redireciona para a próxima página
});

//2- segundo passo é adicionar um evento de blur em cada campo usando um forEach
camposDoFormulario.forEach((campo) => {
    campo.addEventListener("blur", () => verificaCampo(campo)); // blur é quando o campo perde o foco
    campo.addEventListener("invalid", (evento) => evento.preventDefault()); // retira a mensagem de erro padrão do navegador permitindo customizar a mensagem de erro  com o setCustomValidity
});

const tiposDeErro = [
    "valueMissing", //campo vazio
    "typeMismatch", // tipo de dado inválido
    "patternMismatch", //padrão de dado inválido
    "tooShort", //campo com tamanho insuficiente
    "customError", //erro customizado
];

const mensagens = {
    nome: {
        valueMissing: "O campo de nome não pode estar vazio.",
        patternMismatch: "Por favor, preencha um nome válido.",
        tooShort: "Por favor, preencha um nome válido.",
    },
    email: {
        valueMissing: "O campo de e-mail não pode estar vazio.",
        typeMismatch: "Por favor, preencha um email válido.",
        tooShort: "Por favor, preencha um email válido.",
    },
    rg: {
        valueMissing: "O campo de RG não pode estar vazio.",
        patternMismatch: "Por favor, preencha um RG válido.",
        tooShort: "O campo de RG não tem caractéres suficientes.",
        customError: "O RG deve ter 9 dígitos.",
    },
    cpf: {
        valueMissing: "O campo de CPF não pode estar vazio.",
        patternMismatch: "Por favor, preencha um CPF válido.",
        customError: "O CPF digitado não existe.",
        tooShort: "O campo de CPF não tem caractéres suficientes.",
    },
    aniversario: {
        valueMissing: "O campo de data de nascimento não pode estar vazio.",
        customError: "Você deve ser maior que 18 anos para se cadastrar.",
    },
    termos: {
        valueMissing: "Você deve aceitar nossos termos antes de continuar.",
    },
};

//3- terceiro passo é criar uma função que verifica se o campo está preenchido corretamente
function verificaCampo(campo) {
    let mensagem = "";
    campo.setCustomValidity(""); //limpa a mensagem de erro customizada
    if (campo.name == "cpf" && campo.value.length >= 11) {
        ehUmCPF(campo);
    }
    if (campo.name == "aniversario" && campo.value != "") {
        //verifica se o campo de aniversário está preenchido
        ehMaiorDeIdade(campo);
    }
    if (campo.name == "rg" && campo.value != "") {
        validaRG(campo);
    }

    tiposDeErro.forEach((erro) => {
        if (campo.validity[erro]) {
            mensagem = mensagens[campo.name][erro];
            console.log(mensagem);
        }
        campo.style.borderColor = mensagem ? "red" : "green"; //muda a cor da borda do campo para vermelho caso o campo esteja preenchido incorretamente e verde caso esteja preenchido corretamente
    });
    const mensagemErro = campo.parentNode.querySelector(".mensagem-erro"); //pega a mensagem de erro do campo
    const validadorDeInput = campo.checkValidity(); //verifica se o campo está preenchido corretamente

    if (!validadorDeInput) {
        mensagemErro.textContent = mensagem;
    } else {
        mensagemErro.textContent = "";
    }
}
