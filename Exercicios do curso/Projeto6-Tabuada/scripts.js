// Seleção de elementos
const multiplicacaoForm = document.querySelector("#multiplicacaoForm")
const numeroInput = document.querySelector("#numero")
const multiplicadorInput = document.querySelector("#multiplicador")
const multiplicacaoTabela = document.querySelector("#multiplicacaoOperacoes")
const titulo = document.querySelector("#multiplicacaoTitulo span")
// Funções
const criarTabela = (multiplicado, multiplicador) =>{
    multiplicacaoTabela.innerHTML = "";
    for (let i = 0; i <= multiplicador; i++){
        let resultado = i * multiplicado;

        const tabela = `<div class="caixa">
        <div class="operacao">${multiplicado} X ${i} = </div>
        <div class="resultado">${resultado} </div>
        </div>`;

        const passar = new DOMParser();
        const htmlTabela = passar.parseFromString(tabela, "text/html");
        const caixa = htmlTabela.querySelector(".caixa");
        multiplicacaoTabela.appendChild(caixa);
    }

    titulo.innerHTML = multiplicado;
}
// Eventos
multiplicacaoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const multiplicado = +numeroInput.value;
    const multiplicador = +multiplicadorInput.value;
    
    if (!multiplicado || !multiplicador) return

    criarTabela(multiplicado, multiplicador);
})