import { FilterValuesType } from './App';

type ButtonPropsType = {
  btnName: FilterValuesType
  changeFilter: (value: FilterValuesType) => void
  btnColor: 'active-filter' | ''
}

export const Button = (props: ButtonPropsType) => {
  const { btnName, changeFilter, btnColor } = props;

  return <button 
  className={btnColor}
  onClick={() => { changeFilter(btnName) }}
  >
    {btnName}
  </button>
};

