import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useEffect, useState } from 'react';

import { voteServiceApi } from '../../services/vote.service';

import { taskServiceApi } from '../../services/task.service';
import { Task } from '@/types/db.types';
import { useTelegramInitData } from '@/hooks/use-telegram-init-data';

const inter = Inter({ subsets: ['latin'] });

export async function getServerSideProps({ params }: any) {
    return {
        props: {
            taskId: params.id
        },
    };
}


export default function CreateTask({ taskId }: { taskId: string }) {
    const data = useTelegramInitData()
    const [task, setTask] = useState<Task | null>(null);
    const [message, setMessage] = useState<Task | null>(null);
    useEffect(() => {
        async function fetchData() {
            const { data } = await taskServiceApi.getTask(taskId);
            setTask(data)
        }
        fetchData();
    }, [taskId]);
    
    const [score, setScore] = useState(0);
    const handleScoreChange = (event: any) => {
        setScore(event.target.value);
    }

    const vote = async (event: any) => {
        event.preventDefault();
        await taskServiceApi.updateTask({
            id: taskId, data: {
                status: 'closed',
            }
        })
    }

    const stop = async (event: any) => {
        event.preventDefault();
        await voteServiceApi.createVote({
            username: data.user?.usernames || '',
            taskId,
            score
        });
    }

    return (
        <main
            className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
        >
            {task?.name &&  <div>{ task.name}</div>}
            <div>
                <Image
                    className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70]"
                    src="/logo-large-gold.png"
                    alt="Alice M2 Logo"
                    width={232}
                    height={167}
                    priority
                />
            </div>
            <label htmlFor="score">{`Проголосуйте за задачу ${task?.name || taskId}:`}</label>
            <input type="text" id="score" name="score" onChange={handleScoreChange} />
            <button onClick={vote}>Послать</button>
            
            <button onClick={stop}>Завершить голосование</button>



        </main>
    );
}
