import Image from 'next/image'
import { Inter } from 'next/font/google'

import styles from './styles.module.css';

const inter = Inter({ subsets: ['latin'] });

export default function Intro() {

    return (
        <main
            className={`flex min-h-screen flex-col items-center ${inter.className} ${styles.bg}`}
        >
            <Image
                className={`relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] ${styles.logoImg}`}
                src="/logo-large-gold.png"
                alt="Alice M2 Logo"
                width={232}
                height={167}
                priority
            />
            <div className={styles.logoText}>
                The SCRUM Story Poker
            </div>
            <div className={styles.rulesTitle}>
                Правила игры
            </div>
            <div className={styles.rulesText}>
                Тебе повезло — ты родился владельцем комнаты в заводской общаге. У тебя уже есть 6 кв. м. С каждой игрой ты можешь увеличить или уменьшить количество этих квадратных метров.
                <br /><br />
                Нужно оценить сложность задачи — для этого выбери подходящую карту.
                Если твоя оценка будет максимально близка к средней — получишь новый квадратный метр. Если максимально далека — лишишься имеющихся «квадратов».
            </div>

            <a href={'/choose-task'} className={styles.btn}>Продолжить</a>
        </main>
    );
}
