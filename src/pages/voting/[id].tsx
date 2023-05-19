import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useState } from 'react';

import { voteServiceApi } from '../../services/vote.service';

import { taskServiceApi } from '../../services/task.service';

const inter = Inter({ subsets: ['latin'] });

export async function getServerSideProps({ params }: any) {
    return {
        props: {
            taskId: params.id
        },
    };
}


export default function CreateTask({ taskId }: { taskId: string }) {
    
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
            username: '',
            taskId,
            score
        })
    }

    return (
        <main
            className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
        >
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
            <label htmlFor="score">{`Проголосуйте за задачу ${taskId}:`}</label>
                <input type="text" id="score" name="score" onChange={handleScoreChange} />
            <button onClick={vote}>Послать</button>
            
            <label>{`Завершить голосование по ${taskId}:`}</label>
            <button onClick={stop}>Послать</button>
        </main>
    );
}
