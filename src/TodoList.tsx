import React, { ChangeEvent } from 'react';
import { CustomButton } from './CustomButton';
import { FilterValuesType } from './App';
import AddItemForm from './AddItemForm';
import EditableSpan from './EditableSpan';
import {Checkbox, IconButton} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

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
    : <div>
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
            <div key={t.id} className={t.isDone ? 'is-done' : ''}>
              <Checkbox
                checked={t.isDone}
                onChange={onChangeStatusHandler} />
              <EditableSpan title={t.title} onChange={onChangeTitleHandler} />
              <IconButton onClick={() => { removeTask(t.id, todolistId) }}>
                <DeleteIcon />
              </IconButton>
            </div>
          )
        })
      }
    </div>

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
        <IconButton onClick={removeTodoList}>
          <DeleteIcon />
        </IconButton>
      </h3>
      <AddItemForm addItem={addTask} />
      {taskList && taskList}
      <div>
        <CustomButton colorText={'primary'} btnColor={filter === 'all' ? 'contained' : 'text'} btnName={'all'} changeFilter={changeFilter} todolistId={props.todolistId} />
        <CustomButton colorText={'success'} btnColor={filter === 'active' ? 'contained' : 'text'} btnName={'active'} changeFilter={changeFilter} todolistId={props.todolistId} />
        <CustomButton colorText={'secondary'} btnColor={filter === 'completed' ? 'contained' : 'text'} btnName={'completed'} changeFilter={changeFilter} todolistId={props.todolistId} />
      </div>
      <div style={{ paddingTop: '15px', textAlign: 'right' }}>{date}</div>
    </div>
  );
};

