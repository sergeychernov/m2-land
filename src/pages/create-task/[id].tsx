import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useState } from 'react';

import { taskServiceApi } from '../../services/task.service';

const inter = Inter({ subsets: ['latin'] });
export async function getStaticPaths() {
    return {
        paths: [{
            params: { id: 'cms' }
        }, {
            params: { id: 'classified' }
        }], fallback: false
    };
}

export async function getStaticProps({ params }: any) {
    return {
        props: {
            team: params.id
        },
    };
}


export default function CreateTask({ team }: { team: string }) {
    
    const [name, setName] = useState();
    const handleNameChange = (event: any) => {
        setName(event.target.value);
    }
    const username = 'egorbul';

    const createTask = async (event: any) => {
        event.preventDefault();
        taskServiceApi.createTask({ name: name || '', team, username })

    }

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
                <label htmlFor="name">Название задачи:</label>
                <input type="text" id="name" name="name" onChange={handleNameChange} />
                <button onClick={createTask}>Послать</button>
            
        </main>
    );
}
