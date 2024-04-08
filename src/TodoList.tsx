import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import { Button } from './Button';
import { TodoListHeader } from './TodoListHeader';
import { FilterValuesType } from './App';

type TodoListPropsType = {
  title: string
  tasks: TaskType[]
  date?: string
  removeTask: (id: string) => void
  changeFilter: (value: FilterValuesType) => void
  addTask: (title: string) => void
  changeTaskStatus: (taskId: string, isDone: boolean) => void
}

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

export const TodoList: React.FC<TodoListPropsType> = (props) => {
  const {
    title,
    tasks,
    date, 
    removeTask, 
    changeFilter, 
    addTask,
    changeTaskStatus, 
  } = props;

  const [newTaskTitle, setNewTaskTitle] = useState('');

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setNewTaskTitle(e.currentTarget.value);

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addTask(newTaskTitle);
      setNewTaskTitle('');
    }
  }

  const addTaskHandler = () => {
    addTask(newTaskTitle);
    setNewTaskTitle('');
  }

  const taskList: JSX.Element = tasks.length === 0
    ? <span>Список пуст</span>
    : <ul>
      {
        tasks.map((t: TaskType) => {

          const changeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
            let isDone = e.currentTarget.checked
            changeTaskStatus(t.id, isDone)
          }

          return (
            <li key={t.id}>
              <input type="checkbox" checked={t.isDone} onChange={changeStatusHandler} />
              <span>{t.title}</span>
              <button onClick={() => { removeTask(t.id) }}>X</button>
            </li>
          )
        })
      }
    </ul>

  return (
    <div className='todoList'>
      <TodoListHeader title={title} />
      <div>
        <input
          value={newTaskTitle}
          onChange={onChangeHandler}
          onKeyDown={onKeyPressHandler}
        />
        <button onClick={addTaskHandler}>+</button>
      </div>
      {taskList && taskList}
      <div>
        <Button btnName={'all'} changeFilter={changeFilter} />
        <Button btnName={'active'} changeFilter={changeFilter} />
        <Button btnName={'completed'} changeFilter={changeFilter} />
      </div>
      <div>{date}</div>
    </div>
  );
};

