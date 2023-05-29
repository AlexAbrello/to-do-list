import {
  addTodoListAC,
  changeTodoListFilterAC,
  changeTodoListTitleAC,
  removeTodoListAC,
  todoListReducer
} from "./todoListReducer";
import {TodolistType} from "../App";

let startState: TodolistType[]

beforeEach(() => {

  startState = [
    {id: '1', title: "What to learn", filter: "all"},
    {id: '2', title: "What to buy", filter: "all"}
  ]

})

test('todolist should be added', () => {

  const action = addTodoListAC('3', 'something else')
  const endState = todoListReducer(startState, action)

  expect(endState.length).toBe(3)
  expect(endState[0].title).toBe('something else')
})

test('todolist should be removed', () => {

  const action = removeTodoListAC('1')
  const endState: TodolistType[] = todoListReducer(startState, action)

  expect(endState.length).toBe(1)
  expect(endState[0].title).toBe('What to buy')
})

test('todolist title should be changed', () => {

  const action = changeTodoListTitleAC('1', 'another title')
  const endState = todoListReducer(startState, action)

  expect(endState[0].title).toBe('another title')
})

test('todolist filter should be changed', () => {

  const action = changeTodoListFilterAC('active', '1')
  const endState = todoListReducer(startState, action)

  expect(endState[0].filter).toBe('active')
  expect(endState[1].filter).toBe('all')
})