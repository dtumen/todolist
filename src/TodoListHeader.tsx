
type TodoListHeaderPropsTypes = {
  title: string
  todolistId: string
  removeTodoList: (todolistId: string) => void
}

export const TodoListHeader = ({ title, todolistId, removeTodoList }: TodoListHeaderPropsTypes) => {
  const divStyle: React.CSSProperties = {
    display: 'flex',
    gap: '10px',
    alignItems: 'center',
  }

  return (
    <div style={divStyle}>
      <h3>{title}</h3>
      <button onClick={() => removeTodoList(todolistId)}>X</button>
    </div>
  );
};

