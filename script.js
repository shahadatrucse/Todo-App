//find all elements
const container = document.querySelector(".container");
const todoForm = document.querySelector(".todo-form");
const todoInput = document.querySelector("#inputTodo");
const todoAddButton = document.querySelector("#addTodoButton");
const todoLists = document.getElementById("lists");
const message = document.getElementById("message");


//showmessage

const showMessage = (text, status) =>{
    if(status == 'danger'){
        message.innerHTML= text;
        message.classList.add(`bg-${status}`);
        setInterval(() =>{
            message.innerHTML="";
            message.classList.remove(`bg-${status}`);
        }, 2000);
    }
    else{
        message.innerHTML=text;
        message.classList.add(`bg-${status}`);
        setInterval(() =>{
            message.innerHTML="";
            message.classList.remove(`bg-${status}`);
        }, 2000);
    }

}


const deleteTodo = (event) =>{
    const selectedTodo = event.target.parentElement.parentElement.parentElement;
    console.log(selectedTodo);
    todoLists.removeChild(selectedTodo);
    const text = "Task deleted successfully";
    showMessage(text, "danger");

    let tempTodos = getTodosFromLocalStorage();
    console.log(tempTodos);
    tempTodos = tempTodos.filter((todo) => todo.todoId != selectedTodo.id);
    console.log(tempTodos);
    localStorage.setItem("myTodos", JSON.stringify(tempTodos));



}

//createTodo
const createTodo = (todoId, todoValue) =>{
    const todoElement = document.createElement("li");
    todoElement.classList.add("li-style");
    todoElement.id = todoId;
   
    todoElement.innerHTML = ` 
    <span>${todoValue}</span>
    <span><button id="deleteButton" class="submit-btn"> <i class="fa fa-trash"> </i> </button>`;

    todoLists.appendChild(todoElement);
    
    const deleteButton = todoElement.querySelector("#deleteButton");
    deleteButton.addEventListener("click", deleteTodo);
}


const getTodosFromLocalStorage = () =>{
   return localStorage.getItem("myTodos") ?
    JSON.parse(localStorage.getItem("myTodos")) : [];
}

//addTodo
const addTodo = (event) =>{
    event.preventDefault();
    const todoValue = todoInput.value;
    
    //unique id
    const todoId = Date.now().toString();
    console.log(todoId);

    //call  createTodo
    createTodo(todoId,todoValue);
    const text = "Task added successfully";
    showMessage(text, "success");


    const todos = getTodosFromLocalStorage();
    todos.push({todoId, todoValue});
    localStorage.setItem("myTodos", JSON.stringify(todos));

    todoInput.value="";

};

const loadTodos = () =>{
    let tempTodos = getTodosFromLocalStorage();
    tempTodos.map((todo) => createTodo(todo.todoId, todo.todoValue));
}


// adding eventListener
todoForm.addEventListener("submit", addTodo);
window.addEventListener("DOMContentLoaded", loadTodos);