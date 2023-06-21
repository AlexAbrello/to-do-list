import React, {useEffect, useState} from 'react'
import axios from 'axios'

export default {
  title: 'API'
}

export const GetTodolists = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists', {withCredentials: true})
        .then((res) => {
          setState(res.data)
        })

  }, [])
  return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    axios.post('https://social-network.samuraijs.com/api/1.1/todo-lists', {title: 'REDUX'}, {withCredentials: true})
        .then((res) => {
          setState(res.data)
        })
  }, [])

  return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    const todolistId = 'f6e789d2-5df8-4d14-89bd-621c43b02fc0'
    axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, {withCredentials: true})
        .then((res) => {
          setState(res.data)
        })
  }, [])

  return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    const todolistId = 'bee9319c-72da-4087-acf3-2c9bc19e70b7'
    axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, {title: 'React'}, {withCredentials: true})
        .then((res) => {
          setState(res.data)
        })
  }, [])

  return <div>{JSON.stringify(state)}</div>
}

