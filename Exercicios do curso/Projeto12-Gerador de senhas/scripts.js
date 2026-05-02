// Seleção de elementos

const gerarSenhasBtn = document.querySelector("#gerarSenha");
const gerouSenha = document.querySelector("#gerouSenha");
const criarSenhaBtn = document.querySelector("#senhaCriada");
const numeroCaracteres = document.querySelector("#lenght");
const letrasBtn = document.querySelector("#letras");
const numeroBtn = document.querySelector("#numeros");
const simboloBtn = document.querySelector("#simbolos");
const copiarBtn = document.querySelector("#copiarSenha");

// Funções

const gerandoLetras = (numero) => {
    let senha = "";
    for (let i = 1; i <= numero; i++){
        let aleatorizando = Math.floor(Math.random() * (3-1) + 1);
        if (aleatorizando == 1){
            senha += String.fromCharCode(Math.floor(Math.random() * (91 - 65 ) + 65));
        }
        else {
            senha += String.fromCharCode(Math.floor(Math.random() * (123 - 97 ) + 97));
        }
    }
    return senha;
};
const gerandoNumero = (numero) => {
    let senha = "";
    for (let i = 1; i <= numero; i++){
        senha += String.fromCharCode(Math.floor(Math.random() * (58 - 48 ) + 48));
    }
    return senha;
};
const gerandoSimbolos = (numero) => {
    let senha = "";
    for (let i = 1; i <= numero; i++){
        let aleatorizando = Math.floor(Math.random() * (4) + 1);

        switch (aleatorizando){
            case 1:
                senha += String.fromCharCode(Math.floor(Math.random() * (48 - 31 ) + 31));
                break;
            case 2:
                senha += String.fromCharCode(Math.floor(Math.random() * (65 - 58 ) + 58));
                break;
            case 3:
                senha += String.fromCharCode(Math.floor(Math.random() * (97 - 91 ) + 91));
                break;
            case 4:
                senha += String.fromCharCode(Math.floor(Math.random() * (128 - 123 ) +123));
                break;
        }
    }
    return senha;
};
const gerandoAleatorioCompleto = (numero, simbolo = true, letra = true, numeros = true) => {
    let senha = "";
    if (simbolo === false && numeros === false && letra === false) return
    while (senha.length < numero){
        let aleatorizando = Math.floor(Math.random() * (3) + 1);

        switch(aleatorizando){
            case 1:
                if (simbolo === true){
                    senha += gerandoSimbolos(1);
                }
                break;
            case 2:
                if (letra === true){
                    senha += gerandoLetras(1);
                }
                break;
            case 3:
                if (numeros === true){
                    senha += gerandoNumero(1);
                }
                break;
        }
        
    } 

    
    gerouSenha.querySelector("h4").innerText = senha;

}
// Eventos

gerarSenhasBtn.addEventListener("click", () => {
    gerouSenha.classList.toggle("hide");
});

criarSenhaBtn.addEventListener("click", (e) =>{
    e.preventDefault();

    const simboloConfime = simboloBtn.checked;
    const letrasConfirme = letrasBtn.checked;
    const numeroConfirme = numeroBtn.checked;
    const caracteres = numeroCaracteres.value;
    
    gerandoAleatorioCompleto(caracteres, simboloConfime, letrasConfirme, numeroConfirme);
})

copiarBtn.addEventListener("click", (e) =>{
    e.preventDefault();
    const senha = gerouSenha.querySelector("h4").innerText;
    navigator.clipboard.writeText(senha).then(() =>{
        copiarBtn.innerText = "Senha copiada!"

        setTimeout(() =>{
            copiarBtn.innerText = "Copiar";
        }, 3000);
    })
})