import React, {ChangeEvent, useState} from 'react';
import {TextField} from '@mui/material';

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
        ? <TextField label={'Change name'}
                     color="secondary"
                     value={title}
                     onChange={onChangeTitleHandler}
                     onBlur={activateViewMode} autoFocus/>
        : <span onDoubleClick={activateEditeMode}>{props.title}</span>
}

export default EditableSpan;