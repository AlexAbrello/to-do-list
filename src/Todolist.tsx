import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import Button from "./components/Button";

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
}

export function Todolist(props: PropsType) {

    const [title, setTitle] = useState<string>('')

    const changeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        (e.key === 'Enter') && addTaskHandler()
    }

    const addTaskHandler = () => {
        props.addTask(title)
        setTitle('')
    }

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={title}
                   onChange={changeTitleHandler}
                   onKeyDown={onKeyDownHandler}
            />
            <button onClick={addTaskHandler}>+</button>
        </div>
        <ul>
            {
                props.tasks.map(t => {
                  const removeTaskHandler = () => {
                    props.removeTask(t.id)
                  }
                  return (
                      <li key={t.id}>
                        <input type="checkbox" checked={t.isDone}/>
                        <span>{t.title}</span>
                        <button onClick={removeTaskHandler}>x</button>
                      </li>
                  )
                })
            }
        </ul>
        <div>
            <Button name={'All'} callBack={() => props.changeFilter("all")}/>
            <Button name={'Active'} callBack={() => { props.changeFilter("active") }}/>
            <Button name={'Completed'} callBack={() => { props.changeFilter("completed") }}/>
        </div>
    </div>
}
