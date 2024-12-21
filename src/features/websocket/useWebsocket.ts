import { useState, useEffect } from 'react';
import {
    io,
    // Socket,
} from 'socket.io-client';

interface FinnhubWebSocketMessage {
    type: string;
    data: any;
}

interface UseWebSocketParams {
    url: string;
    payload: Record<string, any>;
    onMessage: (message: FinnhubWebSocketMessage) => void;
}

const useWebSocket = ({ url, payload, onMessage }: UseWebSocketParams) => {
    // const [socket, setSocket] = useState<Socket | null>(null);
    const [isConnected, setIsConnected] = useState<boolean>(false);

    useEffect(() => {
        // Initialize Socket.io client with Finnhub API token in auth
        const socketInstance = io(url, {
            transports: ['websocket'], // Use WebSocket transport
            auth: {
                token: 'ctiffk1r01qm6mumuce0ctiffk1r01qm6mumuceg', // Finnhub API token
            },
        });

        socketInstance.on('connect', () => {
            console.log('Socket connected');
            setIsConnected(true);

            // Send the initial subscription message
            socketInstance.emit('subscribe', payload);
        });

        socketInstance.on('message', (data: FinnhubWebSocketMessage) => {
            onMessage(data); // Handle incoming message
        });

        socketInstance.on('disconnect', () => {
            console.log('Socket disconnected');
            setIsConnected(false);
        });

        // Clean up on unmount or changes
        return () => {
            socketInstance.disconnect();
        };
    }, [url, payload, onMessage]);

    return { isConnected };
};

export default useWebSocket;
