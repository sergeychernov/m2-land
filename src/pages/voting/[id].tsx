import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useEffect, useState } from 'react';

import { voteServiceApi } from '../../services/vote.service';

import { taskServiceApi } from '../../services/task.service';
import { Task, User } from '@/types/db.types';
import { useTelegramInitData } from '@/hooks/use-telegram-init-data';
import { messageServiceApi } from '@/services/message.service';
import { userServiceApi } from '@/services/user.service';

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
    const [user, setUser] = useState<User | null>(null);
    const [message, setMessage] = useState<string | null>(null);

    const username = data.user?.usernames;
    
    useEffect(() => {
        async function fetchData() {
            
            const { data: taskData} = await taskServiceApi.getTask(taskId);
            setTask(taskData);

            if (username) {
                const { data: userData } = await userServiceApi.getUser(username);
                setUser(userData)
            }
        }
        fetchData();
    }, [taskId, username]);

    useEffect(() => {
        async function fetchData() {
            if (user) {
                const {data: newMessage} = await messageServiceApi.getMessage({ type: 'up', scores: +user.score });
                setMessage(newMessage);
            }
        }
        if (task?.status == "closed" && user) {
            fetchData();
        }
       
    }, [user, task]);
    
    const [score, setScore] = useState(0);
    const handleScoreChange = (event: any) => {
        setScore(event.target.value);
    }

    const closeTask = async (event: any) => {
        event.preventDefault();
        await taskServiceApi.closeTask({
            id: taskId
        });
        // @ts-ignore
        setTask(prev => ({ ...prev, status: 'closed' }));
    }

    const vote = async (event: any) => {
        event.preventDefault();
        await voteServiceApi.createVote({
            username: username || '',
            taskId,
            score
        });
    }

    const stopVote = async (event: any) => {
        event.preventDefault();
        await voteServiceApi.deleteVote({
            username: username || '',
            taskId
        });
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
                
                <button onClick={closeTask}>Завершить голосование</button>
            </div>
            }

            
            {message && 
            <div>{ message}</div>}


        </main>

       
        
       
        
    );
}
