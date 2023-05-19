import qs from 'qs';
import axios from 'axios';
import { Vote } from '@/types/db.types';

type VoteCreateDto = Omit<Vote, "id">;

type VoteBaseDto = Pick<Vote, "username" | "taskId">

export class VoteService{
  async createVote(data: VoteCreateDto) {
    return axios.put(`/api/vote`, data)
  }
  async deleteVote(data: VoteBaseDto) {
    return axios.delete(`/api/vote`, { params: data })
  }
  async updateVote(data: VoteCreateDto) {
    return axios.post<Vote>(`/api/vote`, data)
  }
}

export const voteServiceApi = new VoteService()