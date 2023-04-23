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

    let todolistTask = tasks[todolistId]
    tasks[todolistId] = todolistTask.filter(t => t.id !== id)
    setTasks({...tasks})
  }

  function addTask(title: string, todolistId: string) {
    let task = {id: v1(), title: title, isDone: false};
    let todoListTasks = tasks[todolistId]
    tasks[todolistId] = [task, ...todoListTasks];
    setTasks({...tasks});
  }

  function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
    let todoListTask = tasks[todolistId]
    let task = todoListTask.find(t => t.id === taskId);
    if (task) {
      task.isDone = isDone;
      setTasks({...tasks})
    }
  }

  function changeFilter(value: FilterValuesType, todolistId: string) {
    let todolist = todolists.find(tl => tl.id === todolistId)
    if (todolist) {
      todolist.filter = value
      setTodolists([...todolists])
    }
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
