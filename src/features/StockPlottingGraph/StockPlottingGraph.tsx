import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { RootState } from '../../app/store';
import {USD_CURRENCY_RATES} from "./consts";

const StockValueChart = () => {
    const subscriptions = useSelector((state: RootState) => state.subscriptions);

    const chartData = useMemo(() => {
        return subscriptions.map((subscription) => {
            const price = subscription.price || 0;
            const currency: string = subscription.currency || 'USD';
            const convertedPrice: number = subscription.currency === 'USD' || !USD_CURRENCY_RATES[currency]
                ? price
                : price * USD_CURRENCY_RATES[currency];
            return {
                symbol: subscription.symbol,
                change: subscription.change || (subscription?.price || 0) - subscription.threshold,
                price: convertedPrice,
            }
        });
    }, [subscriptions]);

    return (
        <ResponsiveContainer width="100%" height={400}>
            <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="symbol" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="price" stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="change" stroke="#82ca9d" />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default StockValueChart;
