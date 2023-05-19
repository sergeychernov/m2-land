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
    const collection = db.collection('tasks');

    // Создание
    if (req.method === "PUT") {
        const result = await collection.add({...req.body, status: "opened"});
        return res.status(200).json(result as any);
    }

    // Получает таски, назначенные на команду пользователя
    if (req.method === "GET") {
        const { username } = req.query;

        const usersCollection = db.collection('users');
        const user = (await usersCollection.doc(username as string).get()).data() as User;

        const result = [] as Task[];
        (await collection.where("team", "in", user.teams).get()).forEach(doc => {
            result.push(doc.data() as Task)
        });
        
        return res.status(200).json(result);
    }

    return res.status(404).json([{message: "route not found"}]);
}