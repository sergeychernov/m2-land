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

            <h1>Telegram</h1>
            <pre>{ JSON.stringify(data, null, '\t')}</pre>


        </main>
    );
}
