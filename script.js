let todos = [];

function addTodo() {
    const inputEl = document.querySelector(".header input");
    if (!inputEl.value) {
        alert("Todo cannot be empty");
        return;
    }
    todos.push({
        title: inputEl.value,
        isEditing: false
    });
    inputEl.value = '';
    render();
}

function deleteTodo(ind) {
    todos.splice(ind, 1);
    render();
}

function editTodo(ind) {
    todos[ind].isEditing = true;
    render();
}


function saveTodo(ind) {
    const inputEle = document.querySelector(`.todo-${ind} .editinput`);
    if (!inputEle.value){
        alert("Todo cannot be empty");
        return;
    }
    todos[ind].title = inputEle.value;
    todos[ind].isEditing = false;
    render();
}

function toggleComplete(ind) {
    todos[ind].isCompleted = !todos[ind].isCompleted;
    render();
}


function todoComponent(todo, ind) {

    const parentEl = document.querySelector(".todos");
    const divEl = document.createElement("div");
    divEl.setAttribute("class", `todo-${ind}`); 

    const todoText = document.createElement("h2");
    todoText.innerHTML = todo.title;
    todoText.classList.add("todo-text");

    const checkbox = document.createElement("input");
    checkbox.type = "radio";
    checkbox.setAttribute("class", "todo-checkbox");
    checkbox.checked = todo.isCompleted;
    checkbox.setAttribute("onclick", `toggleComplete(${ind})`);

    const contentDiv = document.createElement("div");
    contentDiv.setAttribute("class", "content");

    const buttonContainer = document.createElement("div");
    buttonContainer.setAttribute("class", "btnwrapper");

    const deleteButton = document.createElement("button");
    deleteButton.setAttribute("onclick", `deleteTodo(${ind})`);
    deleteButton.innerHTML = "Delete";
    deleteButton.style.backgroundColor = "#F03A47";
    deleteButton.style.color = "#ffffff";

    const editButton = document.createElement("button");
    editButton.setAttribute("onclick", `editTodo(${ind})`);
    editButton.innerHTML = "Edit";
    editButton.style.backgroundColor = "#f5e74e";
    editButton.style.color = "#000000";

    contentDiv.appendChild(checkbox);
    contentDiv.appendChild(todoText);

    buttonContainer.appendChild(editButton);
    buttonContainer.appendChild(deleteButton);

    divEl.appendChild(contentDiv);
    divEl.appendChild(buttonContainer);
    parentEl.appendChild(divEl);


    if (todo.isEditing) {
        const inputEl = document.createElement("input");
        inputEl.setAttribute("class", "editinput")
        inputEl.value = todoText.innerHTML;
        const saveButton = document.createElement("button");
        saveButton.innerHTML = "Save";
        saveButton.setAttribute("onclick", `saveTodo(${ind})`);
        saveButton.setAttribute("class", "savebtn");
        saveButton.style.backgroundColor = "#369f57";
        saveButton.style.color = "#ffffff"
        // divEl.removeChild(completeButton);
        contentDiv.replaceChild(inputEl, todoText);
        buttonContainer.replaceChild(saveButton, editButton);
    }
    if (checkbox.checked) {
        todoText.style.textDecoration = "line-through";
        todoText.style.color = "rgb(0,255,0)";
        
    }
}

function render() {
    document.querySelector(".todos").innerHTML = '';
    for (let i=0; i<todos.length;i++) {
        todoComponent(todos[i], i);
    }
}
