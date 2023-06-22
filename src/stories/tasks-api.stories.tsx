import React, {useEffect, useState} from "react";
import {todolistAPI} from "../api/todolist-api";

export default {
  title: 'TASKS'
}

export const GetTasks = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    todolistAPI.getTasks('129bf9e4-b073-4825-9d15-04d55f529e43')
        .then((res) => {
          setState(res.data)
        })

  }, [])
  return <div>{JSON.stringify(state)}</div>
}
export const CreateTask = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    todolistAPI.createTask('129bf9e4-b073-4825-9d15-04d55f529e43', 'NEW TASK')
        .then((res) => {
          setState(res.data)
        })

  }, [])
  return <div>{JSON.stringify(state)}</div>
}
export const UpdateTask = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    todolistAPI.updateTask('129bf9e4-b073-4825-9d15-04d55f529e43', '14c97eba-db24-4a7e-80cb-f2db964207d9', 'NEW TASK UPDATE')
        .then((res) => {
          setState(res.data)
        })

  }, [])
  return <div>{JSON.stringify(state)}</div>
}
export const DeleteTask = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    todolistAPI.deleteTask('129bf9e4-b073-4825-9d15-04d55f529e43', '14c97eba-db24-4a7e-80cb-f2db964207d9')
        .then((res) => {
          setState(res.data)
        })

  }, [])
  return <div>{JSON.stringify(state)}</div>
}