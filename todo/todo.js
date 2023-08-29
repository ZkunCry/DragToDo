class Task{
    constructor(text){
        let menu = document.getElementsByClassName("todo-menu")[0]
        
        this.text = document.createTextNode(text)
        this.order = tasks.length
        this.task = document.createElement("li")
        this.task.className = "todo-menu__item"
        this.task.appendChild(this.text)
        menu.appendChild(this.task)
    }
    createTaskMenu(){
        
    }
}