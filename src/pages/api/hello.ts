// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import db from '@/db'
import { UserCollection } from '@/types/db.types';
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "GET") {
    const usersCollection = db.collection('users');
    //console.log("usersCollection", usersCollection);

    const users = await usersCollection.get();
    users.forEach(async doc => {
      console.log("users", doc.data());
    });
  }
  return res.status(200).json({ name: 'Alice' })
}