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
      <div>
        <button onClick={onClickHandler}>{name}</button>
      </div>
  );
};

export default Button;