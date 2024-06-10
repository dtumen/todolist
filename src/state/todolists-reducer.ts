import {FilterValuesType, TodoListType} from '../App';
import {v1} from 'uuid';

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST',
    id: string
}

export type AddTodolistActionType = {
    type: 'ADD-TODOLIST',
    title: string
}

export type ChangeTodolistActionType = {
    type: 'CHANGE-TODOLIST-TITLE',
    id: string
    title: string
}

export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER',
    id: string
    filter: FilterValuesType
}

type ActionsType = RemoveTodolistActionType | AddTodolistActionType | ChangeTodolistActionType | ChangeTodolistFilterActionType
export const todolistsReducer = (state: TodoListType[], action: ActionsType): TodoListType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter((t: TodoListType) => t.id !== action.id);
        case 'ADD-TODOLIST':
            return [...state, {
                id: v1(),
                title: action.title,
                filter: 'all',
            }]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map((t: TodoListType) => t.id === action.id ? {...t, title: action.title} : t);
        case 'CHANGE-TODOLIST-FILTER':
            return state.map((t: TodoListType) => t.id === action.id ? {...t, filter: action.filter} : t);
        default:
            throw new Error("I don't understand what this action");
    }
}

