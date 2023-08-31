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
    let entries = this.currentTaskElement.querySelector(
      ".todo-menu-item__entries"
    );
    this.currentTaskElement.addEventListener("mouseover", (event) => {
      entries.classList.remove("entries-hide");
    });
    this.currentTaskElement.addEventListener("mouseout", (event) => {
      entries.classList.add("entries-hide");
    });
    const dragElem = this.currentTaskElement.querySelector(".todo-drag");
    this.dragElem(dragElem, this.currentTaskElement);
  }

  dragElem(elem, moving) {
    let x = 0,
      y = 0,
      xold = 0,
      yold = 0;
    elem.onmousedown = dragMouse;
    function dragMouse(e) {
      e.preventDefault();
      const movingRect = moving.getBoundingClientRect();
      moving.style.position = "absolute";

      x = e.clientX;
      y = e.clientY;

      moving.style.top = movingRect.top - 100 + "px";
      moving.style.left = "0px";

      console.log(movingRect);
      document.onmousemove = dragElement;
      document.onmouseup = dragClose;
    }
    function dragElement(e) {
      e.preventDefault();
      xold = x - e.clientX;
      yold = y - e.clientY;
      x = e.clientX;
      y = e.clientY;
      moving.style.top = moving.offsetTop - yold + "px";
      moving.style.left = moving.offsetLeft - xold + "px";
    }
    function dragClose() {
      const items = document.getElementsByClassName("todo-item__wrap");
      const movingRect = moving.getBoundingClientRect();
      for (let i = 0; i < items.length; i++) {
        if (items[i] != moving) {
          const rect = items[i].getBoundingClientRect();
          if (movingRect.top >= rect.top) {
            console.log(movingRect.top, rect.top);
            moving.parentNode.insertBefore(moving, items[i]);
          }
        }
      }
      moving.style.position = "";
      moving.style.top = "";
      moving.style.left = "";
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }

  #toHTML() {
    return `<div class="todo-item__wrap " data-id=${this.id}>
    <div class="todo-drag">⣿</div>
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
