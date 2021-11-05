let input = document.getElementById("input-text")

let list = document.getElementById("list")

let inputValue = input.value
input.onchange = function () {
  inputValue = input.value
}

let taskArray = []

function remove(element) {
  element.remove()
}
function newlist(x) {
  let listItem = document.createElement("div")
  listItem.classList = "task"
  let listIcon = document.createElement("i")
  let task = document.createElement("p")
  let taskText = document.createTextNode(x)
  let deleteTask = document.createElement("button")
  let deleteText = document.createTextNode("Delete")

  listIcon.classList = "fas fa-clipboard-list"
  listItem.appendChild(listIcon)
  task.appendChild(taskText)
  listItem.appendChild(task)
  listIcon.appendChild(task)
  deleteTask.appendChild(deleteText)
  deleteTask.classList = "delete"
  listItem.appendChild(deleteTask)
  list.appendChild(listItem)

  deleteTask.onclick = function () {
    for (let index = 0; index < taskArray.length; index++) {
      let element = taskArray[index]

      if (taskArray[taskArray.indexOf(element)].taskName == x) {
        taskArray.splice(index, 1)
        listItem.remove()
        window.localStorage.setItem("all-tasks", JSON.stringify(taskArray))
      }
    }
  }
}

if (localStorage.getItem("all-tasks")) {
  taskArray = JSON.parse(window.localStorage.getItem("all-tasks"))
  taskArray.forEach((task) => {
    newlist(task.taskName)
  })
}
let menuIcon = document.querySelector(".menu-icon")
let menuIconicon = document.querySelector(".menu-icon i")
let menu = document.querySelector(".menu")
menuIcon.onclick = function () {
  if (menu.style.left == "0") {
    menu.style.left = "-200"
  } else {
    menu.style.left = "0"
    menuIcon.style.opacity = "0"
  }
}
let colseIcon = document.querySelector(".colse-icon")
colseIcon.onclick = function () {
  menu.style.left = "-200"
  setTimeout(() => {
    menuIcon.style.opacity = "1"
  }, 800)
}
//*** */

let lis = document.querySelectorAll("ul li")
let taskBorder = document.getElementsByClassName("task")
let addBtn = document.querySelector('.add')


if (window.localStorage.getItem("color")) {
  menuIconicon.style.color = window.localStorage.getItem("color")
  addBtn.style.backgroundColor = window.localStorage.getItem("color")
  lis.forEach((li) => {
    li.classList.remove("active")
  })
  for(let i=0 ; i < taskBorder.length ; i++){
    let task = taskBorder[i]
    task.style.borderColor =  window.localStorage.getItem("color")
   }
  document.querySelector(`[data-color =  ${window.localStorage.getItem("color")}]`).classList.add("active")
}

lis.forEach((li) => {
  li.addEventListener("click", (e) => {
    lis.forEach((li) => {
      li.classList.remove("active")
    })
    for(let i=0 ; i < taskBorder.length ; i++){
     let task = taskBorder[i]
     task.style.borderColor = e.currentTarget.dataset.color
    }
    e.currentTarget.classList.add("active")
    window.localStorage.setItem("color", e.currentTarget.dataset.color)
    menuIconicon.style.color = e.currentTarget.dataset.color
    addBtn.style.backgroundColor = e.currentTarget.dataset.color

  })
})

//** */
function addTask(event) {
  event.preventDefault()

  if (inputValue == "") {
    alert("empty input")
  } else {
    newlist(inputValue)
    let task = {}
    task.taskId = Math.random()
    task.taskName = inputValue
    taskArray.push(task)
    window.localStorage.setItem("taskId", Math.random())
    window.localStorage.setItem("taskName", inputValue)
    window.localStorage.setItem("all-tasks", JSON.stringify(taskArray))
    for(let i=0 ; i < taskBorder.length ; i++){
      let task = taskBorder[i]
      task.style.borderColor = window.localStorage.getItem("color")
     }
    input.value = ""
  }
}