import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from "./components/AddItemForm";
import {EditableSpan} from "./components/EditableSpan";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

type PropsType = {
  id: string
  title: string
  tasks: Array<TaskType>
  removeTask: (taskId: string, todolistId: string) => void
  changeFilter: (value: FilterValuesType, todolistId: string) => void
  addTask: (todolistId: string, title: string) => void
  changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
  removeTodolist: (id: string) => void
  changeTaskTitle: (id: string, title: string, todoListId: string) => void
  changeTodoListTitle: (id: string, title: string) => void
  filter: FilterValuesType
}

export function Todolist(props: PropsType) {

  const addTask = (title: string) => {
    props.addTask(props.id, title)
  }
  const removeTodolist = () => props.removeTodolist(props.id)
  const onAllClickHandler = () => props.changeFilter("all", props.id);
  const onActiveClickHandler = () => props.changeFilter("active", props.id);
  const onCompletedClickHandler = () => props.changeFilter("completed", props.id);

  const changeTodoListTitle = (title:string) => {
    props.changeTodoListTitle(props.id, title)
  }
  return <div>
    <h3>
      <EditableSpan title={props.title} callBack={changeTodoListTitle} />
      {/*<button onClick={removeTodolist}>x</button>*/}
      <IconButton aria-label="delete" onClick={removeTodolist}>
        <DeleteIcon />
      </IconButton>
    </h3>
    <AddItemForm addItem={addTask}/>
    <ul>
      {
        props.tasks.map(t => {
          const onClickHandler = () => props.removeTask(t.id, props.id)
          const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            let newIsDoneValue = e.currentTarget.checked;
            props.changeTaskStatus(t.id, newIsDoneValue, props.id);
          }
          const changeTaskTitleHandler = (title: string) => {
            props.changeTaskTitle(t.id, title, props.id)
          }

          return (
              <li key={t.id} className={t.isDone ? "is-done" : ""}>
                {/*<input type="checkbox" onChange={onChangeHandler} checked={t.isDone}/>*/}
                <Checkbox  onChange={onChangeHandler} checked={t.isDone} />
                <EditableSpan title={t.title} callBack={changeTaskTitleHandler}/>
                {/*<button onClick={onClickHandler}>x</button>*/}
                <IconButton aria-label="delete" onClick={onClickHandler}>
                  <DeleteIcon />
                </IconButton>
              </li>

          )
        })
      }
    </ul>
    <div>
      <Button variant={props.filter === 'all' ? 'outlined' : "contained"} color="success" onClick={onAllClickHandler}>
        All
      </Button>
      <Button variant={props.filter === 'active' ? 'outlined' : "contained"} color="secondary" onClick={onActiveClickHandler}>
        Active
      </Button>
      <Button variant={props.filter === 'completed' ? 'outlined' : "contained"} color="error" onClick={onCompletedClickHandler}>
        Completed
      </Button>
    </div>
  </div>
}


