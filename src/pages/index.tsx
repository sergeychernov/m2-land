import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useTelegramInitData } from '../hooks/use-telegram-init-data';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <Link href="/intro">правила игры</Link>
      <Link href="/create-task/cms">создать задачу CMS</Link>
      <Link href="/create-task/classified">создать задачу Classified</Link>
      <Link href="/choose-task">Список доступных голосований</Link>

      <Link href="/voting/B4z8q6h4gtnDsAitKb9h">Проголосуйте за задачу B4z8q6h4gtnDsAitKb9h</Link>

    </main>
  )
}
