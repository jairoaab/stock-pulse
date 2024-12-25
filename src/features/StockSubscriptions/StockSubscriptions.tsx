import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeSubscription, StockSubscription } from '../Stock/StockSlice';

import './StockSubscriptions.scss';
import { useStockSubscriptionWebSocket } from '../websocket/WebSocketProvider';

const StockSubscriptions = () => {
    const subscriptions = useSelector((state: any) => state.subscriptions);
    const { unsubscribe } = useStockSubscriptionWebSocket();
    const dispatch = useDispatch();

    const onRemove = (symbol: string) => {
        unsubscribe(symbol);
        dispatch(removeSubscription(symbol));
    };

    const getStockClass = (stock: StockSubscription) =>
        (stock.price || 0) > stock.threshold ? 'above-the-price' : 'below-the-price';

    const calculatePercentageChange = (stock: StockSubscription) => {
        const { price, threshold } = stock;
        if (!price || !threshold) return 0;
        return ((price - threshold) / threshold) * 100;
    };

    return (
        <div className="top-cards-container">
            {subscriptions.map((stock: StockSubscription) => {
                const percentageChange = calculatePercentageChange(stock);
                return (
                    <div key={stock.symbol} className="top-card">
                        <h3>{stock.symbol}</h3>
                        <p>Threshold: ${stock.threshold}</p>
                        <p className={getStockClass(stock)}>
                            Current Price: {stock.price ? `$${stock.price}` : 'Not Available'}
                        </p>
                        <p className="percentage-change">
                            Change: {percentageChange.toFixed(2)}%
                        </p>
                        <div className="card-actions">
                            <button
                                className="remove-button"
                                onClick={() => onRemove(stock.symbol)}
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default StockSubscriptions;
