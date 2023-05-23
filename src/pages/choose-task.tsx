import Image from 'next/image'
import { Inter } from 'next/font/google';
import { useState, useEffect } from 'react';
import Link from 'next/link';

import { taskServiceApi } from '../services/task.service';

import { userServiceApi } from '@/services/user.service';

import styles from './styles.module.css';
import { useTelegramInitData } from '@/hooks/use-telegram-init-data';

const inter = Inter({ subsets: ['latin'] });

export default function ChooseTask() {
    const data = useTelegramInitData()
    const [tasks, setTasks] = useState<any>([]);
    const [teams, setTeams] = useState<string[]>([]);
    const username = data.user?.username || 'sergeychernov1982';
    
    const getTasks = async () => {
        return taskServiceApi.getTasks({ username });
    };

    const getUser = async () => {
        return userServiceApi.getUser(username);
    }

    useEffect(() => {
        getTasks().then(list => {
            // @ts-ignore
            setTasks(() => {
                return list?.data?.map((item) => {
                    return {
                        id: item.id,
                        name: item.name,
                        team: item.team,
                        status: item.status
                    };
                })
            });
        });
    }, []);
    useEffect(() => {
        getUser().then(list => {
            // @ts-ignore
            setTeams(() => {
                return list?.data?.teams
            });
        });
    }, []);
    const filteredTasks = tasks.filter((item: any) => item?.status !== "closed");

    return (
        <main
            className={`flex min-h-screen flex-col items-center ${inter.className} ${styles.bg}`}
        >
            <div>
                <Image
                    className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70]"
                    src="/logo-mini.png"
                    alt="Alice M2 Logo"
                    width={172}
                    height={25}
                    priority
                />
            </div>
            {
                filteredTasks.length ?
                    <>
                        <h1>Список голосований</h1>

                        <>
                            {filteredTasks.map((item: any, index: number) => {
                                return (
                                    <div className={styles.block} key={index}>
                                        <div className={styles.info}>
                                            {`${item?.name}, ${item?.team}`}
                                        </div>
                                        <Link className={styles.btn} href={`/voting/${item?.id || '1'}`}>Перейти</Link>
                                    </div>
                                )
                            })}
                        </>
                    </> :
                    <>
                        <h2>Создайте задачу в команде:</h2>
                        <>
                            {teams.map((team: string, index: number) => {
                                return (
                                    <Link key={team} className={styles.btn} href={`/create-task/${team}`}>{`${team}`}</Link>
                                )
                            })}
                        </>
                    </>
            }

            
            
        </main>
    );
}
