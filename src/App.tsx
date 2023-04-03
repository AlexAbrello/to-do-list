import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';

export type FilterKeyType = 'all' | 'active' | 'completed'

function App() {

    /*let tasks = [
        { id: 1, title: "HTML&CSS", isDone: true },
        { id: 2, title: "JS", isDone: true },
        { id: 3, title: "ReactJS", isDone: false }
    ]*/

    let [tasks, setTasks] = useState([
        { id: 1, title: "HTML&CSS", isDone: true },
        { id: 2, title: "JS", isDone: true },
        { id: 3, title: "ReactJS", isDone: false }
    ])

    let [filter, setFilter] = useState('all')

    let filteredTask = tasks

    if (filter === 'active') {
       filteredTask = tasks.filter(el => el.isDone)
    } if (filter === 'completed') {
        filteredTask = tasks.filter(el => !el.isDone)
    }

    const removeTask = (id: number) => {
        setTasks(tasks.filter(el => el.id !== id))
    }

    const filterTask = (filterKey: FilterKeyType) => {
        setFilter(filterKey)
    }

    return (
        <div className="App">
            <Todolist title="What to learn"
                      tasks={filteredTask}
                      removeTask={removeTask}
                      filterTask={filterTask}
            />
        </div>
    );
}

export default App;
