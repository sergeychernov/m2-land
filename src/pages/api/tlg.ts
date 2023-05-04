// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = string;


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const tgbot = process.env.NEXT_TELEGRAM_TOKEN;
    if (req.body?.message?.text === '/start' && req.body?.message?.chat?.id) {
        const message =
            'Привет <b>' +
            req.body.message.from.first_name +
            '</b>.';
        const ret = await fetch(
            `https://api.telegram.org/bot${tgbot}/sendMessage?chat_id=${req.body?.message?.chat?.id}&text=${message}&parse_mode=HTML`
        );
    }

    res.status(200).send('OK');
};