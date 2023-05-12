import {addTodoListAC, changeTodoListTitleAC, removeTodoListAC, TodoListReducer} from "./todoListReducer";

test('todolist should be added', () => {

  let startState =  [
    {id: '1', title: "What to learn", filter: "all"},
    {id: '2', title: "What to buy", filter: "all"}
  ]

  const action = addTodoListAC('something else')
  const endState = TodoListReducer(startState, action)

  expect(endState.length).toBe(3)
  expect(endState[0].title).toBe('something else')
})

test('todolist should be removed', () => {

  let startState =  [
    {id: '1', title: "What to learn", filter: "all"},
    {id: '2', title: "What to buy", filter: "all"}
  ]

  const action = removeTodoListAC('1')
  const endState = TodoListReducer(startState, action)

  expect(endState.length).toBe(1)
  expect(endState[0].title).toBe('What to buy')
})

test('todolist title should be changed', () => {

  let startState =  [
    {id: '1', title: "What to learn", filter: "all"},
    {id: '2', title: "What to buy", filter: "all"}
  ]

  const action = changeTodoListTitleAC('1', 'another title')
  const endState = TodoListReducer(startState, action)

  expect(endState[0].title).toBe('another title')
})