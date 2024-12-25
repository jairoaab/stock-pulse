import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from "../../app/store";
import { updateStockData } from "../Stock/StockSlice";
import useNotification from "../PushNotifications/useNotification";


interface WebSocketContextProps {
    subscribe: (symbol: string) => void;
    unsubscribe: (symbol: string) => void;
}

const WebSocketContext = createContext<WebSocketContextProps | null>(null);

export const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const socketRef = useRef<WebSocket | null>(null);
    const dispatch = useDispatch();
    const subscriptions = useSelector((state: RootState) => state.subscriptions);
    const [connected, setConnected] = useState(false);
    const [sendNotification] = useNotification()

    useEffect(() => {
        const socket = new WebSocket('wss://ws.finnhub.io?token=ctiffk1r01qm6mumuce0ctiffk1r01qm6mumuceg');
        socketRef.current = socket;

        socket.onopen = () => {
            setConnected(true);
            subscriptions.forEach((sub) =>
                socket.send(JSON.stringify({ type: 'subscribe', symbol: sub.symbol }))
            );
        };

        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.type === 'trade') {
                const trades = data.data;
                trades.forEach(async (trade: any) => {
                    const subscription = subscriptions.find((sub) => sub.symbol === trade.s);
                    let notified: boolean = !!subscription?.notified;
                    if (!notified && subscription?.threshold && subscription?.threshold >= trade.p) {
                        if (Notification.permission === 'granted') {
                            sendNotification({
                                title: 'Stock Price Alert',
                                body: `The price of ${trade.s} has fallen below your set threshold. Current price: $${trade.p}`,
                            });
                            notified = true;
                        }
                    }

                    dispatch(
                        updateStockData({
                            id: trade.s,
                            data: {
                                price: trade.p,
                                lastUpdated: trade.t,
                                notified,
                            },
                        })
                    );
                });
            }
        };

        socket.onerror = (error) => {
            console.error('websocket error:', error);
        };

        socket.onclose = () => {
            setConnected(false);
        };

        return () => {
            if (socketRef.current) {
                socketRef.current.close();
            }
        };
    }, []);

    const subscribe = (symbol: string) => {
        if (connected && socketRef.current) {
            socketRef.current.send(JSON.stringify({ type: 'subscribe', symbol }));
        }
    };

    const unsubscribe = (symbol: string) => {
        if (connected && socketRef.current) {
            socketRef.current.send(JSON.stringify({ type: 'unsubscribe', symbol }));
        }
    };

    return (
        <WebSocketContext.Provider value={{ subscribe, unsubscribe }}>
            {children}
        </WebSocketContext.Provider>
    );
};

export const useStockSubscriptionWebSocket = () => {
    const context = useContext(WebSocketContext);
    if (!context) {
        throw new Error('useWebSocket must be used within a WebSocketProvider');
    }
    return context;
};
