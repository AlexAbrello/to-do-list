import React, {FC} from 'react';
import {EditableSpan} from "components/EditableSpan/EditableSpan";
import {IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {TodolistDomainType, todosThunks} from "features/TodolistsList/todolists-reducer";
import {useActions} from "common/hooks";

type Props = {
    todolist: TodolistDomainType
}

export const TodolistTitle: FC<Props> = ({todolist}) => {

    const {removeTodolist, changeTodolistTitle} = useActions(todosThunks)

    const removeTodolistHandler = () => {
        removeTodolist({todolistId: todolist.id})
    }
    const changeTodolistTitleHandler = (title: string) => {
        changeTodolistTitle({title: title, id: todolist.id})
    }
    
    return (
        <h3><EditableSpan value={todolist.title} onChange={changeTodolistTitleHandler}/>
            <IconButton onClick={removeTodolistHandler} disabled={todolist.entityStatus === 'loading'}>
                <Delete/>
            </IconButton>
        </h3>
    );
};

