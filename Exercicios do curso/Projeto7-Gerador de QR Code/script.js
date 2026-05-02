const conteiner = document.querySelector(".conteiner")
const botao = document.querySelector("#qrForm button")
const inputQRCode = document.querySelector("#qrForm input")
const QRCodeImg = document.querySelector("#qrCode img")

// Eventos
// Gerar QR Code
function GerarQRCode() {
    let URLOrText = inputQRCode.value;
    if (!URLOrText) return;
    botao.innerHTML = "Gerando Código...";
    QRCodeImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${URLOrText}`;
    QRCodeImg.addEventListener("load", () => {
        conteiner.classList.add("ativo");
        botao.innerHTML = "Código Criado";
    });
}

botao.addEventListener("click", () => {
    GerarQRCode();
})

inputQRCode.addEventListener("keydown", (e) => {
    if (e.code === "Enter"){
        GerarQRCode();
    }
})

// Limpar área do QR Code
inputQRCode.addEventListener("keyup", () => {
    if (!inputQRCode.value){
        conteiner.classList.remove("ativo");
        botao.innerHTML = "Gerar QR Code";
    }
});