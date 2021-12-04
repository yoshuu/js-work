const todoForm = document.getElementById('todo-form')
const todoInput = document.getElementById('todo-input')
const todoContainer = document.getElementById('todo-container')
const alertMsg = document.getElementById('alert-msg')
const todoFilter = document.getElementById('todo-filter')


// 轉變成黑暗模式
const options = {
  bottom: '32px',
  right: '32px',
  time: '0.5s',
  mixColor: '#f2f3f7',
  backgroundColor: '#f2f3f7', 
  buttonColorDark: '#100f2c',
  buttonColorLight: 'f2f3f7', 
  saveInCookies: false,
  label: '🌓',
  autoMatchOsTheme: true
}
const darkmode = new Darkmode(options)
darkmode.showWidget()
let randomColor = ['#FF9224', '#0080FF', '#4A4AFF', '#C48888', '#5B5B5B']
let colorIndex = 0
let todoData = JSON.parse(localStorage.getItem('todo')) || []


// 增加事情清單
function addTodo(e) {
  e.preventDefault()
  if(todoInput.value.trim() !== '') {
    if(colorIndex > 4) {
      colorIndex = 0
    }

    let todo = {
      completed: false,
      color: randomColor[colorIndex++],
      content: todoInput.value,
      id: Math.floor(Math.random() * 1000)
    }
    todoData.push(todo)
    todoInput.value = ''
    saveLocalStorage(todoData)
  } else {
    alertMsg.classList.add('show')
    setTimeout(() => {
      alertMsg.classList.remove('show')
    }, 3000)
  }
  todoFilter.value = 'all'
  updateTodoUI(todoData)
}


// 編輯待辦事情
function editTodo(cacheData, element) {
  const id = element[0].dataset.index 
  const editInput = document.querySelector(`[data-index="${id}"] > input`)
  const content = document.querySelector(`[data-index="${id}"] > p`)

  editInput.classList.remove('hide')
  editInput.value = cacheData[0].content
  editInput.focus()
  content.classList.add('hide')


  // event listener
  editInput.addEventListener('keyup', e => {
    if(e.keyCode === 13) {
      editInput.classList.add('hide')
      content.classList.remove('hide')
      todoData.forEach(todo => {
        if(todo.id === +id) {
          content.innerText = editInput.value
          todo.content = editInput.value
        }
      })
      saveLocalStorage(todoData)
      updateTodoUI(todoData)
    } else if(e.keyCode === 27) {
      editInput.classList.add('hide')
      content.classList.remove('hide')
    }
  })
}


// 刪除事情
function deleteTodo(id) {
  todoData = todoData.filter(item => item.id !== id)
  saveLocalStorage(todoData)
  updateTodoUI(todoData)
}


// 完成事情
function completedTodo(cacheData, element) {
  const id = element[0].dataset.index 
  const content = document.querySelector(`[data-index="${id}"]`)

  todoData.forEach(todo => {
    if(todo.id === +id) {
      if(!todo.completed) {
        todo.completed = true
        content.classList.add('completed')
      } else {
        todo.completed = false
        content.classList.remove('completed')
      }
    }
  })
  saveLocalStorage(todoData)
  updateTodoUI(todoData)
}


// 過濾代辦的事情
function filterTodoStatus(e) {
  let status = e.target.value
  const element = document.querySelectorAll('.todo-card')
  element.forEach(item => {
    if(status === 'undone') {
      item.style.display = (item.className === 'todo-card') ? 'flex' : 'none'
    } else if(status === 'done') {
      item.style.display = (item.className !== 'todo-card') ? 'flex' : 'none'
    } else if(status === 'all'){
      item.style.display = 'flex'
    }
  })
}


//更新 todolist ui
function updateTodoUI(todo) {
  let str = ''

  for(let i = 0; i < todo.length; i++) {
    str += `
      <div class="todo-card${!todo[i].completed ? '' : ' completed'}" data-index="${todo[i].id}">
        <span style="color:${todo[i].color};border-color:${todo[i].color}" class="todo-title">todo</span>
        <p class="todo">${todo[i].content}</p>
        <input type="text" class="edit-input hide">
        <div class="todo-footer">
        <button style="color:${todo[i].color}" type="button" class="btn btn-completed" id="completed">
          <i class="fas fa-check"></i>
        </button>
        <button style="color:${todo[i].color}" type="button" class="btn btn-edit" id="edit">
          <i class="fas fa-pen"></i>
        </button>
        <button style="color:${todoData[i].color}" type="button" class="btn btn-delete" id="delete">
          <i class="fas fa-trash"></i>
        </button>
        </div>
      </div>
    `
  }
  todoContainer.innerHTML = str
}


//儲存todolist 
function saveLocalStorage(todo) {
  localStorage.setItem('todo', JSON.stringify(todo))
}

updateTodoUI(todoData)




// Event listeners
todoForm.addEventListener('submit', addTodo)
todoFilter.addEventListener('change', filterTodoStatus)

todoContainer.addEventListener('click', e => {
  const id = e.target.id
  if(id === 'delete' || id === 'edit' || id === 'completed') {
    const element = e.path.filter(item => {
      if(item.className === 'todo-card') {
        return item
      } else if(item.className === 'todo-card completed') {
        return item
      }
    })
    const cacheData = todoData.filter(item => item.id ===  +element[0].dataset.index)
    if(id === 'delete') {
      deleteTodo(cacheData[0].id)
    } else if (id === 'edit') {
      editTodo(cacheData, element)
    } else {
      todoFilter.value = 'all'
      completedTodo(cacheData, element)
    }
  }
})
