import {v1} from 'uuid';
import {FilterValuesType, TodoListType} from '../App';
import {
    AddTodolistAC, ChangeFilterTodolistAC,
    ChangeTodolistAC,
    RemoveTodolistAC,
    todolistsReducer
} from './todolists-reducer';

test('correct todolist should be removed', () => {
    let todolistID1 = v1();
    let todolistID2 = v1();

    const startState: TodoListType[] = [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ];

    const endState = todolistsReducer(startState, RemoveTodolistAC(todolistID1));

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistID2);
})

test('correct todolist should be added', () => {
    let todolistID1 = v1();
    let todolistID2 = v1();

    let newTodolistTitle = 'New Todolist';

    const startState: TodoListType[] = [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ];

    const endState = todolistsReducer(startState, AddTodolistAC(newTodolistTitle));

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodolistTitle);
})

test('correct todolist should change its name', () => {
    let todolistID1 = v1();
    let todolistID2 = v1();

    let newTodolistTitle = 'New Todolist';

    const startState: TodoListType[] = [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ];

    const endState = todolistsReducer(startState, ChangeTodolistAC(todolistID2, newTodolistTitle));

    expect(endState).not.toBe(startState);
    expect(endState[1].title).toBe(newTodolistTitle);
})

test('correct filter todolist should changed', () => {
    let todolistID1 = v1();
    let todolistID2 = v1();

    let newFilter: FilterValuesType = 'completed';

    const startState: TodoListType[] = [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ];

    const endState = todolistsReducer(startState, ChangeFilterTodolistAC(todolistID2, newFilter));

    expect(endState).not.toBe(startState);
    expect(endState[1].filter).toBe(newFilter);
})