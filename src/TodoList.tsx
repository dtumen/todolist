import React from 'react';
import { Button } from './Button';
import { TodoListHeader } from './TodoListHeader';
import { FilterValuesType } from './App';

type TodoListPropsType = {
  title: string
  tasks: Array<TaskType>
  date?: string
  removeTask: (id: number) => void
  changeFilter: (value: FilterValuesType) => void
}

export type TaskType = {
  id: number
  title: string
  isDone: boolean
}

export const TodoList = ({ title, tasks, date, removeTask, changeFilter }: TodoListPropsType) => {
  const taskList: JSX.Element = tasks.length === 0
    ? <span>Список пуст</span>
    : <ul>
      {
        tasks.map((t: TaskType) => {
          return (
            <li key={t.id}>
              <input type="checkbox" checked={t.isDone} />
              <span>{t.title}</span>
              <button onClick={ () => { removeTask(t.id) } }>X</button>
            </li>
          )
        })
      }
    </ul>



  return (
    <div className='todoList'>
      <TodoListHeader title={title} />
      <div>
        <input />
        <button>+</button>
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

