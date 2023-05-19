import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useTelegramInitData } from '../hooks/use-telegram-init-data';

const inter = Inter({ subsets: ['latin'] });

export default function CreateTask() {

    return (
        <main
            className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
        >
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
        </main>
    );
}
