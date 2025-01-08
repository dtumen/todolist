import axios from 'axios';
import {
    CreateTaskResponse,
    DeleteTaskResponse,
    UpdateTaskModel,
    UpdateTaskResponse
} from './tasksApi.types';
import {instance} from '../../../common/instance/instance';

export const tasksApi = {
    createTask(payload: {title: string, todolistId: string}) {
        const {title, todolistId} = payload;
        return instance.post<CreateTaskResponse>(`todo-lists/${todolistId}/tasks`, {title})
    },
    removeTask(payload: {taskId: string, todolistId: string}) {
        const { taskId, todolistId } = payload;
        return instance.delete<DeleteTaskResponse>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTaskStatus(payload: {todolistId: string, taskId: string, model: UpdateTaskModel}) {
        const { todolistId, taskId, model } = payload;
        return instance.put<UpdateTaskResponse>(`todo-lists/${todolistId}/tasks/${taskId}`, model )
    },
    updateTaskTitle(payload: { todoListId: string, taskId: string, model: UpdateTaskModel }) {
        const { todoListId, taskId, model } = payload;
        return instance.put<UpdateTaskResponse>(`todo-lists/${todoListId}/tasks/${taskId}`, model)
    },
}