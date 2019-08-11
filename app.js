// define UI vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput =document.querySelector('#task');

// Load all event listeners
loadEventListeners();

function loadEventListeners(){
    // dom load event
    document.addEventListener('DOMContentLoaded',getTasks); 
    // add task event
    form.addEventListener('submit', addTask);
    // remove task event
    taskList.addEventListener('click',removeTask);
    clearBtn.addEventListener('click',clearTasks);
    filter.addEventListener('keyup',filterTasks);
}

// get tasks form LS
function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task){
        const li = document.createElement('li');
        li.className = 'collection-item';
        li.appendChild(document.createTextNode(task));
        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';
        link.innerHTML= '<i class="fa fa-remove"></i>';
        li.appendChild(link);
        taskList.appendChild(li);
    });
}

// add task
function addTask(e){
    if(taskInput.value === ''){
        alert('add task here');
    }
    // create lit element
    const li = document.createElement('li');
    li.className = 'collection-item';
    // create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));
    // create new link element
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    // add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // append link to li
    li.appendChild(link);
    // append li to ul
    taskList.appendChild(li);

    // store in local storage
    storeTaskInLocalStorage(taskInput.value);

    // clear input
    taskInput.value = '';
    
    e.preventDefault();
}

// store task
function storeTaskInLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }
    else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// remove task
function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        // console.log(e.target.parentElement.parentElement);
        if (confirm('Are you sure to delete?')){
            e.target.parentElement.parentElement.remove();

            // remove from LS
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}

// remove from LS
function removeTaskFromLocalStorage(taskItem){
    console.log(taskItem);
    let tasks;
    if (localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task, index){
        if (taskItem.textContent === task){
            tasks.splice(index,1);
        }
    });
    localStorage.setItem('tasks',JSON.stringify(tasks));
}

// clear tasks
function clearTasks(){
    // 1st way: works but slow
    // taskList.innerHTML = '';
    // 2nd way: works is faster https://jsperf.com/innerhtml-vs-removechild/47
    while(taskList.firstChild){
        //taskList.firstChild.removeChild(); // works 1st way
        taskList.removeChild(taskList.firstChild); //works 2nd way
        //removeTaskFromLocalStorage(taskList.firstChild); // works but not effifient to remove 1 by 1
    }
    clearTasksFromLocalStorage(); // use this to clear all tasks
}

// clear all tasks from LS
function clearTasksFromLocalStorage(){
    localStorage.clear();
}

// filter tasks
function filterTasks(e){
    var text = e.target.value.toLowerCase();
    console.log(e.target.value);
    let list = document.querySelectorAll('.collection-item');
    list.forEach(function(task){
        if (task.innerText.toLowerCase().indexOf(text) != -1)
        {
            console.log("SHOW:" + task.innerText.toLowerCase());
            task.style.display = 'block';
        }
        else {
            console.log("HIDE:" + task.innerText.toLowerCase());
            task.style.display = 'none';
        }
    });
}