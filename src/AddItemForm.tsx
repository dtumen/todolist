import React, {useState, ChangeEvent, KeyboardEvent} from 'react';
import {IconButton, TextField} from '@mui/material';
import {ControlPointOutlined} from '@mui/icons-material';

type AddItemFormPropsItem = {
    addItem: (title: string) => void;
};

function AddItemForm(props: AddItemFormPropsItem) {

    const {addItem} = props;

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
        <TextField
            value={newTaskTitle}
            variant={'outlined'}
            label={'Type value:'}
            onChange={onChangeHandler}
            onKeyDown={onKeyPressHandler}
            error={!!error}
            helperText={error}
        />
            <IconButton color={'primary'} onClick={addItemHandler} >
                <ControlPointOutlined />
            </IconButton>
    </div>
}

export default AddItemForm;