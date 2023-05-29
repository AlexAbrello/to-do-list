import {TasksStateType} from "../App";
import {v1} from "uuid";
import {AddTodoListType, RemoveTodolistType} from './todoListReducer';

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: TasksTsarType): TasksStateType => {
  switch (action.type) {
    case 'ADD-TASK': {
      let task = {id: v1(), title: action.payload.title, isDone: false}
      return {...state, [action.payload.todolistId]: [task, ...state[action.payload.todolistId]]}
    }
    case 'REMOVE-TASK': {
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId].filter(el => el.id !== action.payload.id)
      }
    }
    case "CHANGE-TITLE": {
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId].map(el => el.id === action.payload.id
            ? {...el, title: action.payload.title}
            : el)
      }
    }
    case "CHANGE-STATUS": {
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId].map(el => el.id === action.payload.id
            ? {...el, isDone: action.payload.isDone}
            : el)
      }
    }
    case "ADD-TODOLIST": {
      return {
        ...state,
        [action.payload.id]: []
      }
    }
    case "REMOVE-TODOLIST": {
      let copyState = {...state}
      delete copyState[action.payload.id]
      return copyState
    }
    default:
      return state
  }
}

type TasksTsarType =
    AddTaskType
    | RemoveTaskType
    | ChangeTaskTitleType
    | ChangeTaskStatusType
    | RemoveTodolistType
    | AddTodoListType

type AddTaskType = ReturnType<typeof addTaskAC>
type RemoveTaskType = ReturnType<typeof removeTaskAC>
type ChangeTaskTitleType = ReturnType<typeof changeTaskTitleAC>
type ChangeTaskStatusType = ReturnType<typeof changeTaskStatusAC>


export const addTaskAC = (todolistId: string, title: string) => {
  return {
    type: 'ADD-TASK',
    payload: {
      todolistId,
      title
    }
  } as const
}

export const removeTaskAC = (id: string, todolistId: string) => {
  return {
    type: 'REMOVE-TASK',
    payload: {
      id,
      todolistId
    }
  } as const
}

export const changeTaskTitleAC = (id: string, title: string, todolistId: string) => {
  return {
    type: 'CHANGE-TITLE',
    payload: {
      id,
      title,
      todolistId
    }
  } as const
}
export const changeTaskStatusAC = (id: string, isDone: boolean, todolistId: string) => {
  return {
    type: 'CHANGE-STATUS',
    payload: {
      id,
      isDone,
      todolistId
    }
  } as const
}




