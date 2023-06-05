import React, {useCallback, useReducer} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from "./components/AddItemForm";
import {ButtonAppBar} from "./components/ButtonAppBar";
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import {
  addTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
  tasksReducer
} from "./reducers/tasksReducer";
import {
  addTodoListAC, changeTodoListFilterAC,
  changeTodoListTitleAC,
  removeTodoListAC,
  todoListReducer
} from "./reducers/todoListReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

export type FilterValuesType = "all" | "active" | "completed";

export type TodolistType = {
  id: string
  title: string
  filter: FilterValuesType
}

export type TasksStateType = {
  [key: string]: Array<TaskType>
}

function App() {

  const todolists = useSelector<AppRootStateType, TodolistType[]>(state => state.todolists)
  const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
  const dispatch = useDispatch()

  // Tasks
  function removeTask(id: string, todolistId: string) {
    dispatch(removeTaskAC(id, todolistId))
  }

  function addTask(todolistId: string, title: string) {
    dispatch(addTaskAC(todolistId, title))
  }

  function changeStatus(id: string, isDone: boolean, todolistId: string) {
    dispatch(changeTaskStatusAC(id, isDone, todolistId))
  }

  const changeTaskTitle = (id: string, title: string, todolistId: string) => {
    dispatch(changeTaskTitleAC(id, title, todolistId))
  }
  //Tasks

  // ======================================================

  // TodoList
  const changeTodoListTitle = (id: string, title: string) => {
    dispatch(changeTodoListTitleAC(id, title))
  }
  const addTodoList = useCallback((title: string) => {
    //const action = addTodoListAC(title)
    dispatch(addTodoListAC(title))
  }, [dispatch])

  function changeFilter(value: FilterValuesType, todolistId: string) {
    dispatch(changeTodoListFilterAC(value, todolistId))
  }

  function removeTodolist(id: string) {
    dispatch(removeTodoListAC(id))
  }

  // TodoList

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
