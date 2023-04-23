import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = "all" | "active" | "completed";

type TodolistsType = {
  id: string
  title: string
  filter: FilterValuesType
}

function App() {

  let [tasks, setTasks] = useState([
    {id: v1(), title: "HTML&CSS", isDone: true},
    {id: v1(), title: "JS", isDone: true},
    {id: v1(), title: "ReactJS", isDone: false},
    {id: v1(), title: "Rest API", isDone: false},
    {id: v1(), title: "GraphQL", isDone: false},
  ]);

  const [todolists, setTodolists] = useState<TodolistsType[]>(
      [
        {id: v1(), title: 'What to learn', filter: 'all'},
        {id: v1(), title: 'What to buy', filter: 'all'}
      ]
  )


  function removeTask(id: string) {
    let filteredTasks = tasks.filter(t => t.id != id);
    setTasks(filteredTasks);
  }

  function addTask(title: string) {
    let task = {id: v1(), title: title, isDone: false};
    let newTasks = [task, ...tasks];
    setTasks(newTasks);
  }

  function changeStatus(taskId: string, isDone: boolean) {
    let task = tasks.find(t => t.id === taskId);
    if (task) {
      task.isDone = isDone;
    }

    setTasks([...tasks]);
  }

  function changeFilter(value: FilterValuesType, todolistId: string) {
    let todolist = todolists.find(tl => tl.id === todolistId)
      if (todolist) {
          todolist.filter = value
          setTodolists([...todolists])
      }
  }

  return (
      <div className="App">
        {todolists.map(el => {

            let tasksForTodolist = tasks;

            if (el.filter === "active") {
                tasksForTodolist = tasks.filter(t => t.isDone === false);
            }
            if (el.filter === "completed") {
                tasksForTodolist = tasks.filter(t => t.isDone === true);
            }

          return (
              <Todolist
                  key={el.id}
                  id={el.id}
                  title={el.title}
                  tasks={tasksForTodolist}
                  removeTask={removeTask}
                  changeFilter={changeFilter}
                  addTask={addTask}
                  changeTaskStatus={changeStatus}
                  filter={el.filter}
              />
          )
        })}

      </div>
  );
}

export default App;
