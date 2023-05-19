// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import db from '@/db'
import { User } from '@/types/db.types';
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = any[];

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const { taskId: _taskId } = req.query;
    const taskId = _taskId as string;
  
    if (!taskId) {
        return res.status(404).json([{message: "taskId not found"}]);
    }
  
    const collection = db.collection('tasks');
    
    const docRef = collection.doc(taskId);
    const doc = await docRef.get();
    
    if (!doc.exists) {
      return res.status(404).json([{message: "task not found"}]);
    }
  
    if (req.method === "GET") {
        const data = doc.data();
        return res.status(200).json(data as any);
    }
  
    // Обновит данные
    if (req.method === "POST") {
        const result = await docRef.update(req.body) as any
        return res.status(200).json(result);
    }
    
    return res.status(404).json([{message: "route not found"}]);
}