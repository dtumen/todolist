type ButtonPropsType = {
  btnName: string
}

export const Button = ({btnName}: ButtonPropsType) => {
  return <button>{btnName}</button>
};

