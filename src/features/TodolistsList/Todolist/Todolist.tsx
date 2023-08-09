import React from 'react'
import {AddItemForm} from 'components/AddItemForm/AddItemForm'
import {EditableSpan} from 'components/EditableSpan/EditableSpan'
import {Task} from './Task/Task'
import {TaskStatuses, TaskType} from 'common/api/todolists-api'
import {TodolistDomainType, todosThunks} from '../todolists-reducer'
import {IconButton} from '@mui/material'
import {Delete} from '@mui/icons-material'
import {useActions} from "common/hooks";
import {tasksThunks} from "features/TodolistsList/tasks-reducer";
import {FilterTasksButtons} from "features/TodolistsList/Todolist/filterTasksButtons/filter-tasks-buttons";

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

    let tasksForTodolist = props.tasks

    if (props.todolist.filter === 'active') {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.New)
    }
    if (props.todolist.filter === 'completed') {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.Completed)
    }

    return <div>
        <h3><EditableSpan value={props.todolist.title} onChange={changeTodolistTitleHandler}/>
            <IconButton onClick={removeTodolistHandler} disabled={props.todolist.entityStatus === 'loading'}>
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTaskCallBack} disabled={props.todolist.entityStatus === 'loading'}/>
        <div>
            {
                tasksForTodolist.map(t => <Task key={t.id} task={t} todolistId={props.todolist.id}/>)
            }
        </div>
        <div style={{paddingTop: '10px'}}>
            <FilterTasksButtons todolist={props.todolist}/>
        </div>
    </div>
})


