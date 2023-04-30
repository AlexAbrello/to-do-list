import React, {ChangeEvent, FC, useState} from 'react';

type EditableSpanType = {
  title: string
  callBack: (title: string) => void
}

export const EditableSpan: FC<EditableSpanType> = ({title, callBack}) => {

  const [spanTitle, setSpanTitle] = useState<string>(title)
  const [editMode, setEditMode] = useState<boolean>(false)

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSpanTitle(e.currentTarget.value)
  }
  const activateViewMode = () => {
    callBack(spanTitle)
    setEditMode(false)
  }
  const activateEditMode = () => {
    setEditMode(true)
  }

  return (
      <>
        {
          editMode
              ? <input value={spanTitle}
                       onChange={onChangeHandler}
                       onBlur={activateViewMode}
                       autoFocus/>
              : <span onDoubleClick={activateEditMode}>{title}</span>
        }
      </>
  );
};

