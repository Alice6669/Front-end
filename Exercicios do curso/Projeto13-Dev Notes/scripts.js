// Elementos

const notesConteiner = document.querySelector("#notesConteiner");
const noteInput = document.querySelector("#noteConteudo");
const noteAddBtn = document.querySelector(".adicionarNota");
const buscaInput = document.querySelector("#buscaInput");
const exportarBtn = document.querySelector("#exportarNotes");


// Funções

function showNotes () {
    cleanNotes();
    getNotes().forEach((note) => {
        const noteElemento = criarNote(note.id, note.conteudo, note.fixed);

        notesConteiner.appendChild(noteElemento);
    });
}

function getNotes (){
    const notes = JSON.parse(localStorage.getItem("notes") || "[]");

    const ordenarNotas = notes.sort((a, b) => a.fixed > b.fixed ? -1 : 1)

    return ordenarNotas;
}

function cleanNotes() {
  notesConteiner.replaceChildren([]);
}

function removeNote (id){
    const notes = getNotes();

    const noteRemovido = notes.filter((note) => note.id !== id);

    saveNotes(noteRemovido);

    showNotes();
}

function duplicarNote(id){
    const notes = getNotes();
    const note = notes.filter((note) => note.id === id)[0];

    const novaNota = {
        id: geradorId(),
        conteudo: note.conteudo,
        fixed: false,
    };
    
    notes.push(novaNota);
    saveNotes(notes);
    
    const element = criarNote(novaNota.id, novaNota.conteudo, false);
    notesConteiner.appendChild(element);
}

function saveNotes (notes){
    localStorage.setItem("notes", JSON.stringify(notes));
}

function criarNote(id, conteudo, fixed){
    const element = document.createElement("div");
    element.classList.add("note");

    const textArea = document.createElement("textarea");
    textArea.placeholder = "Adicione algum texto...";
    textArea.value = conteudo;
    element.appendChild(textArea);

    const pinIcon = document.createElement("i");
    pinIcon.classList.add(...["bi", "bi-pin"]);
    element.appendChild(pinIcon);

    const deleteIcon = document.createElement("i");
    deleteIcon.classList.add(...["bi", "bi-x-lg"]);
    element.appendChild(deleteIcon);

    const duplicateIcon = document.createElement("i");
    duplicateIcon.classList.add(...["bi", "bi-file-earmark-plus"]);
    element.appendChild(duplicateIcon);

    if(fixed){
        element.classList.add("fixed");
    }

    // Eventos dos elementos.

    element.querySelector("textarea").addEventListener("keyup", () =>{
        const noteContem = element.querySelector("textarea").value;

        updateNote(id, noteContem);
    })

    element.querySelector(".bi-pin").addEventListener("click", () =>{
        toggleFixedNote(id);
    })

    element.querySelector(".bi-x-lg").addEventListener("click", () =>{
        removeNote(id);
    })

    element.querySelector(".bi-file-earmark-plus").addEventListener("click", () =>{
        duplicarNote(id);
    })

    

    return element;
}

function addNote(){
    const notes = getNotes();
    const noteObject = {
        id: geradorId(),
        conteudo: noteInput.value,
        fixed: false,
    }


    const noteElemento = criarNote(noteObject.id, noteObject.conteudo);

    notesConteiner.appendChild(noteElemento);

    notes.push(noteObject);

    saveNotes(notes);

    noteInput.value = "";
}

function updateNote(id, newConteudo){
    const notes = getNotes();

    const targetNote = notes.filter((note) => note.id === id)[0];

    targetNote.conteudo = newConteudo;

    saveNotes(notes);
}

function geradorId(){
    return Math.floor(Math.random() * 5000);
}

function toggleFixedNote (id){
    const notes = getNotes();

    const targetNote = notes.filter((note) => note.id === id)[0];

    targetNote.fixed = !targetNote.fixed

    saveNotes(notes);

    notesConteiner.innerHTML = "";
    showNotes();  
}

function buscarNotas(busca){
    const buscarResultado = getNotes().filter((note) =>{
        return note.conteudo.includes(busca);
    })

    if(busca !== ""){
        cleanNotes();

        buscarResultado.forEach((note) => {
            const noteElement = criarNote(note.id, note.conteudo)
            notesConteiner.appendChild(noteElement);
        });

        return;
    }

    cleanNotes();

    showNotes();
}

function exportarNote (){
    const notes = getNotes();

    let noteString = ""

    notes.forEach((note) =>{
        noteString += note.id + "," + note.conteudo + "," + note.fixed +"\n";
    });

    const element = document.createElement("a");

    element.href = "data:text/csv;charset=utf-8," + encodeURI(noteString);

    element.target = "_blank";

    element.download = "notes.csv";

    element.click();
}

// Eventos

noteAddBtn.addEventListener("click", () =>{
    addNote();
});

buscaInput.addEventListener("keyup", (e) =>{
    const busca = e.target.value;

    buscarNotas(busca);
})

noteInput.addEventListener("keydown", (e) =>{
    if(e.key === "Enter"){
        addNote();
    }
})

exportarBtn.addEventListener("click", () =>{
    exportarNote();
})

window.addEventListener("load", showNotes);