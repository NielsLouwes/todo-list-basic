import React, { useState } from 'react'
import './App.css';
import ToDo from './components/ToDo';
import FilterButton from './components/FilterButton';
import Form from './components/Form';

function App(props) {
  const [tasks, setTasks] = useState(props.tasks);

  const taskList = tasks.map(task => (
    <ToDo
        id={task.id}
        name={task.name}
        completed={task.completed}
        key={task.id}
      />
    )
  );

  function addTask(name) {
    const newTask = { id: "id", name: name, completed: false };
    setTasks([...tasks, newTask]);
  }


  return (
    <div className="todoapp stack-large">
      <h1>To Do</h1>
      <Form addTask={addTask} />
      <div className="filters btn-group stack-exception">
        <button type="button" className="btn toggle-btn" aria-pressed="true">
          <span className="visually-hidden">Show </span>
          <span>all</span>
          <span className="visually-hidden"> tasks</span>
        </button>
        <button type="button" className="btn toggle-btn" aria-pressed="false">
          <span className="visually-hidden">Show </span>
          <span>Active</span>
          <span className="visually-hidden"> tasks</span>
        </button>
        <button type="button" className="btn toggle-btn" aria-pressed="false">
          <span className="visually-hidden">Show </span>
          <span>Completed</span>
          <span className="visually-hidden"> tasks</span>
        </button>
      </div>
      <h2 id="list-heading">
        3 tasks remaining
      </h2>
     
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
       {taskList}
      </ul>
    </div>
  );
}

export default App;