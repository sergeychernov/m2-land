// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import db from '../../db';

type Data = string;


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const tgbot = process.env.NEXT_TELEGRAM_TOKEN;
    if (req.body?.message?.text === '/start' && req.body?.message?.chat?.id) {
        const usersCollection = db.collection('users');
        const count = (await usersCollection.count().get()).data().count;
        const message =
            `Привет, ${req.body.message.from.first_name}. Подписчиков: <b>${count}</b>`;
        const promises = [];
        promises.push(fetch(
            `https://api.telegram.org/bot${tgbot}/sendMessage?chat_id=${req.body?.message?.chat?.id}&text=${message}&parse_mode=HTML`
        ));
        if (req?.body?.message?.from?.username) {
            const docRef = db.collection('users').doc(req.body.message.from.username);

            promises.push(docRef.set({ ...req.body.message.from }, { merge: true }));
        } else {
            promises.push(fetch(
                `https://api.telegram.org/bot${tgbot}/sendMessage?chat_id=${req.body?.message?.chat?.id}&text=Что-то не так&parse_mode=HTML`
            ));
        }
        await Promise.all(promises);
        
    }

    res.status(200).send('OK');
};