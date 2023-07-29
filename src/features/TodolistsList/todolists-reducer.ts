import {todolistsAPI, TodolistType} from 'api/todolists-api'
import {appActions, RequestStatusType} from 'app/app-reducer'
import {handleServerAppError, handleServerNetworkError} from 'utils/error-utils'
import {AppThunk} from 'app/store';
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {createAppAsyncThunk} from "utils/create-app-async-thunk";
import {tasksThunks} from "features/TodolistsList/tasks-reducer";


export const slice = createSlice({
    name: 'todolists',
    initialState: [] as TodolistDomainType[],
    reducers: {
        removeTodolist: (state, action: PayloadAction<{ id: string }>) => {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            if (index !== -1) state.splice(index, 1)
        },
        // addTodolist: (state, action: PayloadAction<{ todolist: TodolistType }>) => {
        //     const newTodolist: TodolistDomainType = {...action.payload.todolist, filter: 'all', entityStatus: 'idle'}
        //     state.unshift(newTodolist)
        // },
        changeTodolistTitle: (state, action: PayloadAction<{ id: string, title: string }>) => {
            const todolist = state.find(tl => tl.id === action.payload.id)
            if (todolist) {
                todolist.title = action.payload.title
            }
        },
        changeTodolistFilter: (state, action: PayloadAction<{ id: string, filter: FilterValuesType }>) => {
            const todolist = state.find(tl => tl.id === action.payload.id)
            if (todolist) {
                todolist.filter = action.payload.filter
            }
        },
        changeTodolistEntityStatus: (state, action: PayloadAction<{ id: string, entityStatus: RequestStatusType }>) => {
            const todolist = state.find(tl => tl.id === action.payload.id)
            if (todolist) {
                todolist.entityStatus = action.payload.entityStatus
            }
        },
        // setTodolists: (state, action: PayloadAction<{ todolists: TodolistType[] }>) => {
        //     return action.payload.todolists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
        // },
        clearTodolistsData: () => {
            return []
        }
    },
    extraReducers: builder => {
        builder
            .addCase(fetchTodos.fulfilled, (state, action) => {
                return action.payload.todolists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
            })
            .addCase(addTodos.fulfilled, (state, action) => {
                const newTodolist: TodolistDomainType = {...action.payload.todolist, filter: 'all', entityStatus: 'idle'}
                state.unshift(newTodolist)
            })
    }
})

const fetchTodos = createAppAsyncThunk<{ todolists: TodolistType[] }>
('todolists/fetchTodos', async (arg, thunkAPI) => {

    const {dispatch, rejectWithValue} = thunkAPI

    try {
        dispatch(appActions.setAppStatus({status: 'loading'}))
        const res = await todolistsAPI.getTodolists()
        const todolists = res.data
        todolists.forEach(tl => {
            dispatch(tasksThunks.fetchTasks(tl.id))
        })
        dispatch(appActions.setAppStatus({status: 'succeeded'}))
        return {todolists}
    } catch (error) {
        handleServerNetworkError(error, dispatch)
        return rejectWithValue(null)
    }
})

// export const addTodolistTC = (title: string): AppThunk => {
//     return (dispatch) => {
//         dispatch(appActions.setAppStatus({status: 'loading'}))
//         todolistsAPI.createTodolist(title)
//             .then((res) => {
//                 dispatch(todolistsActions.addTodolist({todolist: res.data.data.item}))
//                 dispatch(appActions.setAppStatus({status: 'succeeded'}))
//             })
//     }
// }

const addTodos = createAppAsyncThunk<{todolist: TodolistType}, {title: string}>
('todolists/addTodos', async (arg, thunkAPI) => {

    const {dispatch, rejectWithValue} = thunkAPI

    try {
        dispatch(appActions.setAppStatus({status: 'loading'}))
        const res = await todolistsAPI.createTodolist(arg.title)
        if (res.data.resultCode === 0) {
            const todolist = res.data.data.item
            dispatch(appActions.setAppStatus({status: 'succeeded'}))
            return {todolist}
        } else {
            handleServerAppError(res.data, dispatch);
            return rejectWithValue(null)
        }
    } catch (error) {
        handleServerNetworkError(error, dispatch)
        return rejectWithValue(null)
    }
})
export const removeTodolistTC = (todolistId: string): AppThunk => {
    return (dispatch) => {
        //изменим глобальный статус приложения, чтобы вверху полоса побежала
        dispatch(appActions.setAppStatus({status: 'loading'}))
        //изменим статус конкретного тудулиста, чтобы он мог задизеблить что надо
        dispatch(todolistsActions.changeTodolistEntityStatus({id: todolistId, entityStatus: 'loading'}))
        todolistsAPI.deleteTodolist(todolistId)
            .then((res) => {
                dispatch(todolistsActions.removeTodolist({id: todolistId}))
                //скажем глобально приложению, что асинхронная операция завершена
                dispatch(appActions.setAppStatus({status: 'succeeded'}))
            })
    }
}

const removeTodolist = createAppAsyncThunk<any, any>

export const todolistsReducer = slice.reducer
export const todolistsActions = slice.actions
export const todosThunks = {fetchTodos, addTodos}


// thunks
// export const fetchTodolistsTC = (): AppThunk => {
//     return (dispatch) => {
//         dispatch(appActions.setAppStatus({status: 'loading'}))
//         todolistsAPI.getTodolists()
//             .then((res) => {
//                 dispatch(todolistsActions.setTodolists({todolists: res.data}))
//                 dispatch(appActions.setAppStatus({status: 'succeeded'}))
//                 return res.data
//             })
//             .then((todo) => {
//                 todo.forEach(tl => {
//                     dispatch(tasksThunks.fetchTasks(tl.id))
//                 })
//             })
//             .catch(error => {
//                 handleServerNetworkError(error, dispatch);
//             })
//     }
// }


export const changeTodolistTitleTC = (id: string, title: string): AppThunk => {
    return (dispatch) => {
        todolistsAPI.updateTodolist(id, title)
            .then(() => {
                dispatch(todolistsActions.changeTodolistTitle({id, title}))
            })
    }
}

// types
export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}
