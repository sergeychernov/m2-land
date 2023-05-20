import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useTelegramInitData } from '../hooks/use-telegram-init-data';
import Link from 'next/link';

import styles from './styles.module.css';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className} ${styles.bg}`}
    >
      <Image
          className={`relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] ${styles.logoImg}`}
          src="/logo-large-gold.png"
          alt="Alice M2 Logo"
          width={232}
          height={167}
          priority
      />
      <Link href="/telegram">Telegram</Link>
      <Link href="/intro">Правила игры</Link>
      <Link href="/create-task/cms">Создать задачу CMS</Link>
      <Link href="/create-task/classified">Создать задачу Classified</Link>
      <Link href="/choose-task">Список доступных голосований</Link>
      <Link href="/voting/B4z8q6h4gtnDsAitKb9h">Проголосуйте за задачу B4z8q6h4gtnDsAitKb9h</Link>
    </main>
  )
}
