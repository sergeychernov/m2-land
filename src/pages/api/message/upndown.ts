// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import messages from './upndown.json';

type Data = string;

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    if (req.method === "GET") {
        const type = req.query['type'] as string
        const scores: number = parseInt(req.query['scores'] as string);
        if (isNaN(scores)) {
            return res.status(400).json('Надо задать параметр scores');
        } else {
            const { up, down } = messages[scores]
            if (type === 'up') {
                if (!!up) {
                    return res.status(200).json(up);
                } else {
                    return res.status(400).json('нет соответсвующего сообщения');
                }
            }
            if (type === 'down') {
                if (!!down) {
                    return res.status(200).json(down);
                } else {
                    return res.status(400).json('нет соответсвующего сообщения');
                }
            }
        }
    }
    return res.status(500).json('что-то не так');
}