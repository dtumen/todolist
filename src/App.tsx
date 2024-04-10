import React, { useState } from 'react';
import './App.css';

import { TaskType, TodoList } from './TodoList';
import { v1 } from 'uuid';

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

function App() {

    function removeTask(id: string, todolistId: string) {
        let tasks = tasksObj[todolistId]
        let filteredTasks = tasks.filter(t => t.id !== id);
        tasksObj[todolistId] = filteredTasks;
        setTasks({ ...tasksObj })
    }

    function addTask(title: string, todolistId: string) {
        let task = { id: v1(), title: title, isDone: false };
        let tasks = tasksObj[todolistId];
        let newTasks = [task, ...tasks];
        tasksObj[todolistId] = newTasks;

        setTasks({ ...tasksObj });
    }

    function changeTaskStatus(taskId: string, isDone: boolean, todolistId: string) {
        let tasks = tasksObj[todolistId];
        let task = tasks.find(t => t.id === taskId);
        if (task) {
            task.isDone = isDone;
            setTasks({ ...tasksObj });
        }
    }

    function changeFilter(value: FilterValuesType, todolistId: string): void {
        let todolist = todolists.find(tl => tl.id === todolistId);
        if (todolist) {
            todolist.filter = value;
            setTodolist([...todolists]);
        }
    }

    let todolist1 = v1(),
        todolist2 = v1();

    let [todolists, setTodolist] = useState<TodoListType[]>([
        { id: todolist1, title: 'What to learn', filter: 'active' },
        { id: todolist2, title: 'What to buy', filter: 'completed' },
    ])

    let [tasksObj, setTasks] = useState({
        [todolist1]: [
            { id: v1(), title: 'HTML & CSS', isDone: true },
            { id: v1(), title: 'JS & TS', isDone: true },
            { id: v1(), title: 'React', isDone: false },
            { id: v1(), title: 'Redux', isDone: false },
        ],
        [todolist2]: [
            { id: v1(), title: 'milk', isDone: true },
            { id: v1(), title: 'bread', isDone: true },
        ]
    })

    const removeTodoList = (todolistId: string) => {
        setTodolist(prevTasks => prevTasks.filter(t => t.id !== todolistId))

        delete tasksObj[todolistId];
        setTasks({...tasksObj})
    
    }

    return (
        <div className="App">
            {
                todolists.map((tl) => {
                    let taskForTodoList = tasksObj[tl.id];

                    if (tl.filter === 'completed') {
                        taskForTodoList = taskForTodoList.filter(t => t.isDone === true)
                    }
                    if (tl.filter === 'active') {
                        taskForTodoList = taskForTodoList.filter(t => t.isDone === false)
                    }

                    return <TodoList
                        todolistId={tl.id}
                        key={tl.id}
                        title={tl.title}
                        tasks={taskForTodoList}
                        date={'26.02.2024'}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeTaskStatus}
                        filter={tl.filter}
                        removeTodoList={removeTodoList}
                    />
                })
            }
        </div>
    );
}

export default App;
