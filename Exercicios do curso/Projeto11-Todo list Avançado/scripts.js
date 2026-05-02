// Seleção de elementos
const todoForm = document.querySelector("#todoForm");
const todoinput = document.querySelector("#todoInput");
const todoLista = document.querySelector("#todoLista");
const editForm = document.querySelector("#editForm");
const editInput = document.querySelector("#editInput");
const cancelarEditBtn = document.querySelector("#cancelarEditBtn");
const buscaInput = document.querySelector("#buscarInput");
const apagarBtn = document.querySelector("#apagarBotao");
const filtroBtn = document.querySelector("#filtroSelect");


let oldInputValue

// Funções
const saveTodo = (text, done = 0, save = 1) =>{
    const todo = document.createElement("div");
    todo.classList.add("todo");

    const todoTitulo = document.createElement("h3");
    todoTitulo.innerHTML = text;
    todo.appendChild(todoTitulo);

    const doneBtn = document.createElement("button");
    doneBtn.classList.add("finishTodo");
    doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>'
    todo.appendChild(doneBtn);

    const editBtn = document.createElement("button");
    editBtn.classList.add("editTodo");
    editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>'
    todo.appendChild(editBtn);
    
    const removeBtn = document.createElement("button");
    removeBtn.classList.add("removeTodo");
    removeBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>'
    todo.appendChild(removeBtn);

    // Utilizando localStorage
    if (done){
        todo.classList.add("done")
    }
    
    if (save){
        saveTodoLocalStorage({text, done});
    }

    todoLista.appendChild(todo);

    todoinput.value = "";
    todoinput.focus();
}

const toggleForm = () => {
    editForm.classList.toggle("hide");
    todoForm.classList.toggle("hide");
    todoLista.classList.toggle("hide");
}

const updateTodo = (text) =>{
    const todos = document.querySelectorAll(".todo");

    todos.forEach((todo) => {
        let todoTitulo = todo.querySelector("h3");

        if (todoTitulo.innerText === oldInputValue){
            todoTitulo.innerText = text;

            updateTodoLocalStorage(oldInputValue, text);
        }
    })
}

const buscaTotal = (busca) =>{
    const todos = document.querySelectorAll(".todo");

    todos.forEach((todo) => {
        let todoTitulo = todo.querySelector("h3").innerText.toLowerCase();

        const normalizeBusca = busca.toLowerCase();

        todo.style.display = "flex";

        if (!todoTitulo.includes(normalizeBusca)){
            todo.style.display = "none";
        }
    })
}

const filterTodos = (filtro) => {
    const todos = document.querySelectorAll(".todo");

    switch(filtro){
        case "all":
            todos.forEach((todo) => todo.style.display = "flex");
            break;
        case "done":
            todos.forEach((todo) => {
                todo.style.display = "flex"
                if(!todo.classList.contains("done")){
                    todo.style.display = "none"
                };
            });
            break;
        case "todo":
            todos.forEach((todo) => {
                todo.style.display = "flex"
                if(todo.classList.contains("done")){
                    todo.style.display = "none"
                };
            });
            break;
        defaut:
        break;
    }
}

// Eventos
todoForm.addEventListener("submit", (e) =>{
    e.preventDefault();
    const inputValue = todoinput.value;

    if(!inputValue) return
    else saveTodo(inputValue)
});

document.addEventListener("click", (e) =>{
    const targetEl = e.target;
    const parentEl = targetEl.closest("div");
    let todoTitulo;

    if (parentEl && parentEl.querySelector("h3")){
        todoTitulo = parentEl.querySelector("h3").innerHTML;
    }
    if(targetEl.classList.contains ("finishTodo")){
        parentEl.classList.toggle("done");

        updateTodoStatusLocalStorage(todoTitulo);
    }

    if(targetEl.classList.contains ("removeTodo")){
        parentEl.remove();

        removeTodoLocalStorage(todoTitulo);
    }
    if(targetEl.classList.contains("editTodo")){
        toggleForm();

        editInput.value = todoTitulo;
        oldInputValue = todoTitulo;
    }
});

cancelarEditBtn.addEventListener("click", () => {
    toggleForm();
});

editForm.addEventListener("submit", (e) =>{
    e.preventDefault();

    const editInputValue = editInput.value;

    if (editInputValue){
        updateTodo(editInputValue);
    }

    toggleForm();
});
buscaInput.addEventListener("keyup", (e) =>{
    const buscar = e.target.value;

    buscaTotal(buscar);
});
apagarBtn.addEventListener("click", (e) =>{
    e.preventDefault();

    buscaInput.value = "";

    buscaInput.dispatchEvent(new Event("keyup"));
});
filtroBtn.addEventListener("change", (e) =>{
    const filtroValue = e.target.value;

    filterTodos(filtroValue);
});

// Local Storage

const getTodoLocalStorage = () =>{
    const todos = JSON.parse(localStorage.getItem("todos")) || [];
    return todos;
};
const loadTodos = () =>{
    const todos = getTodoLocalStorage();

    todos.forEach((todo) =>{
        saveTodo(todo.text, todo.done, 0);
    });
    
};
const saveTodoLocalStorage = (todo) =>{
    // Todos os todos da lista
    const todos = getTodoLocalStorage();
    // Add o novo todo no arr
    todos.push(todo);
    // Salvar tudo na lista
    localStorage.setItem("todos", JSON.stringify(todos));
};
window.addEventListener("load", loadTodos);
const removeTodoLocalStorage = (todoText) => {
    const todos = getTodoLocalStorage();

    const filteredTodos = todos.filter((todo) => todo.text != todoText)
    localStorage.setItem("todos", JSON.stringify(filteredTodos));
}
const updateTodoStatusLocalStorage = (todoText) =>{
    const todos = getTodoLocalStorage();

    todos.map((todo) => todo.text === todoText ? (todo.done = !todo.done):null);

    localStorage.setItem("todos", JSON.stringify(todos));
}
const updateTodoLocalStorage = (todoOldText, todoNewText) =>{
    const todos = getTodoLocalStorage();

    todos.map((todo) => todo.text === todoOldText ? (todo.text = todoNewText):null);

    localStorage.setItem("todos", JSON.stringify(todos));
}