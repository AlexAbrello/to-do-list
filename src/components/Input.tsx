import React, {ChangeEvent, useState} from "react";

type InputPropsType = {
  title: string
  setTitle: (title: string) => void
}
export const Input = (props: InputPropsType) => {

  const [title, setTitle] = useState('')

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    props.setTitle(event.currentTarget.value)
  }

  return (
      <div>
        <input value={props.title} onChange={onChangeHandler}/>
      </div>
  );
};

