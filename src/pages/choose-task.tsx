import Image from 'next/image'
import { Inter } from 'next/font/google';
import { useState, useEffect } from 'react';

import { taskServiceApi } from '../services/task.service';

import styles from './styles.module.css';

const inter = Inter({ subsets: ['latin'] });

export default function ChooseTask() {
    const [tasks, setTasks] = useState<any>([]);
    const getTasks = async () => {
        return taskServiceApi.getTasks({ username: 'egorbul' });
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
                            <div className={styles.info}>{item?.name}, {item?.team}</div>
                            <a className={styles.btn} href={`/voting/${item?.id || '1'}`}>Перейти</a>
                       </div>
                    )
                })}
            </>
        </main>
    );
}
