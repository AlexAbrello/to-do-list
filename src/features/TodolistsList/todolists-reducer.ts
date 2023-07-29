import {todolistsAPI, TodolistType} from 'api/todolists-api'
import {appActions, RequestStatusType} from 'app/app-reducer'
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {createAppAsyncThunk} from "common/utils/create-app-async-thunk";
import {tasksThunks} from "features/TodolistsList/tasks-reducer";
import {handleServerAppError, handleServerNetworkError} from "common/utils";


export const slice = createSlice({
    name: 'todolists',
    initialState: [] as TodolistDomainType[],
    reducers: {
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
            .addCase(removeTodolist.fulfilled, (state, action) => {
                const index = state.findIndex(tl => tl.id === action.payload.todolistId)
                if (index !== -1) state.splice(index, 1)
            })
            .addCase(changeTodolistTitle.fulfilled, (state, action) => {
                const todolist = state.find(tl => tl.id === action.payload.id)
                if (todolist) {
                    todolist.title = action.payload.title
                }
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

const removeTodolist = createAppAsyncThunk<{todolistId: string}, {todolistId: string}>
('todolists/removeTodolist', async (arg, thunkAPI) => {

    const {dispatch, rejectWithValue} = thunkAPI

    try {
        dispatch(appActions.setAppStatus({status: 'loading'}))
        dispatch(todolistsActions.changeTodolistEntityStatus({id: arg.todolistId, entityStatus: 'loading'}))
        const res = await todolistsAPI.deleteTodolist(arg.todolistId)
        if (res.data.resultCode === 0) {
            dispatch(appActions.setAppStatus({status: 'succeeded'}))
            return arg
        } else {
            handleServerAppError(res.data, dispatch);
            return rejectWithValue(null)
        }
    } catch (error) {
        handleServerNetworkError(error, dispatch)
        return rejectWithValue(null)
    }
})

const changeTodolistTitle = createAppAsyncThunk<{id: string, title: string}, {id: string, title: string}>
('todolists/changeTodolistTitle', async (arg, thunkAPI) => {

    const {dispatch, rejectWithValue} = thunkAPI

    try {
        const res = await todolistsAPI.updateTodolist(arg.id, arg.title)
        if (res.data.resultCode === 0) {
            return arg
        } else {
            handleServerAppError(res.data, dispatch);
            return rejectWithValue(null)
        }
    } catch (error) {
        handleServerNetworkError(error, dispatch)
        return rejectWithValue(null)
    }

})

export const todolistsReducer = slice.reducer
export const todolistsActions = slice.actions
export const todosThunks = {fetchTodos, addTodos, removeTodolist, changeTodolistTitle}

// types
export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}
