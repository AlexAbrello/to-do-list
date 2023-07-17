import React from "react";

type InpytButtonType = {
  title: string
  sendTask: (title: string) => void
}
export const InputButton = (props: InpytButtonType) => {

  const add = () => {
    props.sendTask(props.title)
  }

  return (
      <div>
        <button onClick={add}>send</button>
      </div>
  );
};

