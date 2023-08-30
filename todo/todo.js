import { Task } from "./task.js";

export class TodoList {
  constructor() {
    this.todo = document.querySelector(".todo");
    this.taskList = [];
    this.#render();
    // this.order = tasks.length;
    // this.task = document.createElement("li");
    // this.task.className = "todo-menu__item";
    // this.task.appendChild(this.text);
    // menu.appendChild(this.task);
  }
  clicked(event) {
    const input = document.querySelector(".todo__text");
    let { type } = event.target.dataset;
    if(type === undefined){
       type = event.target.parentNode.dataset.type
    }
    switch (type) {
      case "addButton":
        if (input.value) {
          const currentTask = new Task(input.value, this.taskList.length);
          this.addTask(currentTask);
          input.value = "";
        }
        break;
      case "deleteButton":
        this.deleteTask(event.target);
        break;
    }
  }
  #render() {
    this.clicked = this.clicked.bind(this);
    this.todo.addEventListener("click", this.clicked);
    this.menu = this.#createList();

    this.todo.append(this.menu);
  }
  #createList() {
    const list = document.createElement("ul");
    list.classList.add("todo-menu");
    return list;
  }

  addTask(task) {
    this.menu.appendChild(task.currentTaskElement);
    task.id = this.taskList.length + 1;
    this.taskList.push(task);
    console.log(task);
  }
  hasItem(currentElement) {
    return this.taskList.find((el) => el === currentElement);
  }
  deleteTask(task) {
    const deleteItem = task.parentNode.parentNode;
    deleteItem.remove()
    this.taskList = this.taskList.filter((value) => value.id !== +deleteItem.id);
  }
  completeTask(task) {

  }
}
