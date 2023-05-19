import qs from 'qs';
import axios from 'axios';
import { User } from '@/types/db.types';

export class UserService{
  async getUser(username:string) {
    return axios.get<User>(`/api/user/${username}`)
  }
  async updateUser({ data,username}: { username: string; data: Partial<User>}) {
    return axios.post<User>(`/api/user/${username}`, data)
  }
}

export const userServiceApi = new UserService()