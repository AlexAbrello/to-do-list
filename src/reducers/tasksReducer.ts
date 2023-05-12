import {TasksStateType} from "../App";
import {v1} from "uuid";
import {TaskType} from "../Todolist";


export const tasksReducer = (state: TasksStateType, action: TasksTsarType): TasksStateType => {
  switch (action.type) {
    case 'ADD-TASK': {
      let task: TaskType = {id: v1(), title: action.payload.todolistId, isDone: false}
      return {...state, [action.payload.title]: [task, ...state[action.payload.title]]}
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
    case "ADD-NEW-TASKLIST": {
      return {
        ...state,

      }
    }
    default:
      return state
  }
}

type TasksTsarType = AddTaskType | RemoveTaskType | ChangeTaskTitleType | ChangeTaskStatusType | AddNewTaskListType
type AddTaskType = ReturnType<typeof addTaskAC>
type RemoveTaskType = ReturnType<typeof removeTaskAC>
type ChangeTaskTitleType = ReturnType<typeof changeTaskTitleAC>
type ChangeTaskStatusType = ReturnType<typeof changeTaskStatusAC>
type AddNewTaskListType = ReturnType<typeof newTaskListAC>

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

export const newTaskListAC = () => {
  return {
    type: 'ADD-NEW-TASKLIST'
  } as const
}
