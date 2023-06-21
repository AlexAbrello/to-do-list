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