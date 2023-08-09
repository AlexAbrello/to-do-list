import React, {useCallback, useEffect} from 'react'
import {useSelector} from 'react-redux'
import {todosThunks} from './todolists-reducer'
import {Grid, Paper} from '@mui/material'
import {AddItemForm} from 'components/AddItemForm/AddItemForm'
import {Todolist} from './Todolist/Todolist'
import {Navigate} from 'react-router-dom'
import {selectTasks, selectTodolist} from "features/TodolistsList/todolistsList.selectors";
import {selectIsLoggedIn} from "features/Login/login.selectors";
import {useActions} from "common/hooks";

type PropsType = {
    demo?: boolean
}

export const TodolistsList: React.FC<PropsType> = ({demo = false}) => {

    const todolists = useSelector(selectTodolist)
    const tasks = useSelector(selectTasks)
    const isLoggedIn = useSelector(selectIsLoggedIn)

    const {fetchTodos, addTodos} = useActions(todosThunks)

    useEffect(() => {
        if (demo || !isLoggedIn) {
            return;
        }
        fetchTodos()
    }, [])

    const addTodolistCallBack = useCallback((title: string) => {
        addTodos({title})
    }, [])

    if (!isLoggedIn) {
        return <Navigate to={"/login"}/>
    }

    return <>
        <Grid container style={{padding: '20px'}}>
            <AddItemForm addItem={addTodolistCallBack}/>
        </Grid>
        <Grid container spacing={3}>
            {
                todolists.map(tl => {
                    let allTodolistTasks = tasks[tl.id]

                    return <Grid item key={tl.id}>
                        <Paper style={{padding: '10px'}}>
                            <Todolist
                                todolist={tl}
                                tasks={allTodolistTasks}
                                demo={demo}
                            />
                        </Paper>
                    </Grid>
                })
            }
        </Grid>
    </>
}
