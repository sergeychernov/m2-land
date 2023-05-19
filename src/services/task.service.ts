import qs from 'qs';
import axios from 'axios';
import { Task, TaskStatus, Vote } from '@/types/db.types';

type TaskCreateDto = Omit<Task, "id" | "status">

type TaskStateDto = {votes: Vote[], status: TaskStatus}

export class TaskService{
  async getTask(taskId:string) {
    return axios.get<Task>(`/api/task/${taskId}`)
  }
  // Получает таски, назначенные на команду пользователя
  async getTasks(params: { username: string }) {
    return axios.get<Task[]>(`/api/task?${qs.stringify(
      params
    )}`)
  }
  async updateTask({ data, id}: { id: string; data: Partial<Task>}) {
    return axios.post<Task>(`/api/task/${id}`, data)
  }
  async closeTask({  id}: { id: string;}) {
    return axios.post<Task>(`/api/task/${id}/close`)
  }
  async createTask(data: TaskCreateDto) {
    return axios.put<Task>(`/api/task`, data)
  }
  async getTaskState(params: { taskId: string }) {
    return axios.get<TaskStateDto>(`/api/task/state?${qs.stringify(
      params
    )}`)
  }
}

export const taskServiceApi = new TaskService()