import React, {ChangeEvent} from 'react';
import {Checkbox} from "@mui/material";

type SuperCheckBoxType = {
  isDone: boolean
  callBack: (isDone: boolean) => void
}

export const SuperCheckBox: React.FC<SuperCheckBoxType> = ({isDone, callBack}) => {

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
  callBack(e.currentTarget.checked)
  }
  return (
      <Checkbox
          checked={isDone}
          color="primary"
          onChange={onChangeHandler}
      />
  );
};