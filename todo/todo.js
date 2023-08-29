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
  #render() {
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
  hasItem(id) {
    return this.taskList.find((el) => el.id === id);
  }
  deleteTask(id) {
    const deleteItem = this.hasItem(id);
    this.taskList = this.taskList.filter((value) => value !== deleteItem);
    this.menu.removeChild(deleteItem.currentTaskElement);
  }
}
