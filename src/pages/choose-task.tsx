import Image from 'next/image'
import { Inter } from 'next/font/google';
import { useState, useEffect } from 'react';
import Link from 'next/link';

import { taskServiceApi } from '../services/task.service';

import styles from './styles.module.css';
import { useTelegramInitData } from '@/hooks/use-telegram-init-data';

const inter = Inter({ subsets: ['latin'] });

export default function ChooseTask() {
    const data = useTelegramInitData()
    const [tasks, setTasks] = useState<any>([]);
    const username = data.user?.usernames || '';
    const getTasks = async () => {
        return taskServiceApi.getTasks({ username });
    };

    useEffect(() => {
        getTasks().then(list => {
            console.log(list);
            // @ts-ignore
            setTasks(() => {
                return list?.data?.map((item) => {
                    return {
                        id: item.id,
                        name: item.name,
                        team: item.team
                    };
                })
            });
        });
    }, []);

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

            <h1>Список голосований</h1>

            <>
                {tasks.map((item: any, index: number) => {
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
        </main>
    );
}
