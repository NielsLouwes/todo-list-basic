import React, { useState } from "react";
import "./App.css";
import ToDo from "./components/ToDo";
import FilterButton from "./components/FilterButton";
import Form from "./components/Form";
import { nanoid } from "nanoid"; //npm install nanoid - library that easily creates unique ids our for tasks

function App(props) {
  const [tasks, setTasks] = useState(props.tasks);

  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map((task) => {
      //if this task has the same ID as the edited task
      if (id === task.id) {
        //use object spread to make new object
        //whose completed prop has been inverted
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  function deleteTask(id) {
    const remainingTasks = tasks.filter((task) => id !== task.id);
    setTasks(remainingTasks);
  }

  const taskList = tasks.map((task) => (
    <ToDo
      id={task.id}
      name={task.name}
      completed={task.completed}
      key={task.id}
      toggleTaskCompleted={toggleTaskCompleted}
      deleteTask={deleteTask}
    />
  ));

  function addTask(name) {
    const newTask = { id: "todo" + nanoid(), name: name, completed: false };
    setTasks([...tasks, newTask]);
  }
  //the following deals with spelling of tasks vs. task based on 1 or more task remaining
  const tasksNoun = taskList.length !== 1 ? "tasks" : "task";
  //this variable is there to count the tasks remaining based on the length of array "taskList" - defined in index.js
  const headingText = `${taskList.length} ${tasksNoun} remaining`;

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
      <h2 id="list-heading">{headingText}</h2>

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
