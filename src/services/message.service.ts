import qs from 'qs';
import axios from 'axios';


export class MessageService{
  async getMessage(params: { type: string; scores: number }) {
    return axios.get<any>(`/api/message/upndown?${qs.stringify(
      params
    )}`)
  }
}

export const messageServiceApi = new MessageService()