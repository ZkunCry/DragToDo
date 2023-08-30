import { Task } from "./task.js";

export class TodoList {
  constructor() {
    this.todo = document.querySelector(".todo");
    this.taskList = [];
    this.#render();

    const input = document.querySelector(".todo__text");
    input.addEventListener("keyup", function(event) {
      if (event.key === "Enter" && input.value){
        this.addTask(new Task(input.value, this.taskList.length));
        input.value = "";
      }
    });

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
      case "completeButton":
        this.completeTask(event.target);
        break;
      case "taskText":
        console.log(event.target.tagName)
        if(event.target.tagName != "INPUT"){
          this.editTask(event.target);
        }
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

  #createCompletedList(){
    const list = document.createElement("ul");
    list.classList.add("todo-completed");
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

  getById(id){
    return this.taskList
  }

  deleteTask(task) {
    const deleteItem = task.parentNode.parentNode;
    deleteItem.remove();
    this.taskList = this.taskList.filter((value) => value.id !== +deleteItem.dataset.id);
  }
  completeTask(task) {
    const completeItem = task.parentNode.parentNode;
    const text = completeItem.children[0];
    if(!text.classList.contains("completed")){
      text.classList.add("completed")

      if(this.completedList === undefined){
        this.completedList = this.#createCompletedList();
        this.todo.append(this.completedList);
      }

      this.completedList.appendChild(completeItem);
    }
    else{
      text.classList.remove("completed")
      this.menu.appendChild(completeItem);

      if(this.completedList.children.length === 0){
        this.completedList.remove();
      }
    }
  }
  editTask(task) {
    const input = document.createElement("input")
    input.type = "text";
    input.value = task.innerHTML;
    input.classList.add("todo-menu__item");
    task.style.display = "none";
    task.parentNode.prepend(input);
    input.addEventListener("keyup", function(event) {
      if (event.key === "Enter"){
        event.preventDefault();
        task.innerHTML = input.value;
        task.style.display = "inline";
        input.remove();
      }
    });
  }
}
