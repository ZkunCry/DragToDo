import { Task } from "./task.js";

export class TodoList {
  constructor() {
    this.todo = document.querySelector(".todo");
    this.taskList = [];
    this.#render();
    this.input = document.querySelector(".todo__text");
    this.checkedTypeKeyboard = this.checkedTypeKeyboard.bind(this);
    this.input.addEventListener("keyup", this.checkedTypeKeyboard);

    // this.order = tasks.length;
    // this.task = document.createElement("li");
    // this.task.className = "todo-menu__item";
    // this.task.appendChild(this.text);
    // menu.appendChild(this.task);
  }
  checkedTypeKeyboard(event) {
    const {
      value,
      value: { length },
    } = this.input;
    const todoAdd = document.querySelector(".todo__add");
    if (length > 0 && value.trim() !== "") {
      todoAdd.classList.remove("disabled");
      if (event.key === "Enter" && value) {
        this.addTask(new Task(value, this.taskList.length));
        this.input.value = "";
      }
      return;
    }
    todoAdd.classList.add("disabled");
  }
  clicked(event) {
    let { type } = event.target.dataset;
    if (type === undefined) {
      type = event.target.parentNode.dataset.type;
    }
    switch (type) {
      case "addButton":
        if (this.input.value) {
          const currentTask = new Task(this.input.value, this.taskList.length);
          this.addTask(currentTask);
          this.input.value = "";
        }
        break;
      case "deleteButton":
        this.deleteTask(event.target);
        break;
      case "completeButton":
        this.completeTask(event.target);
        break;
      case "taskText":
        if (event.target.tagName !== "INPUT") {
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

  #createCompletedList() {
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

  getById(id) {
    return this.taskList;
  }

  deleteTask(task) {
    const deleteItem = task.parentNode.parentNode;
    deleteItem.remove();
    this.taskList = this.taskList.filter(
      (value) => value.id !== +deleteItem.dataset.id
    );
  }
  completeTask(task) {
    const completeItem = task.parentNode.parentNode;
    const text = [...completeItem.children].find((element) =>
      element.classList.contains("todo-menu__item")
    );
    console.log(text);
    if (!completeItem.classList.contains("completed")) {
      completeItem.classList.add("completed");
      console.log(this.completedList)
      if (this.completedList === undefined) {
        this.completedList = this.#createCompletedList();
        this.todo.append(this.completedList);
      }

      this.completedList.appendChild(completeItem);
    } else {
      completeItem.classList.remove("completed");
      this.menu.appendChild(completeItem);

      if (this.completedList.children.length === 0) {
        this.completedList.remove();
        delete this.completedList;
      }
    }
  }
  #createInput(task) {
    const input = document.createElement("input");
    input.type = "text";
    input.value = task.innerText;

    input.classList.add("input-edit-style");
    return input;
  }
  delEditAbil(event) {
    if (!event.target.closest(".todo-menu__item")) {
      this.deleteClass();
      document.removeEventListener("click", this.delEditAbil);
    }
  }
  deleteClass() {
    const temparr = [...this.menu.childNodes];
    temparr.forEach((element) => {
      const listItem = [...element.children].find((element) =>
        element.classList.contains("todo-menu__item")
      );
      console.log(listItem);
      const length = listItem.children.length;
      let text;
      if (length > 0) {
        text = listItem.children[0].value;
        listItem.removeChild(listItem.children[0]);
        listItem.innerText = text;
        document.removeEventListener("click", this.delEditAbil);
        return;
      }
    });
  }
  enterTask(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      event.target.parentNode.innerText = event.target.value;
      event.target.remove();
    }
    document.removeEventListener("keyup", this.enterTask);
    document.removeEventListener("click", this.delEditAbil);
  }
  editTask(task) {
    this.deleteClass();
    const input = this.#createInput(task);
    this.delEditAbil = this.delEditAbil.bind(this);
    const deleteText = task.childNodes[0];
    task.removeChild(deleteText);
    task.appendChild(input);
    document.addEventListener("keyup", this.enterTask);
    document.addEventListener("click", this.delEditAbil);
  }
}
