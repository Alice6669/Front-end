class boxShadowGenerator {
    constructor(horizontal, horizontalRef, vertical, verticalref, intensidadeBlur, intensidadeBlurRef,
        intensidadeSpread, intensidadeSpreadRef, preview, regra, webkitRegra, mozRegra, color, colorRef,
        opacity, opacityRef, sombraInterna){
            this.horizontal = horizontal;
            this.vertical = vertical;
            this.horizontalRef = horizontalRef;
            this.verticalref = verticalref;
            this.intensidadeBlur = intensidadeBlur;
            this.intensidadeBlurRef = intensidadeBlurRef;
            this.intensidadeSpread = intensidadeSpread;
            this.intensidadeSpreadRef = intensidadeSpreadRef
            this.preview = preview;
            this.regra = regra;
            this.webkitRegra = webkitRegra;
            this.mozRegra = mozRegra;
            this.color = color;
            this.colorRef = colorRef;
            this.opacity = opacity;
            this.opacityRef = opacityRef;
            this.sombraInterna = sombraInterna;
        }

        inicialização(){
            this.horizontalRef.value = this.horizontal.value;
            this.verticalref.value = this.vertical.value;
            this.intensidadeBlurRef.value = this.intensidadeBlur.value;
            this.intensidadeSpreadRef.value = this.intensidadeSpread.value;
            this.colorRef.value = this.color.value;
            this.opacityRef.value = this.opacity.value;
        
            this.applyRule();
            this.showRule();
        }

        applyRule(){
            const rgb = this.hexTOrgb(this.colorRef.value );

            this.preview.style.boxShadow = `${this.sombraInterna.checked ? "inset" : ""} ${this.horizontalRef.value}px ${this.verticalref.value}px ${this.intensidadeBlurRef.value}px ${this.intensidadeSpreadRef.value}px rgba(${rgb} ,${this.opacityRef.value})`
            this.currentRule = this.preview.style.boxShadow;
        }

        showRule(){
            this.regra.querySelector("span").innerText += " " + this.currentRule;
            this.mozRegra.querySelector("span").innerText += " " + this.currentRule;
            this.webkitRegra.querySelector("span").innerText += " " + this.currentRule;
        }

        updateValue(type, value){
            switch(type){
                case "horizontal":
                    this.horizontalRef.value = value;
                    break;
                
                case "vertical":
                    this.verticalref.value = value;
                    break;
                
                case "intensidadeBlur":
                    this.intensidadeBlurRef.value = value;
                    break;
                
                case "intensidadeSpread":
                    this.intensidadeSpreadRef.value = value;
                    break;
                case "color":
                    this.colorRef.value = value;
                    break;
                case "opacity":
                    this.opacityRef.value = value;
                    break;
                case "sombraInterna":
                    this.sombraInterna.value = value;
                    break;
            }

            this.applyRule();
        }

    hexTOrgb (hex){
        return `${("0x" + hex[1] + hex[2]) | 0}, ${("0x" + hex[3] + hex[4]) | 0}, ${
      ("0x" + hex[5] + hex[6]) | 0}`;
    }
}

// Seleção de elementos

const horizontal = document.querySelector("#horizontal");
const horizontalRef = document.querySelector("#horizontalValue");
const vertical = document.querySelector("#vertical");
const verticalref = document.querySelector("#verticalValue");
const intensidadeBlur = document.querySelector("#intensidadeBlur");
const intensidadeBlurRef = document.querySelector("#intensidadeBlurValue");
const intensidadeSpread = document.querySelector("#intensidadeSpread");
const intensidadeSpreadRef = document.querySelector("#intensidadeSpreadValue");
const preview = document.querySelector("#box");
const regra = document.querySelector("#regra");
const webkitRegra = document.querySelector("#webkitRegra");
const mozRegra = document.querySelector("#mozRegra");
const color = document.querySelector("#cor");
const opacity = document.querySelector("#opacity");
const sombraInterna = document.querySelector("#sombraInterna");
const colorRef = document.querySelector("#corValue");
const opacityRef = document.querySelector("#opacityValue");

boxShadow = new boxShadowGenerator(horizontal, horizontalRef, vertical, verticalref, intensidadeBlur, intensidadeBlurRef,
        intensidadeSpread, intensidadeSpreadRef, preview, regra, webkitRegra, mozRegra, color, colorRef,
        opacity, opacityRef, sombraInterna);

boxShadow.inicialização();

// Eventos

horizontal.addEventListener("input", (e) =>{
    const value = e.target.value;

    boxShadow.updateValue("horizontal", value)
});

vertical.addEventListener("input", (e) =>{
    const value = e.target.value;

    boxShadow.updateValue("vertical", value)
});

intensidadeBlur.addEventListener("input", (e) =>{
    const value = e.target.value;

    boxShadow.updateValue("intensidadeBlur", value)
});

intensidadeSpread.addEventListener("input", (e) =>{
    const value = e.target.value;

    boxShadow.updateValue("intensidadeSpread", value)
});

horizontalRef.addEventListener("keyup", () =>{
    horizontal.value = horizontalRef.value
    boxShadow.applyRule();
});

verticalref.addEventListener("keyup", () =>{
    vertical.value = verticalref.value
    boxShadow.applyRule();
});

intensidadeBlurRef.addEventListener("keyup", () =>{
    intensidadeBlur.value = intensidadeBlurRef.value
    boxShadow.applyRule();
});

intensidadeSpreadRef.addEventListener("keyup", () =>{
    intensidadeSpread.value = intensidadeSpreadRef.value
    boxShadow.applyRule();
});

colorRef.addEventListener("keyup", () =>{
    color.value = colorRef.value
    boxShadow.applyRule();
});

opacityRef.addEventListener("keyup", () =>{
    opacity.value = opacityRef.value
    boxShadow.applyRule();
});

color.addEventListener("input", (e) =>{
    const value = e.target.value;

    boxShadow.updateValue("color", value);
});

opacity.addEventListener("input", (e) =>{
    const value = e.target.value;

    boxShadow.updateValue("opacity", value);
});

sombraInterna.addEventListener("input", (e) =>{
    const value = e.target.checked;

    boxShadow.updateValue("sombraInterna", value);
});

verticalref.addEventListener("keypress", function (e) {
    // Bloqueia se NÃO for número
    if (!/[0-9]/.test(e.key)) {
        e.preventDefault();
    }
});

horizontalRef.addEventListener("keypress", function (e) {
    // Bloqueia se NÃO for número
    if (!/[0-9]/.test(e.key)) {
        e.preventDefault();
    }
});

intensidadeBlurRef.addEventListener("keypress", function (e) {
    // Bloqueia se NÃO for número
    if (!/[0-9]/.test(e.key)) {
        e.preventDefault();
    }
});

intensidadeSpreadRef.addEventListener("keypress", function (e) {
    // Bloqueia se NÃO for número
    if (!/[0-9]/.test(e.key)) {
        e.preventDefault();
    }
});

opacity.addEventListener("keypress", function (e) {
    // Bloqueia se NÃO for número
    if (!/[0-9]/.test(e.key)) {
        e.preventDefault();
    }
});

//