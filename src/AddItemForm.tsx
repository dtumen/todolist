import React, { useState, ChangeEvent, KeyboardEvent } from 'react';

type AddItemFormPropsItem = {
  addItem: (title: string) => void;
};

function AddItemForm(props: AddItemFormPropsItem) {

  const { addItem } = props;

  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [error, setError] = useState<string | null>(null);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setNewTaskTitle(e.currentTarget.value);

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (e.key === 'Enter') {
      addItem(newTaskTitle);
      setNewTaskTitle('');
    }
  }

  const addItemHandler = () => {
    if (newTaskTitle.trim() !== '') {
      addItem(newTaskTitle);
      setNewTaskTitle('');
    } else {
      setError('Field is required');
    }
  }

  return <div>
    <input
      value={newTaskTitle}
      onChange={onChangeHandler}
      onKeyDown={onKeyPressHandler}
      className={error ? 'error' : ''}
    />
    <button onClick={addItemHandler}>+</button>
    {error && <div className='error-message'>{error}</div>}
  </div>
}

export default AddItemForm;