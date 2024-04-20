import React, { ChangeEvent } from 'react';
import { Button } from './Button';
import { FilterValuesType } from './App';
import AddItemForm from './AddItemForm';
import EditableSpan from './EditableSpan';

type TodoListPropsType = {
  title: string
  tasks: TaskType[]
  date?: string
  removeTask: (id: string, todolistId: string) => void
  changeFilter: (value: FilterValuesType, todolistId: string) => void
  changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
  changeTaskTitle: (taskId: string, newValue: string, todolistId: string) => void
  addTask: (title: string, todolistId: string) => void
  filter: FilterValuesType
  todolistId: string
  removeTodoList: (todolistId: string) => void
  changeTodoListTitle: (todolistId: string, title: string) => void
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
    filter,
    todolistId,
  } = props;

  const taskList: JSX.Element = tasks.length === 0
    ? <span>Список пуст</span>
    : <ul>
      {
        tasks.map((t: TaskType) => {

          const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
            let isDone = e.currentTarget.checked
            props.changeTaskStatus(t.id, isDone, todolistId)
          }

          const onChangeTitleHandler = (newValue: string) => {
            props.changeTaskTitle(t.id, newValue, props.todolistId)
          }

          return (
            <li key={t.id} className={t.isDone ? 'is-done' : ''}>
              <input type="checkbox"
                checked={t.isDone}
                onChange={onChangeStatusHandler} />
              <EditableSpan title={t.title} onChange={onChangeTitleHandler} />
              <button onClick={() => { removeTask(t.id, todolistId) }}>X</button>
            </li>
          )
        })
      }
    </ul>

  const addTask = (title: string) => {
    props.addTask(title, props.todolistId)
  }


  const removeTodoList = () => {
    props.removeTodoList(todolistId)
  }


  const changeTodoListTitle = (newTitle: string) => {
    props.changeTodoListTitle(todolistId, newTitle)
  }

  return (
    <div className='todoList'>
      <h3>
        <EditableSpan title={title} onChange={changeTodoListTitle}  />
        <button onClick={removeTodoList}>X</button>
      </h3>
      <AddItemForm addItem={addTask} />
      {taskList && taskList}
      <div>
        <Button btnColor={filter === 'all' ? 'active-filter' : ''} btnName={'all'} changeFilter={changeFilter} todolistId={props.todolistId} />
        <Button btnColor={filter === 'active' ? 'active-filter' : ''} btnName={'active'} changeFilter={changeFilter} todolistId={props.todolistId} />
        <Button btnColor={filter === 'completed' ? 'active-filter' : ''} btnName={'completed'} changeFilter={changeFilter} todolistId={props.todolistId} />
      </div>
      <div>{date}</div>
    </div>
  );
};

