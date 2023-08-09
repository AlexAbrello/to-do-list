import React from 'react'
import {AddItemForm} from 'components/AddItemForm/AddItemForm'
import {EditableSpan} from 'components/EditableSpan/EditableSpan'
import {Task} from './tasks/Task/Task'
import {TaskStatuses, TaskType} from 'common/api/todolists-api'
import {TodolistDomainType, todosThunks} from '../todolists-reducer'
import {IconButton} from '@mui/material'
import {Delete} from '@mui/icons-material'
import {useActions} from "common/hooks";
import {tasksThunks} from "features/TodolistsList/tasks-reducer";
import {FilterTasksButtons} from "features/TodolistsList/Todolist/filterTasksButtons/filter-tasks-buttons";
import {Tasks} from "features/TodolistsList/Todolist/tasks/tasks";

type PropsType = {
    todolist: TodolistDomainType
    tasks: Array<TaskType>
    demo?: boolean
}

export const Todolist = React.memo(function ({demo = false, ...props}: PropsType) {

    const {addTask} = useActions(tasksThunks)
    const {removeTodolist, changeTodolistTitle} = useActions(todosThunks)

    const addTaskCallBack = (title: string) => {
        addTask({title: title, todolistId: props.todolist.id})
    }

    const removeTodolistHandler = () => {
        removeTodolist({todolistId: props.todolist.id})
    }
    const changeTodolistTitleHandler = (title: string) => {
        changeTodolistTitle({title: title, id: props.todolist.id})
    }

    return <div>
        <h3><EditableSpan value={props.todolist.title} onChange={changeTodolistTitleHandler}/>
            <IconButton onClick={removeTodolistHandler} disabled={props.todolist.entityStatus === 'loading'}>
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTaskCallBack} disabled={props.todolist.entityStatus === 'loading'}/>
        <Tasks tasks={props.tasks} todolist={props.todolist}/>
        <div style={{paddingTop: '10px'}}>
            <FilterTasksButtons todolist={props.todolist}/>
        </div>
    </div>
})


