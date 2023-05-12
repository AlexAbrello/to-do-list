import {TasksStateType} from "../App";
import {v1} from "uuid";
import {TaskType} from "../Todolist";


export const tasksReducer = (state: TasksStateType, action: TsarType): TasksStateType => {
  switch (action.type) {
    case 'ADD-TASK': {
      let task: TaskType = {id: v1(), title: action.payload.title, isDone: false}
      return {...state, [action.payload.id]: [task, ...state[action.payload.id]]}
    }
    case 'REMOVE-TASK': {
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId].filter(el => el.id !== action.payload.id)
      }
    }
    case "CHANGE-TITLE": {
      return {
        ...state, [action.payload.todolistId]: state[action.payload.todolistId].map(el => el.id === action.payload.id
            ? {...el, title: action.payload.title}
            : el)
      }
    }
    default:
      return state
  }
}

type TsarType = AddTaskType | RemoveTaskType | ChangeTaskTitleType
type AddTaskType = ReturnType<typeof addTaskAC>
type RemoveTaskType = ReturnType<typeof removeTaskAC>
type ChangeTaskTitleType = ReturnType<typeof changeTaskTitleAC>

export const addTaskAC = (id: string, title: string) => {
  return {
    type: 'ADD-TASK',
    payload: {
      id,
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
    type: 'CHANGE-TITLE',
    payload: {
      id,
      title,
      todolistId
    }
  } as const
}
