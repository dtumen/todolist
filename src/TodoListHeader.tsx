
type TodoListHeaderPropsTypes = {
  title: string
}

export const TodoListHeader = ({ title }: TodoListHeaderPropsTypes) => {
  return (
      <h3>{title}</h3>
  );
};

