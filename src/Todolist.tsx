import React, {useState} from 'react';
import {FilterKeyType} from "./App";

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: number) => void
    filterTask?: (filterKey: FilterKeyType) => void
}

export function Todolist(props: PropsType) {

    let [filter, setFilter] = useState<string>('all')

    const collanderFoo = () => {
        let filteredTask: TaskType[] = props.tasks

        if (filter === 'active') {
            filteredTask = props.tasks.filter(el => !el.isDone)
        } if (filter === 'completed') {
            filteredTask = props.tasks.filter(el => el.isDone)
        }
        return filteredTask
    }

    const filterTask = (filterKey: FilterKeyType) => {
        setFilter(filterKey)
    }

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input/>
            <button>+</button>
        </div>
        <ul>
            {collanderFoo().map(el => {
                return (
                    <li key={el.id}>
                        <button onClick={() => props.removeTask(el.id)}>X</button>
                        <input type="checkbox" checked={el.isDone}/>
                        <span>{el.title}</span></li>
                )
            })}
        </ul>
        <div>
            <button onClick={() => filterTask('all')}>All</button>
            <button onClick={() => filterTask('active')}>Active</button>
            <button onClick={() => filterTask('completed')}>Completed</button>
        </div>
    </div>
}
