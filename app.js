let textInput = document.getElementsByClassName("todo__text")[0]

let tasks = new Array();

function addItem(){
    if(textInput.value !== ""){
        console.log(textInput.value)
        tasks.push(new Task(textInput.value))
        textInput.value = ""
    }
}