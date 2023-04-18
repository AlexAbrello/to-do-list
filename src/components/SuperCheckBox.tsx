import React, {ChangeEvent} from 'react';


type SyperCheckBoxType = {
  isDone: boolean
  callBack: (newIsDone: boolean) => void
}
export const SuperCheckBox = (props: SyperCheckBoxType) => {

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    props.callBack(e.currentTarget.checked)
  }

  return (
      <input type="checkbox" checked={props.isDone} onChange={onChangeHandler}/>
  );
};

