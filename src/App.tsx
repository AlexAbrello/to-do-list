import React, {useReducer, useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from "./components/AddItemForm";
import {ButtonAppBar} from "./components/ButtonAppBar";
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./reducers/tasksReducer";

export type FilterValuesType = "all" | "active" | "completed";
type TodolistType = {
  id: string
  title: string
  filter: FilterValuesType
}

export type TasksStateType = {
  [key: string]: Array<TaskType>
}


function App() {

  let todolistId1 = v1();
  let todolistId2 = v1();

  let [todolists, setTodolists] = useState<Array<TodolistType>>([
    {id: todolistId1, title: "What to learn", filter: "all"},
    {id: todolistId2, title: "What to buy", filter: "all"}
  ])

  let [tasks, dispatchTasks] = useReducer(tasksReducer, {
    [todolistId1]: [
      {id: v1(), title: "HTML&CSS", isDone: true},
      {id: v1(), title: "JS", isDone: true}
    ],
    [todolistId2]: [
      {id: v1(), title: "Milk", isDone: true},
      {id: v1(), title: "React Book", isDone: true}
    ]
  });

  const changeTodoListTitle = (id: string, title: string) => {
    setTodolists(todolists.map(el => el.id === id ? {...el, title: title} : el))
  }
  const changeTaskTitle = (id: string, title: string, todolistId: string) => {
    dispatchTasks(changeTaskTitleAC(id, title, todolistId))
  }

  const addTodoList = (title: string) => {
    let todoListId = v1()
    let newTodoList: TodolistType = {id: todoListId, title: title, filter: 'all'}
    setTodolists([newTodoList, ...todolists])
    setTasks({...tasks, [todoListId]: []})
  }

  function removeTask(id: string, todolistId: string) {
    dispatchTasks(removeTaskAC(id, todolistId))
  }

  function addTask(todolistId: string, title: string) {
    dispatchTasks(addTaskAC(todolistId, title))
  }

  function changeStatus(id: string, isDone: boolean, todolistId: string) {
    dispatchTasks(changeTaskStatusAC(id, isDone, todolistId))
  }

  function changeFilter(value: FilterValuesType, todolistId: string) {
    let todolist = todolists.find(tl => tl.id === todolistId);
    if (todolist) {
      todolist.filter = value;
      setTodolists([...todolists])
    }
  }

  function removeTodolist(id: string) {
    // засунем в стейт список тудулистов, id которых не равны тому, который нужно выкинуть
    setTodolists(todolists.filter(tl => tl.id !== id));
    // удалим таски для этого тудулиста из второго стейта, где мы храним отдельно таски
    delete tasks[id]; // удаляем св-во из объекта... значением которого являлся массив тасок
    // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
    setTasks({...tasks});
  }

  return (
      <div className="App">
        <ButtonAppBar/>
        <Container>
          <Grid container style={{padding: '20px'}}>
            <AddItemForm addItem={addTodoList}/>
          </Grid>
          <Grid container spacing={3}>
            {
              todolists.map(tl => {
                let allTodolistTasks = tasks[tl.id];
                let tasksForTodolist = allTodolistTasks;

                if (tl.filter === "active") {
                  tasksForTodolist = allTodolistTasks.filter(t => !t.isDone);
                }
                if (tl.filter === "completed") {
                  tasksForTodolist = allTodolistTasks.filter(t => t.isDone);
                }

                return <Grid item key={tl.id}>
                  <Paper elevation={5} style={{padding: '10px'}}>
                    <Todolist
                        id={tl.id}
                        title={tl.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        filter={tl.filter}
                        removeTodolist={removeTodolist}
                        changeTaskTitle={changeTaskTitle}
                        changeTodoListTitle={changeTodoListTitle}
                    />
                  </Paper>
                </Grid>
              })
            }
          </Grid>
        </Container>
      </div>
  );
}

export default App;
