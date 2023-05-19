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
    const collection = db.collection('vote');

    // Человек проголосовал
    if (req.method === "PUT") {
        const { taskId, username } = req.body;
        const votes = await collection.where("taskId", "==", taskId).where("username", "==", username).get();
        if (!votes.empty) {
            return res.status(400).json({message: "Уже голосовали"} as any);
        }
        const result = await collection.add(req.body);
        return res.status(200).json(result as any);
    }

    // Человек удалил голос
    if (req.method === "DELETE") {
        const { taskId, username } = req.query;
        const votes = await collection.where("taskId", "==", taskId).where("username", "==", username).get();
        const result = await votes.docs[0].ref.delete();

        return res.status(200).json(result as any);
    }

    // Обновление голоса
    if (req.method === "POST") {
        const { taskId, username, ...props } = req.body;
        const votes = await collection.where("taskId", "==", taskId).where("username", "==", username).get();
        const result = await votes.docs[0].ref.update(props);

        return res.status(200).json(result as any);
    }

    return res.status(404).json([{message: "route not found"}]);
}