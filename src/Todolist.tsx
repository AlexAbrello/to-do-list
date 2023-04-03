import React from 'react';
import {FilterKeyType} from "./App";

type TaskType = {
    id: number
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: number) => void
    filterTask: (value: FilterKeyType) => void
}

export function Todolist(props: PropsType) {
    return <div>
        <h3>{props.title}</h3>
        <div>
            <input/>
            <button>+</button>
        </div>
        <ul>
            {props.tasks.map(el => {
                return (
                    <li key={el.id}>
                        <button onClick={() => props.removeTask(el.id)}>X</button>
                        <input type="checkbox" checked={el.isDone}/>
                        <span>{el.title}</span></li>
                )
            })}
        </ul>
        <div>
            <button onClick={() => props.filterTask('all')}>All</button>
            <button onClick={() => props.filterTask('active')}>Active</button>
            <button onClick={() => props.filterTask('completed')}>Completed</button>
        </div>
    </div>
}
