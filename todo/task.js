export class Task {
  constructor(text, id) {
    this.text = text;
    this.id = id;
    this.#render();
  }
  #render() {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = this.#toHTML();
    this.currentTaskElement = tempDiv.firstElementChild;
    let entries = this.currentTaskElement.querySelector(".todo-menu-item__entries")
    this.currentTaskElement.addEventListener(
      "mouseover",
      (event) => {
        entries.classList.remove("entries-hide")
      });
    this.currentTaskElement.addEventListener(
      "mouseout",
      (event) => {
        entries.classList.add("entries-hide")
      });
  }
  #toHTML() {
    return `<div class="todo-item__wrap " data-id=${this.id}>
    <li class="todo-menu__item" data-type="taskText">${this.text}</li>
        <div class="todo-menu-item__entries entries-hide">
          <button
            class="todo-menu-item-entries__delete todo-menu-item__entry"
            data-type="deleteButton"
          ></button>
          <button
            class="todo-menu-item-entries__complete todo-menu-item__entry"
            data-type="completeButton"
          ></button>
          <!-- <button
            class="todo-menu-item-entries__change todo-menu-item__entry"
          >
            Change
          </button> -->
        </div>
      </div>
      </div>`;
  }
}
