export class Task {
  constructor(text) {
    this.text = text;
    this.#render();
  }
  #render() {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = this.#toHTML();
    this.currentTaskElement = tempDiv.firstElementChild;
  }
  #toHTML() {
    return `<div class="todo-item__wrap">
    <li class="todo-menu__item">${this.text}</li>
        <div class="todo-menu-item__entries">
          <button
            class="todo-menu-item-entries__delete todo-menu-item__entry"
          ></button>
          <button
            class="todo-menu-item-entries__complete todo-menu-item__entry"
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