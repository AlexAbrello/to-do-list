import React from 'react'
import {AddItemForm} from 'components/AddItemForm/AddItemForm'
import {TaskType} from 'common/api/todolists-api'
import {TodolistDomainType} from '../todolists-reducer'
import {useActions} from "common/hooks";
import {tasksThunks} from "features/TodolistsList/tasks-reducer";
import {FilterTasksButtons} from "features/TodolistsList/Todolist/filterTasksButtons/filter-tasks-buttons";
import {Tasks} from "features/TodolistsList/Todolist/tasks/tasks";
import {TodolistTitle} from "features/TodolistsList/Todolist/todolist-title/todolist-title";

type PropsType = {
    todolist: TodolistDomainType
    tasks: Array<TaskType>
    demo?: boolean
}

export const Todolist = React.memo(function ({demo = false, ...props}: PropsType) {

    const {addTask} = useActions(tasksThunks)

    const addTaskCallBack = (title: string) => {
        addTask({title: title, todolistId: props.todolist.id})
    }

    return <div>
        <TodolistTitle todolist={props.todolist}/>
        <AddItemForm addItem={addTaskCallBack} disabled={props.todolist.entityStatus === 'loading'}/>
        <Tasks tasks={props.tasks} todolist={props.todolist}/>
        <div style={{paddingTop: '10px'}}>
            <FilterTasksButtons todolist={props.todolist}/>
        </div>
    </div>
})


