import {TodolistType} from "../App";
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
      debugger
      return state.map(el => el.id === action.payload.id ? {...el, title: action.payload.title} : el)
    }
    default: return state
  }
}

type TodoListTsarType = AddTodoListType | RemoveTodolistType | ChangeTodolistTitleType

type AddTodoListType = ReturnType<typeof addTodoListAC>
type RemoveTodolistType = ReturnType<typeof removeTodoListAC>
type ChangeTodolistTitleType = ReturnType<typeof changeTodoListTitleAC>

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