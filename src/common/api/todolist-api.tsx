import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.1/',
  withCredentials: true
})

export const todolistAPI = {
  getTodolists() {
    return instance.get<TodoListType[]>(`todo-lists`)
  },
  createTodolist(title: string) {
    return instance.post<ResponseType<{item: TodoListType}>>('todo-lists', {title})
  },
  deleteTodolist(todolistId: string) {
    return instance.delete<ResponseType>(`todo-lists/${todolistId}`)
  },
  updateTodolist(todolistId: string, title: string) {
    return instance.put<ResponseType>(`todo-lists/${todolistId}`, {title})
  },
  getTasks(todolistId: string) {
    return instance.get<TasksType>(`todo-lists/${todolistId}/tasks`)
  },
  createTask(todolistId: string, title: string) {
    return instance.post<TasksType>(`todo-lists/${todolistId}/tasks`, {title})
  },
  updateTask(todolistId: string, taskId: string, title: string) {
    return instance.put<TasksType>(`todo-lists/${todolistId}/tasks/${taskId}`, {title})
  },
  deleteTask(todolistId: string, taskId: string) {
    return instance.delete(`todo-lists/${todolistId}/tasks/${taskId}`)
  }
}

type TodoListType = {
  id: string
  title: string
  addedDate: Date
  order: number
}

type ResponseType<T = {}> = {
  resultCode: number
  messages: string[]
  data: T
}

type TasksType = {
  description: string
  title: string
  completed: boolean
  status: number
  priority: number
  startDate: Date
  deadline: Date
  id: string
  todoListId: string
  order: number
  addedDate: Date
}


