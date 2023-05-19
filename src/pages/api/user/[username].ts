// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import db from '@/db'
import { User } from '@/types/db.types';
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = any[];

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const { username: _username } = req.query;
    const username = _username as string;
  
    if (!username) {
        return res.status(404).json([{message: "username not found"}]);
    }
  
    const usersCollection = db.collection('users');
    
    const userDocRef = usersCollection.doc(username);
    const userDoc = await userDocRef.get();
    
    if (!userDoc.exists) {
      return res.status(404).json([{message: "user not found"}]);
    }
  
    if (req.method === "GET") {
        const user = userDoc.data();
        return res.status(200).json(user as any);
    }
  
    // Обновит пользователя
    if (req.method === "POST") {
        const data = req.body;
        return res.status(200).json(await userDocRef.update(data) as any);
    }
    return res.status(404).json([{message: "route not found"}]);
}