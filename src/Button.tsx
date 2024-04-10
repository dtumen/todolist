import { FilterValuesType } from './App';

type ButtonPropsType = {
  btnName: FilterValuesType
  changeFilter: (value: FilterValuesType, todolistId: string) => void
  btnColor: 'active-filter' | ''
  todolistId: string
}

export const Button = (props: ButtonPropsType) => {
  const { btnName, changeFilter, btnColor, todolistId } = props;

  return <button 
  className={btnColor}
  onClick={() => { changeFilter(btnName, todolistId) }}
  >
    {btnName}
  </button>
};

