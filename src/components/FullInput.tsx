import React, {ChangeEvent, useState} from "react";

type FullInputType = {
  addTask: (value: string) => void
}
export const FullInput = (props: FullInputType) => {

  const [title, setTitle] = useState('')

  const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value)
  }

  const addTask = () => {
    props.addTask(title)
    setTitle('')
  }

  return (
      <div>
        <input value={title} onChange={onChangeInputHandler}/>
        <button onClick={addTask}>+</button>
      </div>
  )
}