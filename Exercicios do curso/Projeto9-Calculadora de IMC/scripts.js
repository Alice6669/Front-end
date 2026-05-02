// IMC DATA
const data = [
  {
    min: 0,
    max: 18.4,
    classification: "Menor que 18,5",
    info: "Magreza",
    obesity: "0",
  },
  {
    min: 18.5,
    max: 24.9,
    classification: "Entre 18,5 e 24,9",
    info: "Normal",
    obesity: "0",
  },
  {
    min: 25,
    max: 29.9,
    classification: "Entre 25,0 e 29,9",
    info: "Sobrepeso",
    obesity: "I",
  },
  {
    min: 30,
    max: 39.9,
    classification: "Entre 30,0 e 39,9",
    info: "Obesidade",
    obesity: "II",
  },
  {
    min: 40,
    max: 99,
    classification: "Maior que 40,0",
    info: "Obesidade grave",
    obesity: "III",
  },
];

// Seleção de elementos
const imcTable = document.querySelector("#imcTabela")
const alturaInput = document.querySelector("#altura")
const pesoInput = document.querySelector("#peso")
const calcBtn = document.querySelector("#calcularBotao")
const clearBtn = document.querySelector("#limpar")
const voltarBtn = document.querySelector("#voltarBotao")
const imcNumero = document.querySelector("#imcNumero span")
const imcInfo = document.querySelector("#situacaoAtual span")
const calcConteiner = document.querySelector("#calcConteiner")
const resultadoConteiner = document.querySelector("#resultadoConteiner")

// Funções
function criarTabela(data) {
    data.forEach((item) => {
        const div = document.createElement('div')
        div.classList.add("tabela")
        const classification = document.createElement("p")
        classification.innerHTML = item.classification
        const info = document.createElement("p")
        info.innerHTML = item.info
        const obesity = document.createElement("p")
        obesity.innerHTML = item.obesity
        div.appendChild(classification)
        div.appendChild(info)
        div.appendChild(obesity)
        imcTable.appendChild(div)
    })
}

function clearInputs (){
    alturaInput.value = ""
    pesoInput.value = ""
    imcInfo.classList = ""
    imcNumero.classList = ""
}

function digitosValidos (text){
    return text.replace(/[^0-9,]/g, "")
}

function calcIMC (peso, altura){
    return imc = (peso / (altura*altura)).toFixed(1)
}
function mostrarOUesconder(){
    calcConteiner.classList.toggle("hide")
    resultadoConteiner.classList.toggle("hide")
}
// Inicialização

criarTabela(data)

// Eventos

pesoInput.addEventListener("input", (e) => {
    const updateValue = digitosValidos(e.target.value)
    e.target.value = updateValue
})

alturaInput.addEventListener("input", (e) => {
    const updateValue = digitosValidos(e.target.value)
    e.target.value = updateValue
})

calcBtn.addEventListener("click", (e) =>{
    e.preventDefault();
    const altura = +alturaInput.value.replace(",", ".")
    const peso = +pesoInput.value.replace(",", ".")
    
    if(!peso || !altura) return
    const imc = calcIMC(peso, altura)
    console.log(imc)
    let info
    data.forEach((item) => {
        if (imc >=item.min && imc <= item.max){
            info = item.info
        }
    })
    if(!info) return
    imcNumero.innerHTML = imc
    imcInfo.innerHTML = info
    switch (info){
        case "Magreza":
            imcInfo.classList.toggle("low")
            imcNumero.classList.toggle("low")
            break;
        case "Normal":
            imcInfo.classList.toggle("good")
            imcNumero.classList.toggle("good")
            break;
        case "Sobrepeso":
            imcInfo.classList.toggle("medio")
            imcNumero.classList.toggle("medio")
            break;
        case "Obesidade":
            imcInfo.classList.toggle("bad")
            imcNumero.classList.toggle("bad")
            break;
        case "Obesidade grave":
            imcInfo.classList.toggle("veryBad")
            imcNumero.classList.toggle("veryBad")
            break;
    }
    mostrarOUesconder();
})

clearBtn.addEventListener("click", (e) => {
    e.defaultPrevented();
    clearInputs()
})
voltarBtn.addEventListener("click", () =>{
    clearInputs();
    mostrarOUesconder();
})