import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = "all" | "active" | "completed";

type TodolistsType = {
  id: string
  title: string
  filter: FilterValuesType
}
type TasksStateType = {
  [id: string] : TaskType[]
}

function App() {

  const todolistId1 = v1()
  const todolistId2 = v1()

  const [todolists, setTodolists] = useState<TodolistsType[]>([
    {id: todolistId1, title: 'What to learn', filter: 'all'},
    {id: todolistId2, title: 'What to buy', filter: 'all'}
  ])

  const [tasks, setTasks] = useState<TasksStateType>({
    [todolistId1]: [
      {id: v1(), title: "HTML&CSS", isDone: true},
      {id: v1(), title: "JS", isDone: true},
      {id: v1(), title: "ReactJS", isDone: false},
      {id: v1(), title: "Rest API", isDone: false},
      {id: v1(), title: "GraphQL", isDone: false},
    ],
    [todolistId2]: [
      {id: v1(), title: 'Rest API', isDone: true},
      {id: v1(), title: 'GraphQL', isDone: false},
    ]
  })


  function removeTask(id: string, todolistId: string) {
    setTasks({...tasks, [todolistId]: tasks[todolistId].filter(el => el.id !== id)})
  }

  function addTask(title: string, todolistId: string) {
    let newTask: TaskType = {id: v1(), title, isDone: false}
    setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
  }

  function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
    setTasks({...tasks, [todolistId]: tasks[todolistId].map(el => el.id === taskId ? {...el, isDone} : el)})
  }

  function changeFilter(value: FilterValuesType, todolistId: string) {
    setTodolists(todolists.map(el => el.id === todolistId ? {...el, filter: value} : el))
  }

  function deleteTodoList(todolistId: string) {
    setTodolists(todolists.filter(el => el.id !== todolistId))
    delete tasks[todolistId]
    setTasks({...tasks})
  }

  return (
      <div className="App">

        {todolists.map(el => {

          let tasksForTodolist = tasks[el.id];

          if (el.filter === "active") {
            tasksForTodolist = tasks[el.id].filter(t => t.isDone === false);
          }
          if (el.filter === "completed") {
            tasksForTodolist = tasks[el.id].filter(t => t.isDone === true);
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
                  deleteTodoList={deleteTodoList}
              />
          )
        })}

      </div>
  );
}

export default App;
