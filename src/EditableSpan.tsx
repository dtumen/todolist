import React, { ChangeEvent, useState } from 'react';

type EditableSpanPropsType = {
  title: string
  onChange: (newTitle: string) => void
}


function EditableSpan(props: EditableSpanPropsType) {
  let [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState('');

  const activateEditeMode = () => {
    setEditMode(true)
    setTitle(props.title);
  };
  
  const activateViewMode = () => {
    setEditMode(false);
    props.onChange(title);
  };

  const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }

  return editMode 
        ? <input value={title} onChange={onChangeTitleHandler} onBlur={activateViewMode} autoFocus />
        : <span onDoubleClick={activateEditeMode} >{props.title}</span>
}

export default EditableSpan;