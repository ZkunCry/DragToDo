import { Task } from "./todo/task.js";
import { TodoList } from "./todo/todo.js";
document.addEventListener('DOMContentLoaded',()=>{
    const todoList = new TodoList();
    document.querySelector(".new-category").addEventListener("click", ()=>{
        createTODO();
    })
    function createTODO(){
        document.querySelector(".new-category").remove()
        const todoList = new TodoList();
        document.querySelector(".new-category").addEventListener("click", ()=>{
            createTODO();
        })
    }
    
})
