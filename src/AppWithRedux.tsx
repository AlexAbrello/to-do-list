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
  const removeTask = useCallback((id: string, todolistId: string) => {
    dispatch(removeTaskAC(id, todolistId))
  }, [dispatch])

  const addTask = useCallback((todolistId: string, title: string) => {
    dispatch(addTaskAC(todolistId, title))
  }, [dispatch])

  const changeStatus = useCallback((id: string, isDone: boolean, todolistId: string) => {
    dispatch(changeTaskStatusAC(id, isDone, todolistId))
  }, [dispatch])

  const changeTaskTitle = useCallback((id: string, title: string, todolistId: string) => {
    dispatch(changeTaskTitleAC(id, title, todolistId))
  }, [dispatch])
  //Tasks

  // ======================================================

  // TodoList
  const changeTodoListTitle = useCallback((id: string, title: string) => {
    dispatch(changeTodoListTitleAC(id, title))
  }, [dispatch])
  const addTodoList = useCallback((title: string) => {
    //const action = addTodoListAC(title)
    dispatch(addTodoListAC(title))
  }, [dispatch])

  const changeFilter = useCallback((value: FilterValuesType, todolistId: string) => {
    dispatch(changeTodoListFilterAC(value, todolistId))
  }, [dispatch])

  const removeTodolist = useCallback((id: string) => {
    dispatch(removeTodoListAC(id))
  }, [dispatch])

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
