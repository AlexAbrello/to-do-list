import React, {useEffect, useState} from 'react'
import {todolistAPI} from "../api/todoist-api";

export default {
  title: 'API'
}

export const GetTodolists = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    todolistAPI.getTodolists()
        .then((res) => {
          setState(res.data)
        })

  }, [])
  return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    const title = 'REDUX'
    todolistAPI.createTodolist(title)
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
    todolistAPI.deleteTodolist(todolistId)
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
    const title = 'REACT'
        todolistAPI.updateTodolist(todolistId, title)
        .then((res) => {
          setState(res.data)
        })
  }, [])

  return <div>{JSON.stringify(state)}</div>
}

