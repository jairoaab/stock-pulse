import { useState, useEffect } from 'react';

interface UseGetParams {
    url: string;
    payload: Record<string, any>;
}

interface UseGetResponse<T> {
    data: T | null;
    isLoading: boolean;
}

const useGet = <T>({ url, payload }: UseGetParams): [() => void, UseGetResponse<T>] => {
    const [data, setData] = useState<T | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [lastPayload, setLastPayload] = useState<Record<string, any>>(payload);

    const buildQueryParams = (payload: Record<string, any>): string => {
        return Object.keys(payload)
            .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(payload[key])}`)
            .join('&');
    };

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const queryParams = buildQueryParams(payload);
            const response = await fetch(`${url}?${queryParams}`, {
                method: 'GET',
                headers: {
                    'X-Finnhub-Token': 'ctiffk1r01qm6mumuce0ctiffk1r01qm6mumuceg',
                },
            });
            if (!response.ok) console.error('Failed to fetch data');
            const result = await response.json();
            setData(result);
            setLastPayload(payload);
        } catch (error) {
            console.error('Error fetching data:', error);
            setData(null);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (JSON.stringify(payload) !== JSON.stringify(lastPayload)) {
            fetchData();
        }
    }, [payload]);

    const refetch = () => {
        setData(null);
        setIsLoading(true);
        fetchData();
    };

    return [refetch, { data, isLoading }];
};

export default useGet;
