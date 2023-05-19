// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import db from '@/db'
import { Task, User } from '@/types/db.types';
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = any[];

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    // Получает актуальное состояние таски
    if (req.method === "GET") {
        const { taskId } = req.query;
        
        const votes = (await db.collection('vote').where("taskId", "==", taskId).get()).docs?.map(doc=>doc.data()) || [];
        const taskStatus = (await db.collection('tasks').doc(taskId as string).get()).data()?.status;

        const result = {
          votes,
          status: taskStatus
        }
      
        return res.status(200).json(result as any);
    }

    return res.status(404).json([{message: "route not found"}]);
}