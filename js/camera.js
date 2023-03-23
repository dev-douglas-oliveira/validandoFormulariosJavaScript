const botaoIniciarCamera = document.querySelector("[data-video-botao]"); //seleciona o botão que inicia a câmera
const campoCamera = document.querySelector("[data-camera]"); //seleciona o campo que contém a câmera
const video = document.querySelector("[data-video]"); //seleciona o vídeo
const botaoTirarFoto = document.querySelector("[data-tirar-foto]"); //seleciona o botão que tira a foto
const canvas = document.querySelector("[data-video-canvas]"); //seleciona o canvas
const mensagem = document.querySelector("[data-mensagem]"); //seleciona a mensagem
const botaoEnviarFoto = document.querySelector("[data-enviar]"); //seleciona o botão que envia a foto

let imagemURL = "";

//evento para ficar escutando quando o botão de iniciar a câmera for clicado
botaoIniciarCamera.addEventListener("click", async function () {
    const iniciarVideo = await navigator.mediaDevices //inicia o vídeo
        .getUserMedia({ video: true, audio: false }); //pega o vídeo e o áudio não

    botaoIniciarCamera.style.display = "none"; //esconde o botão de iniciar a câmera
    campoCamera.style.display = "block"; //mostra o campo da câmera

    video.srcObject = iniciarVideo;
});

//evento para ficar escutando quando o botão de tirar foto for clicado
botaoTirarFoto.addEventListener("click", function () {
    canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height); //desenha a imagem no canvas

    imagemURL = canvas.toDataURL("image/jpeg"); //converte a imagem em uma URL

    campoCamera.style.display = "none"; //esconde o campo da câmera
    mensagem.style.display = "block"; //mostra a mensagem
});

//evento para ficar escutando quando o botão de enviar foto for clicado
botaoEnviarFoto.addEventListener("click", () => {
    const receberDadosExistentes = localStorage.getItem("cadastro"); //recebe os dados existentes no localStorage
    const converteRetorno = JSON.parse(receberDadosExistentes); //converte os dados existentes no localStorage

    converteRetorno.imagem = imagemURL; //adiciona a imagem no objeto

    localStorage.setItem("cadastro", JSON.stringify(converteRetorno)); //salva os dados no localStorage

    window.location.href = "../pages/abrir-conta-form-3.html"; //redireciona para a próxima página
});
