import React, {ChangeEvent, FC, useState} from 'react';
import {Simulate} from "react-dom/test-utils";
import change = Simulate.change;

type EditableSpanType = {
  title: string
}

export const EditableSpan: FC<EditableSpanType> = ({title}) => {

  const [editMode, setEditMode] = useState<boolean>(false)

  const changeEditMode = () => {
    setEditMode(!editMode)
  }

  return (
      <>
        {
          editMode
              ? <input value={title} onBlur={changeEditMode} autoFocus/>
              : <span onDoubleClick={changeEditMode}>{title}</span>
        }
      </>
  );
};

