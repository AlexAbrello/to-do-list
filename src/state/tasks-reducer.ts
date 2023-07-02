import {TasksStateType} from '../App';
import {AddTodolistActionType, RemoveTodolistActionType, SetTodoListType} from './todolists-reducer';
import {TaskStatuses, TaskType, todolistsAPI, UpdateTaskModelType} from '../api/todolists-api'
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";
import {setAppStatus} from "../app/app-reducer";

export type RemoveTaskActionType = {
  type: 'REMOVE-TASK',
  todolistId: string
  taskId: string
}

export type AddTaskActionType = {
  type: 'ADD-TASK',
  task: TaskType
}

export type ChangeTaskStatusActionType = {
  type: 'CHANGE-TASK-STATUS',
  todolistId: string
  taskId: string
  status: TaskStatuses
}

export type ChangeTaskTitleActionType = {
  type: 'CHANGE-TASK-TITLE',
  todolistId: string
  taskId: string
  title: string
}

type ActionsType = RemoveTaskActionType | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodoListType
    | ReturnType<typeof setTasksAC>

const initialState: TasksStateType = {
  /*"todolistId1": [
      { id: "1", title: "CSS", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
          startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
      { id: "2", title: "JS", status: TaskStatuses.Completed, todoListId: "todolistId1", description: '',
          startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
      { id: "3", title: "React", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
          startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low }
  ],
  "todolistId2": [
      { id: "1", title: "bread", status: TaskStatuses.New, todoListId: "todolistId2", description: '',
          startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
      { id: "2", title: "milk", status: TaskStatuses.Completed, todoListId: "todolistId2", description: '',
          startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
      { id: "3", title: "tea", status: TaskStatuses.New, todoListId: "todolistId2", description: '',
          startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low }
  ]*/

}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
  switch (action.type) {
    case 'REMOVE-TASK': {
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)
      }
    }
    case 'ADD-TASK': {
      return {
        ...state,
        [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]
      }
    }
    case 'CHANGE-TASK-STATUS': {
      let todolistTasks = state[action.todolistId];
      let newTasksArray = todolistTasks
          .map(t => t.id === action.taskId ? {...t, status: action.status} : t);

      state[action.todolistId] = newTasksArray;
      return ({...state});
    }
    case 'CHANGE-TASK-TITLE': {
      let todolistTasks = state[action.todolistId];
      // найдём нужную таску:
      let newTasksArray = todolistTasks
          .map(t => t.id === action.taskId ? {...t, title: action.title} : t);

      state[action.todolistId] = newTasksArray;
      return ({...state});
    }
    case 'ADD-TODOLIST': {
      return {
        ...state,
        [action.todolistId]: []
      }
    }
    case 'REMOVE-TODOLIST': {
      const copyState = {...state};
      delete copyState[action.id];
      return copyState;
    }
    case "SET-TODOLIST": {
      const copyState = {...state}
      action.todos.forEach((tl) => {
        copyState[tl.id] = []
      })
      return copyState
    }
    case "SET-TASKS": {
      return {
        ...state,
        [action.todoId]: action.tasks
      }
    }
    default:
      return state;
  }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
  return {type: 'REMOVE-TASK', taskId: taskId, todolistId: todolistId}
}
export const addTaskAC = (task: TaskType): AddTaskActionType => {
  return {type: 'ADD-TASK', task}
}
export const changeTaskStatusAC = (taskId: string, status: TaskStatuses, todolistId: string): ChangeTaskStatusActionType => {
  return {type: 'CHANGE-TASK-STATUS', status, todolistId, taskId}
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTaskTitleActionType => {
  return {type: 'CHANGE-TASK-TITLE', title, todolistId, taskId}
}
export const setTasksAC = (todoId: string, tasks: TaskType[]) => ({
  type: 'SET-TASKS',
  todoId,
  tasks
} as const)
export const setTasksTC = (todoId: string) => (dispatch: Dispatch) => {
  dispatch(setAppStatus('loading'))
  todolistsAPI.getTasks(todoId)
      .then((res) => {
        dispatch(setTasksAC(todoId, res.data.items))
        dispatch(setAppStatus('succeeded'))
      })
}
export const deleteTaskTC = (taskId: string, todoId: string) => (dispatch: any) => {
  dispatch(setAppStatus('loading'))
  todolistsAPI.deleteTask(taskId, todoId)
      .then(() => {
        dispatch(removeTaskAC(taskId, todoId))
        dispatch(setAppStatus('succeeded'))
      })
}
export const addTaskTC = (taskId: string, title: string) => (dispatch: Dispatch) => {
  dispatch(setAppStatus('loading'))
  todolistsAPI.createTask(taskId, title)
      .then((res) => {
        dispatch(addTaskAC(res.data.data.item))
        dispatch(setAppStatus('succeeded'))
      })
}
export const updateTaskTC = (todoId: string, taskId: string, status: TaskStatuses) => (dispatch: Dispatch, getState: () => AppRootStateType) => {
  const task = getState().tasks[todoId].find(t => t.id === taskId)
  if (task) {
    const model: UpdateTaskModelType = {
      title: task.title,
      deadline: task.deadline,
      description: task.description,
      priority: task.priority,
      startDate: task.startDate,
      status
    }
    dispatch(setAppStatus('loading'))
    todolistsAPI.updateTask(todoId, taskId, model)
        .then(res => {
          dispatch(changeTaskStatusAC(taskId, status, todoId))
          dispatch(setAppStatus('succeeded'))
        })
  }
}