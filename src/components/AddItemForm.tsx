import React, {ChangeEvent, FC, KeyboardEvent, useState} from 'react';

type AddItemType = {
  addItem: (itemTitle: string) => void
}

export const AddItemForm: FC<AddItemType> = ({addItem}) => {

  let [title, setTitle] = useState("")
  let [error, setError] = useState<string | null>(null)

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (e.charCode === 13) {
      addTask();
    }
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

  return (
      <div>
        <input value={title}
               onChange={onChangeHandler}
               onKeyPress={onKeyPressHandler}
               className={error ? "error" : ""}
        />
        <button onClick={addTask}>+</button>
        {error && <div className="error-message">{error}</div>}
      </div>
  );
};

