import {FilterValuesType, TodolistType} from "../App";

export const todoListReducer = (state: TodolistType[], action: TodoListTsarType): TodolistType[] => {
  switch (action.type) {
    case 'ADD-TODOLIST': {
      let newTodoList: TodolistType = {id: action.payload.id, title: action.payload.title, filter: 'all'}
      return [newTodoList, ...state]
    }
    case "REMOVE-TODOLIST": {
      return state.filter(el => el.id !== action.payload.id)
    }
    case "CHANGE-TODOLIST-TITLE": {
      return state.map(el => el.id === action.payload.id ? {...el, title: action.payload.title} : el)
    }
    case "CHANGE-FILTER": {
      return state.map(el => el.id === action.payload.id ? {...el, filter: action.payload.value} : el)
    }
    default: return state
  }
}

type TodoListTsarType = AddTodoListType | RemoveTodolistType | ChangeTodolistTitleType | ChangeFilterType

export type AddTodoListType = ReturnType<typeof addTodoListAC>
type RemoveTodolistType = ReturnType<typeof removeTodoListAC>
type ChangeTodolistTitleType = ReturnType<typeof changeTodoListTitleAC>
type ChangeFilterType = ReturnType<typeof changeTodoListFilterAC>

export const addTodoListAC = (id: string, title: string) => {
  return {
    type: 'ADD-TODOLIST',
    payload: {
      id,
      title,
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

export const changeTodoListFilterAC = (value: FilterValuesType, id: string) => {
  return {
    type: 'CHANGE-FILTER',
    payload: {
      value,
      id
    }
  } as const
}