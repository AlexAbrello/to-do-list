import {TodolistDomainType, todolistsActions, todolistsReducer, todosThunks} from './todolists-reducer'
import {tasksReducer, TasksStateType} from './tasks-reducer'
import {TodolistType} from 'common/api/todolists-api'

test('ids should be equals', () => {
    const startTasksState: TasksStateType = {};
    const startTodolistsState: Array<TodolistDomainType> = [];

    let todolist: TodolistType = {
        title: 'new todolist',
        id: 'any id',
        addedDate: '',
        order: 0
    }

    const action = todosThunks.addTodos.fulfilled({todolist}, 'requestId', {title: 'new todolist'})

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.payload.todolist.id);
    expect(idFromTodolists).toBe(action.payload.todolist.id);
});
