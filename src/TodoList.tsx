import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import { Button } from './Button';
import { TodoListHeader } from './TodoListHeader';
import { FilterValuesType } from './App';
import { error } from 'console';

type TodoListPropsType = {
  title: string
  tasks: TaskType[]
  date?: string
  removeTask: (id: string) => void
  changeFilter: (value: FilterValuesType) => void
  addTask: (title: string) => void
  changeTaskStatus: (taskId: string, isDone: boolean) => void
  filter: FilterValuesType
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
    filter,
  } = props;

  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [error, setError] = useState<string | null>(null);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setNewTaskTitle(e.currentTarget.value);

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (e.key === 'Enter') {
      addTask(newTaskTitle);
      setNewTaskTitle('');
    }
  }

  const addTaskHandler = () => {
    if (newTaskTitle.trim() !== '') {
      addTask(newTaskTitle);
      setNewTaskTitle('');
    } else {
      setError('Field is required');
    }
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
            <li key={t.id} className={t.isDone ? 'is-done' : ''}>
              <input type="checkbox" 
              checked={t.isDone} 
              onChange={changeStatusHandler}/>
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
          className={error ? 'error' : ''}
        />
        <button onClick={addTaskHandler}>+</button>
        {error && <div className='error-message'>{error}</div>}
      </div>
      {taskList && taskList}
      <div>
        <Button btnColor={filter === 'all'? 'active-filter' : ''} btnName={'all'} changeFilter={changeFilter} />
        <Button btnColor={filter === 'active'? 'active-filter' : ''} btnName={'active'} changeFilter={changeFilter} />
        <Button btnColor={filter === 'completed'? 'active-filter' : ''} btnName={'completed'} changeFilter={changeFilter} />
      </div>
      <div>{date}</div>
    </div>
  );
};

