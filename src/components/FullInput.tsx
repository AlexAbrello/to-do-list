import React, {ChangeEvent, useState} from "react";

type FullInputType = {
  addTask: (value: string) => void
}
export const FullInput = (props: FullInputType) => {
  const [title, setTitle] = useState<string>('')

  const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value)
  }

  return (
      <div>
        <input onChange={onChangeInputHandler}/>
        <button onClick={() => {
          props.addTask(title)
          setTitle('')
        }}>+
        </button>
      </div>
  )
}