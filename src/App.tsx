import React, { useState } from 'react';
import './App.css';

import { TaskType, TodoList } from './TodoList';
import { v1 } from 'uuid';

export type FilterValuesType = 'all' | 'active' | 'completed';

function App() {

    const [tasks, setTasks] = useState<TaskType[]> ([
        { id: v1(), title: 'HTML & CSS', isDone: true },
        { id: v1(), title: 'JS & TS', isDone: true },
        { id: v1(), title: 'React', isDone: false },
        { id: v1(), title: 'Redux', isDone: false },
    ]);

    const [filter, setFilter] = useState<FilterValuesType>('all');

    function removeTask(id: string) {
        let filteredTasks = tasks.filter(t => t.id !== id);
        setTasks(filteredTasks)
    }

    function addTask(title: string) {
        let newTask = { id: v1(), title: title, isDone: false };
        setTasks([...tasks, newTask]);
    }

    function changeTaskStatus(taskId: string, isDone: boolean) {
        let task = tasks.find(t => t.id === taskId);
        if (task) {
            task.isDone = isDone;
        }
        setTasks([...tasks]); 
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
                addTask={addTask}
                changeTaskStatus={changeTaskStatus}
            />
        </div>
    );
}

export default App;
