let tasks = [];
const pomodoroForm = document.querySelector( '.js-add-task' );
const pomodoroTableBody = document.querySelector( '.js-task-table-body' );

const addTask = function( event ) {
    // 1. Prevent default action
    event.preventDefault();
    // 2. Extract form field values
    const taskName = this.querySelector( '.js-task-name' ).value;
    const pomodoroCount = this.querySelector( '.js-pomodoro-count' ).value;
    // 3. Create a new task item by updating the global state
    tasks.push( {
    taskName,
    pomodoroDone: 0,
    pomodoroCount,
    finished: false
    } );
    // 4. Reset the form
    this.reset();
    // 5. Render the global state
    renderTasks( pomodoroTableBody, tasks );
}
pomodoroForm.addEventListener( 'submit', addTask );

const renderTasks = function( tBodyNode, tasks = [] ) { 
    var task = tasks.map( ( task, id ) => `
        <tr>
            <td class="cell-task-name">${task.taskName}</td>
            <td class="cell-pom-count">${task.pomodoroDone} / ${task.pomodoroCount} pomodori</td>
            <td class="cell-pom-controls">
            ${ task.finished ? 'Finished' : `
            <button class="js-task-done" data-id="${id}">Done</button>
            <button class="js-increase-pomodoro" data-id="${id}">Increase Pomodoro Count</button>`
            }
            <button class="js-delete-task" data-id="${id}">Delete Task</button>
            </td>
        </tr>
    ` )
    tBodyNode.innerHTML = task.join( '' );
    addTaskEventListeners();
}

const finishTask = ( e ) => {
    const taskId = e.target.dataset.id;
    tasks[ taskId ].finished = true;
    renderTasks( pomodoroTableBody, tasks );
}

const increasePomodoroDone = ( e ) => {
    const taskId = e.target.dataset.id;
    tasks[ taskId ].pomodoroDone += 1;
    renderTasks( pomodoroTableBody, tasks );
}

const deleteTask = ( e ) => {
    const taskId = e.target.dataset.id;
    tasks.splice( taskId, 1 );
    renderTasks( pomodoroTableBody, tasks );
}

const addTaskEventListeners = () => {
    document.querySelectorAll( '.js-task-table-body .js-increase-pomodoro' ).forEach( button =>
        button.addEventListener( 'click', increasePomodoroDone )
    );
    document.querySelectorAll( '.js-task-table-body .js-task-done' ).forEach( button =>
        button.addEventListener( 'click', finishTask )
    );
    document.querySelectorAll( '.js-task-table-body .js-delete-task' ).forEach( button =>
        button.addEventListener( 'click', deleteTask )
    );
}    