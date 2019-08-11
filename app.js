// define UI vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput =document.querySelector('#task');

// Load all event listeners
loadEventListeners();

function loadEventListeners(){
    // add task event
    form.addEventListener('submit', addTask);
    // remove task event
    taskList.addEventListener('click',removeTask);
    clearBtn.addEventListener('click',clearTasks);
    filter.addEventListener('keyup',filterTasks);
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
    // clear input
    taskInput.value = '';
    
    e.preventDefault();
}

// remove task
function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        console.log(e.target.parentElement.parentElement);
        if (confirm('Are you sure to delete?')){
            e.target.parentElement.parentElement.remove();
        }
    }
}

// clear tasks
function clearTasks(){
    // 1st way: works but slow
    // taskList.innerHTML = '';
    // 2nd way: works is faster https://jsperf.com/innerhtml-vs-removechild/47
    while(taskList.firstChild){
        //taskList.firstChild.removeChild(); // works 1st way
        taskList.removeChild(taskList.firstChild); //works 2nd way
    }

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