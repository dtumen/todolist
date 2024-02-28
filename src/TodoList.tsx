import React from 'react';
import { Button } from './Button';
import { TodoListHeader } from './TodoListHeader';

type TodoListPropsType = {
  title: string
  tasks: Array<TaskType>
  date?: string
}

export type TaskType = {
  id: number
  title: string
  isDone: boolean
}

export const TodoList = ({ title, tasks, date }: TodoListPropsType) => {
  const taskList: JSX.Element = tasks.length === 0
    ? <span>Список пуст</span>
    : <ul>
      {
        tasks.map((task: TaskType) => {
          return (
            <li key={task.id}>
              <input type="checkbox" checked={task.isDone} />
              <span>{task.title}</span>
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
        <Button btnName={'+'}/>
      </div>
        {taskList && taskList}
      <div>
        <Button btnName={'All'}/>
        <Button btnName={'Active'}/>
        <Button btnName={'Completed'}/>
      </div>
      <div>{date}</div>
    </div>
  );
};

