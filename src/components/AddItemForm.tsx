import React, {ChangeEvent, FC, KeyboardEvent, memo, useState} from 'react';
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField';

type AddItemType = {
  addItem: (title: string) => void
}

export const AddItemForm: FC<AddItemType> = memo(({addItem}) => {
  console.log('additemform')
  let [title, setTitle] = useState("")
  let [error, setError] = useState<string | null>(null)

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }

  const addTask = () => {
    let newTitle = title.trim();
    if (newTitle !== "") {
      addItem(title);
      setTitle("");
    } else {
      setError("Title is required");
    }
  }
  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (error !== null) setError(null);
    if (e.charCode === 13) {
      addTask();
    }
  }

  return (
      <div>
        <TextField id="outlined-basic"
                   label={error ? error : 'Type out smth...'}
                   variant="outlined"
                   size='small'
                   error={!!error}
                   value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
        />
        <Button variant="contained"
                style={{
                  maxWidth: '39px',
                  maxHeight: '39px',
                  minWidth: '39px',
                  minHeight: '39px',
                }}
                onClick={addTask}>+</Button>
      </div>
  );
});

