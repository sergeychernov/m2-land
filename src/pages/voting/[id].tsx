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


export default function Voting({ taskId }: { taskId: string }) {
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

    const closeTask = async (event: any) => {
        event.preventDefault();
        await taskServiceApi.closeTask({
            id: taskId
        })
    }

    const vote = async (event: any) => {
        event.preventDefault();
        await voteServiceApi.createVote({
            username: data.user?.usernames || '',
            taskId,
            score
        });
    }

    const stopVote = async (event: any) => {
        event.preventDefault();
        await voteServiceApi.deleteVote({
            username: data.user?.usernames || '',
            taskId
        });
        // @ts-ignore
        setTask(prev => ({ ...prev, status: 'closed' }));
    }


    if (!task) {
        return <div>loading...</div>
    }
    return (
        <main
            className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
        >

          <div>
                <div className='mb-4'>
                    {task?.name && <div>{task.name}</div>}
                    {task?.status == "closed" && <div className='red'>Заверешно</div>}
                </div>
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
          </div>
           
            
            {task?.status === "closed" && task?.averageScore && <div>Среднее значение
                <div className='text-xl'>{ task.averageScore}</div>
            </div>}

            {task?.status !== 'closed' && 
            <div>

                <label htmlFor="score">{`Проголосуйте за задачу ${task?.name || taskId}:`}</label>
                <input type="text" id="score" name="score" onChange={handleScoreChange} />
                <button onClick={vote}>Поставить оценку</button>
                
                <button onClick={stopVote}>Снять оценку</button>
                
            </div>
            }



<button onClick={closeTask}>Завершить голосование</button>
        </main>
    );
}
