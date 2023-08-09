import React, {useCallback} from 'react'
import {AddItemForm} from 'components/AddItemForm/AddItemForm'
import {EditableSpan} from 'components/EditableSpan/EditableSpan'
import {Task} from './Task/Task'
import {TaskStatuses, TaskType} from 'common/api/todolists-api'
import {FilterValuesType, TodolistDomainType, todolistsActions, todosThunks} from '../todolists-reducer'
import {Button, IconButton} from '@mui/material'
import {Delete} from '@mui/icons-material'
import {useActions} from "common/hooks";
import {tasksThunks} from "features/TodolistsList/tasks-reducer";

type PropsType = {
    todolist: TodolistDomainType
    tasks: Array<TaskType>
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    demo?: boolean
}

export const Todolist = React.memo(function ({demo = false, ...props}: PropsType) {

    const {addTask} = useActions(tasksThunks)
    const {removeTodolist, changeTodolistTitle} = useActions(todosThunks)
    const {changeTodolistFilter} = useActions(todolistsActions)

    const addTaskCallBack = (title: string) => {
        addTask({title: title, todolistId: props.todolist.id})
    }

    const removeTodolistHandler = () => {
       removeTodolist({todolistId: props.todolist.id})
    }
    const changeTodolistTitleHandler = (title: string) => {
        changeTodolistTitle({title: title, id: props.todolist.id})
    }

    const onAllClickHandler = useCallback(() => changeTodolistFilter({filter: 'all', id: props.todolist.id}), [props.todolist.id, props.changeFilter])
    const onActiveClickHandler = useCallback(() => changeTodolistFilter({filter: 'active', id: props.todolist.id}), [props.todolist.id, props.changeFilter])
    const onCompletedClickHandler = useCallback(() => changeTodolistFilter({filter: 'completed', id: props.todolist.id}), [props.todolist.id, props.changeFilter])


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
            <Button variant={props.todolist.filter === 'all' ? 'outlined' : 'text'}
                    onClick={onAllClickHandler}
                    color={'inherit'}
            >All
            </Button>
            <Button variant={props.todolist.filter === 'active' ? 'outlined' : 'text'}
                    onClick={onActiveClickHandler}
                    color={'primary'}>Active
            </Button>
            <Button variant={props.todolist.filter === 'completed' ? 'outlined' : 'text'}
                    onClick={onCompletedClickHandler}
                    color={'secondary'}>Completed
            </Button>
        </div>
    </div>
})


