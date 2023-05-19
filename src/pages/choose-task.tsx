import Image from 'next/image'
import { Inter } from 'next/font/google';

import { taskServiceApi } from '../services/task.service';

import styles from './styles.module.css';

const inter = Inter({ subsets: ['latin'] });

export default function ChooseTask() {
    const getTasks = async () => {
        return taskServiceApi.getTasks({ userName: 'egorbul' });
    };

    getTasks().then(item => {
        console.log(item);
    });

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

        </main>
    );
}
