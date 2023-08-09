import React, {FC} from 'react';
import {Task} from "features/TodolistsList/Todolist/tasks/Task/Task";
import {TaskStatuses, TaskType} from "common/api/todolists-api";
import {TodolistDomainType} from "features/TodolistsList/todolists-reducer";

type Props = {
    tasks: TaskType[]
    todolist: TodolistDomainType
}

export const Tasks: FC<Props> = ({tasks, todolist}) => {

    if (todolist.filter === 'active') {
        tasks = tasks.filter(t => t.status === TaskStatuses.New)
    }
    if (todolist.filter === 'completed') {
        tasks = tasks.filter(t => t.status === TaskStatuses.Completed)
    }

    return (
        <>
            {
                tasks.map(t => <Task key={t.id} task={t} todolistId={todolist.id}/>)
            }
        </>
    );
};

