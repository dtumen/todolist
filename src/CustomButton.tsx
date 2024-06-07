import {FilterValuesType} from './App';
import Button from '@mui/material/Button';

type CustomButtonPropsType = {
    btnName: FilterValuesType
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    btnColor: 'contained' | 'text'
    colorText: 'primary' | 'secondary' | 'success'
    todolistId: string
}

export const CustomButton = (props: CustomButtonPropsType) => {
    const {btnName, changeFilter, btnColor, todolistId, colorText} = props;

    return <Button
        variant={btnColor}
        color={colorText}
        onClick={() => {
            changeFilter(btnName, todolistId)
        }}
    >
        {btnName}
    </Button>
};

