import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

export const TodoListReducer = (state: TodolistType[], action: TodoListTsarType): TodolistType[] => {
  switch (action.type) {
    case 'ADD-TODOLIST': {
      let todolistId = v1()
      let newTodoList: TodolistType = {id: todolistId, title: action.payload.title, filter: 'all'}
      return [newTodoList, ...state]
    }
    case "REMOVE-TODOLIST": {
      return state.filter(el => el.id !== action.payload.id)
    }
    case "CHANGE-TODOLIST-TITLE": {
      return state.map(el => el.id === action.payload.id ? {...el, title: action.payload.title} : el)
    }
    case "CHANGE-FILTER": {
      return state.filter(el => el.filter !== action.payload.value )
    }
    default: return state
  }
}

type TodoListTsarType = AddTodoListType | RemoveTodolistType | ChangeTodolistTitleType | ChangeFilterType

type AddTodoListType = ReturnType<typeof addTodoListAC>
type RemoveTodolistType = ReturnType<typeof removeTodoListAC>
type ChangeTodolistTitleType = ReturnType<typeof changeTodoListTitleAC>
type ChangeFilterType = ReturnType<typeof changeFilterAC>

export const addTodoListAC = (title: string) => {
  return {
    type: 'ADD-TODOLIST',
    payload: {
      title
    }
  } as const
}

export const removeTodoListAC = (id: string) => {
  return {
    type: 'REMOVE-TODOLIST',
    payload: {
      id
    }
  } as const
}

export const changeTodoListTitleAC = (id: string, title: string) => {
  return {
    type: 'CHANGE-TODOLIST-TITLE',
    payload: {
      id,
      title
    }
  } as const
}

export const changeFilterAC = (value: FilterValuesType) => {
  return {
    type: 'CHANGE-FILTER',
    payload: {
      value
    }
  } as const
}