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
    const { type } = event.target.dataset;
    switch (type) {
      case "addButton":
        if (input.value) {
          const currentTask = new Task(input.value);
          this.addTask(currentTask);
          input.value = "";
        }
        break;
      case "deleteButton":
        console.log(event.target);
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
    const deleteItem = this.hasItem(task);
    console.log(deleteItem);
    this.taskList = this.taskList.filter((value) => value !== deleteItem);
    this.menu.removeChild(deleteItem.currentTaskElement);
  }
}
