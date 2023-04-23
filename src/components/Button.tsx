import React from 'react';

type ButtonType = {
  name: string
  callBack: () => void
}

const Button = ({name, callBack}: ButtonType) => {

  const onClickHandler = () => {
    callBack()
  }

  return (
      <button onClick={onClickHandler}>{name}</button>
  );
};

export default Button;