import { FilterValuesType } from './App';

type ButtonPropsType = {
  btnName: FilterValuesType
  changeFilter: (value: FilterValuesType) => void
}

export const Button = ({ btnName, changeFilter }: ButtonPropsType) => {

  return <button onClick={() => { changeFilter(btnName) } }>{btnName}</button>
};

