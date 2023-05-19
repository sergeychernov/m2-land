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
  
    // Обновит данные
    if (req.method === "POST") {
        // const voteCollection = db.collection('vote');
        // const votesDocs = (await voteCollection.where("taskId", "==", doc.id).get()).docs || [];
        // const averageScore = votesDocs?.reduce((acc, doc) => {
        //     acc += +doc.data().score || 0;
        //     return acc;
        // }, 0) / (votesDocs.length || 1);
        
        // const data = { ...doc.data(), id: doc.id, averageScore };
        // return res.status(200).json(data as any);
        const result = await docRef.update({ status: "closed" }) as any;
        
        
        const voteCollection = db.collection('vote');
        const votesDocs = (await voteCollection.where("taskId", "==", taskId).get()).docs || [];
        const userNames: string[] = [];
        for (const vote of votesDocs) {
            userNames.push(vote.data().username);
        }

        const usersCollection = db.collection('users');
        const usersDocs = (await usersCollection.where("username", "in", userNames).get()).docs;

        for (const userDoc of usersDocs) {
            // hard code
            userDoc.ref.update({score: userDoc.data().score + 1 })
        }

        return res.status(200).json(result);
    }

    return res.status(404).json([{message: "route not found"}]);
}