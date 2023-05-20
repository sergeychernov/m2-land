import { URLSearchParams } from 'next/dist/compiled/@edge-runtime/primitives/url';
import { useEffect, useState } from 'react';
import { TelegramWebApps } from 'telegram-webapp-types';

/**
 * Hook to get the initial data from the Telegram Web Apps API already parsed.
 * @example
 * const { hash } = useTelegramInitData();
 * console.log({ hash });
 */
export function useTelegramInitData() {
    const [data, setData] = useState<TelegramWebApps.WebAppInitData>({});

    useEffect(() => {
        const firstLayerInitData = Object.fromEntries(
            new URLSearchParams(window.Telegram.WebApp.initData)
        );

        const initData: Record<string, string> = {};
            
        for (const key in firstLayerInitData) {
            try {
                initData[key] = JSON.parse(firstLayerInitData[key]);
            } catch {
                initData[key] = firstLayerInitData[key];
            }
        }

        setData(initData);
    }, []);

    return data;
}