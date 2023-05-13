import {
  addTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
  removeTasksListAC,
  tasksReducer
} from "./tasksReducer";

test('task should be added', () => {

  let startState = {
    todolistId1: [
      {id: '1', title: "HTML&CSS", isDone: true},
      {id: '2', title: "JS", isDone: true}
    ],
    todolistId2: [
      {id: '1', title: "Milk", isDone: true},
      {id: '2', title: "React Book", isDone: true}
    ]
  }

  const action = addTaskAC('todolistId2', 'Beer')
  const endState = tasksReducer(startState, action)

  expect(endState["todolistId2"].length).toBe(3)
  expect(endState["todolistId2"][0].title).toBe('Beer')
  expect(endState["todolistId1"].length).toBe(2)
})

test('task shoul be removed', () => {
  let startState = {
    todolistId1: [
      {id: '1', title: "HTML&CSS", isDone: true},
      {id: '2', title: "JS", isDone: true}
    ],
    todolistId2: [
      {id: '1', title: "Milk", isDone: true},
      {id: '2', title: "React Book", isDone: true}
    ]
  }

  const action = removeTaskAC('1', 'todolistId2')
  const endState = tasksReducer(startState, action)

  expect(endState['todolistId2'].length).toBe(1)
  expect(endState['todolistId2'][0].title).toBe("React Book")
  expect(endState['todolistId1'].length).toBe(2)

})

test('task title choul be changed', () => {

  let startState = {
    todolistId1: [
      {id: '1', title: "HTML&CSS", isDone: true},
      {id: '2', title: "JS", isDone: true}
    ],
    todolistId2: [
      {id: '1', title: "Milk", isDone: true},
      {id: '2', title: "React Book", isDone: true}
    ]
  }

  const action = changeTaskTitleAC('1', 'Beer', 'todolistId2')
  const endState = tasksReducer(startState, action)

  expect(endState['todolistId2'][0].title).toBe('Beer')
  expect(endState['todolistId1'][0].title).toBe('HTML&CSS')
})

test('task status shoul be changed', () => {

  let startState = {
    todolistId1: [
      {id: '1', title: "HTML&CSS", isDone: true},
      {id: '2', title: "JS", isDone: true}
    ],
    todolistId2: [
      {id: '1', title: "Milk", isDone: true},
      {id: '2', title: "React Book", isDone: true}
    ]
  }

  const action = changeTaskStatusAC('1', false, 'todolistId1')
  const endState = tasksReducer(startState, action)

  expect(endState['todolistId1'][0].isDone).toBe(false)
  expect(endState['todolistId2'][0].isDone).toBe(true)
})

test('taskList should be removed', () => {

  let startState = {
    todolistId1: [
      {id: '1', title: "HTML&CSS", isDone: true},
      {id: '2', title: "JS", isDone: true}
    ],
    todolistId2: [
      {id: '1', title: "Milk", isDone: true},
      {id: '2', title: "React Book", isDone: true}
    ]
  }

  const action = removeTasksListAC('todolistId2')
  const endState = tasksReducer(startState, action)

  expect(endState).toStrictEqual({
    todolistId1: [
      {id: '1', title: "HTML&CSS", isDone: true},
      {id: '2', title: "JS", isDone: true}
    ]
  })
})