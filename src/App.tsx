import React, { useState } from 'react';
import './App.css';

import { TaskType, TodoList } from './TodoList';

export type FilterValuesType = 'all' | 'active' | 'completed';

function App() {

    const todoListTitle_1 = 'What to learn';


    // const todoListTitle_2 = 'What to buy'

    // let initProducts: TaskType[] = [
    //     {id: 4, title: 'Water', isDone: true},
    //     {id: 5, title: 'Milk', isDone: false},
    //     {id: 6, title: 'Bread', isDone: false},
    //     {id: 7, title: 'Bread', isDone: false},
    // ]

    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: 1, title: 'HTML & CSS', isDone: true},
        {id: 2, title: 'JS & TS', isDone: true},
        {id: 3, title: 'React', isDone: false},
        {id: 4, title: 'Redux', isDone: false},
    ]);

    const [filter, setFilter] = useState<FilterValuesType>('all');

    function removeTask(id: number) {
        let filteredTasks = tasks.filter(t => t.id !== id);
        setTasks(filteredTasks)
    }

    function changeFilter(value: FilterValuesType): void {
        setFilter(value);
    }

    let taskForTodoList = tasks;
    if (filter === 'completed') {
        taskForTodoList = tasks.filter(t => t.isDone === true)
    }
    if (filter === 'active') {
        taskForTodoList = tasks.filter(t => t.isDone === false)
    }

    return (
        <div className="App">
            <TodoList 
            title={'What to learn'} 
            tasks={taskForTodoList} 
            date={'26.02.2024'} 
            removeTask={removeTask}
            changeFilter={changeFilter}
            />
            {/* <TodoList title={todoListTitle_2} tasks={products} removeTask={removeTask}/> */}
        </div>
    );
}

export default App;
