import React, {useState} from 'react';
import './App.css';

import {TaskType, TodoList} from './TodoList';
import {v1} from 'uuid';
import AddItemForm from './AddItemForm';
import {AppBar, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';

// init

export type FilterValuesType = 'all' | 'active' | 'completed';

export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TasksStateType = {
    [key: string]: TaskType[];
}

function App() {

    function removeTask(id: string, todolistId: string) {
        let tasks = tasksObj[todolistId]
        let filteredTasks = tasks.filter(t => t.id !== id);
        tasksObj[todolistId] = filteredTasks;
        setTasks({...tasksObj})
    }

    function addTask(title: string, todolistId: string) {
        let task = {id: v1(), title: title, isDone: false};
        let tasks = tasksObj[todolistId];
        let newTasks = [task, ...tasks];
        tasksObj[todolistId] = newTasks;

        setTasks({...tasksObj});
    }

    function changeTaskStatus(taskId: string, isDone: boolean, todolistId: string) {
        let tasks = tasksObj[todolistId];
        let task = tasks.find(t => t.id === taskId);
        if (task) {
            task.isDone = isDone;
            setTasks({...tasksObj});
        }
    }

    function changeTaskTitle(taskId: string, newTitle: string, todolistId: string) {
        let tasks = tasksObj[todolistId];
        let task = tasks.find(t => t.id === taskId);
        if (task) {
            task.title = newTitle;
            setTasks({...tasksObj});
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
        {id: todolist1, title: 'What to learn', filter: 'all'},
        {id: todolist2, title: 'What to buy', filter: 'all'},
    ])

    let [tasksObj, setTasks] = useState<TasksStateType>({
        [todolist1]: [
            {id: v1(), title: 'HTML & CSS', isDone: true},
            {id: v1(), title: 'JS & TS', isDone: true},
            {id: v1(), title: 'React', isDone: false},
            {id: v1(), title: 'Redux', isDone: false},
        ],
        [todolist2]: [
            {id: v1(), title: 'milk', isDone: true},
            {id: v1(), title: 'bread', isDone: true},
        ]
    })

    const removeTodoList = (todolistId: string) => {
        setTodolist(prevTasks => prevTasks.filter(t => t.id !== todolistId))

        delete tasksObj[todolistId];
        setTasks({...tasksObj})

    }

    function changeTodoListTitle(id: string, newTitle: string) {
        let todolist = todolists.find(tl => tl.id === id);
        if (todolist) {
            todolist.title = newTitle;
            setTodolist([...todolists])
        }
    }

    function addTodoList(title: string) {
        let todolist: TodoListType = {
            id: v1(),
            filter: 'all',
            title: title
        }
        setTodolist([todolist, ...todolists])
        setTasks({
            ...tasksObj,
            [todolist.id]: []
        })
    }

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        TodoList
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{ padding: '20px' }} >
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map((tl) => {
                            let taskForTodoList = tasksObj[tl.id];

                            if (tl.filter === 'completed') {
                                taskForTodoList = taskForTodoList.filter(t => t.isDone)
                            }
                            if (tl.filter === 'active') {
                                taskForTodoList = taskForTodoList.filter(t => !t.isDone)
                            }

                            return <Grid item>
                                <Paper style={{ padding: '10px' }} >
                                    <TodoList
                                        changeTaskTitle={changeTaskTitle}
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
                                        changeTodoListTitle={changeTodoListTitle}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default App;
