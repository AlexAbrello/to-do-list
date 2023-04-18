import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import Button from "./components/Button";
import style from './components/Error.module.css'

type TaskType = {
  id: string
  title: string
  isDone: boolean
}

type PropsType = {
  title: string
  tasks: Array<TaskType>
  removeTask: (taskId: string) => void
  changeFilter: (value: FilterValuesType) => void
  addTask: (title: string) => void
  changeInputCheck: (id: string, isDoneValue: boolean) => void
}

export function Todolist(props: PropsType) {

  const [title, setTitle] = useState<string>('')
  const [error, setError] = useState<string | null>(null)

  const changeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setError(null)
    setTitle(e.currentTarget.value)
  }

  const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    (e.key === 'Enter') && addTaskHandler()
  }

  const addTaskHandler = () => {
    if (title.trim()) {
      props.addTask(title.trim())
      setTitle('')
    } else {
      setError('Title is required!')
    }
  }

  return <div>
    <h3>{props.title}</h3>
    <div>
      <input
          className={error ? style.error : ''}
          value={title}
          onChange={changeTitleHandler}
          onKeyDown={onKeyDownHandler}
      />
      <button onClick={addTaskHandler}>+</button>
    </div>
    {error && <div className={style.errorMessage}>{error}</div>}
    <ul>
      {
        props.tasks.map(t => {
          const removeTaskHandler = () => {
            props.removeTask(t.id)
          }
          const onChecboxHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeInputCheck(t.id, e.currentTarget.checked)
          }
          return (
              <li key={t.id}>
                <input type="checkbox" checked={t.isDone} onChange={onChecboxHandler}/>
                <span>{t.title}</span>
                <button onClick={removeTaskHandler}>x</button>
              </li>
          )
        })
      }
    </ul>
    <div>
      <Button name={'All'} callBack={() => props.changeFilter("all")}/>
      <Button name={'Active'} callBack={() => {
        props.changeFilter("active")
      }}/>
      <Button name={'Completed'} callBack={() => {
        props.changeFilter("completed")
      }}/>
    </div>
  </div>
}
