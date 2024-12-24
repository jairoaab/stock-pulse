import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeSubscription } from '../Stock/StockSlice';

import './StockSubscriptions.scss';
import {useStockSubscriptionWebSocket} from "../websocket/WebSocketProvider";

const StockSubscriptions = () => {
    const subscriptions = useSelector((state: any) => state.subscriptions);
    const { unsubscribe } = useStockSubscriptionWebSocket()
    const dispatch = useDispatch();
    const onRemove = (symbol: string) => {
        unsubscribe(symbol);
        dispatch(removeSubscription(symbol));
    }

    return (
        <div className="top-cards-container">
            {subscriptions.map((stock: any) => (
                <div key={stock.symbol} className="top-card">
                    <h3>{stock.symbol}</h3>
                    <p>Threshold: ${stock.threshold}</p>
                    <p>Current Price: ${stock.price || 'Fetching...'}</p>
                    <div className="card-actions">
                        <button
                            className="remove-button"
                            onClick={() => onRemove(stock.symbol)}
                        >
                            Remove
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default StockSubscriptions;
