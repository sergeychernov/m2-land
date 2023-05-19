// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import db from '@/db'
import { User } from '@/types/db.types';
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = any[];

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    if (req.method === "GET") {
        const usersCollection = db.collection('users');
        const users = await usersCollection.get();
        let teamSet = new Set()
        
        users.forEach(doc => {
            for (const team of (doc.data() as User).teams) {
                teamSet.add(team);
            }
        });
        
        return res.status(200).json(Array.from(teamSet));
    }
    return res.status(404).json([{message: "route not found"}]);
}