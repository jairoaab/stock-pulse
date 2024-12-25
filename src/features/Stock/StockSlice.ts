import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface StockSubscription {
    symbol: string;
    threshold: number;
    price?: number;
    name?: string;
    change?: number;
    lastUpdated?: string;
    notified?: boolean;
    currency?: string;
}

export interface Stock {
    symbol: string;
    description: string;
    displaySymbol: string;
    type: string;
}

export interface StockStateData {
    subscriptions: StockSubscription[];
    stocks: Stock[];
    loading: boolean;
    error: string;
}

const initialState: StockStateData = {
    subscriptions: [],
    stocks: [],
    loading: false,
    error: '',
};

const stockSlice = createSlice({
    name: 'stock',
    initialState,
    reducers: {
        updateStocks: (state, action: PayloadAction<Stock[]>) => {
            state.stocks = action.payload;
        },
        addSubscription: (state, action: PayloadAction<StockSubscription>) => {
            state.subscriptions.push(action.payload);
        },
        updateStockData: (state, action: PayloadAction<{ id: string; data: Partial<StockSubscription> }>) => {
            const { id, data } = action.payload;
            const index = state.subscriptions.findIndex((stock) => stock.symbol === id);
            if (index !== -1) {
                state.subscriptions[index] = { ...state.subscriptions[index], ...data };
            }
        },
        removeSubscription: (state, action: PayloadAction<string>) => {
            state.subscriptions = state.subscriptions.filter((sub) => sub.symbol !== action.payload);
        },
    },
});

export const { updateStockData, addSubscription, removeSubscription, updateStocks } =
    stockSlice.actions;

export default stockSlice.reducer;
