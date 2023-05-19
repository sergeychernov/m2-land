import qs from 'qs';
import axios from 'axios';
import { Task } from '@/types/db.types';

type TaskCreateDto = Omit<Task, "id" | "status">

export class TaskService{
  async getTask(taskId:string) {
    return axios.get<Task>(`/api/task/${taskId}`)
  }
  // Получает таски, назначенные на команду пользователя
  async getTasks({userId}: {userId:string}) {
    return axios.get<Task>(`/api/task?${qs.stringify(
      userId
    )}`)
  }
  async updateTask({ data, id}: { id: string; data: Partial<Task>}) {
    return axios.post<Task>(`/api/task/${id}`, data)
  }
  async createTask(data: TaskCreateDto) {
    return axios.put<Task>(`/api/task`, data)
  }
}

export const taskServiceApi = new TaskService()