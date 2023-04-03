import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';

export type FilterKeyType = 'all' | 'active' | 'completed'

function App() {

    let [tasks, setTasks] = useState<TaskType[]>([
        { id: 1, title: "HTML&CSS", isDone: true },
        { id: 2, title: "JS", isDone: true },
        { id: 3, title: "ReactJS", isDone: false }
    ])

    /*let [filter, setFilter] = useState<string>('all')

    let filteredTask: TaskType[] = tasks

    if (filter === 'active') {
       filteredTask = tasks.filter(el => !el.isDone)
    } if (filter === 'completed') {
        filteredTask = tasks.filter(el => el.isDone)

    }
    const filterTask = (filterKey: FilterKeyType) => {
        setFilter(filterKey)
    }*/

    const removeTask = (id: number) => {
        setTasks(tasks.filter(el => el.id !== id))
    }

    return (
        <div className="App">
            <Todolist title="What to learn"
                      tasks={tasks}
                      removeTask={removeTask}
            />
        </div>
    );
}

export default App;
