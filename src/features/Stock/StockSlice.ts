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

export interface StockStateData {
    subscriptions: StockSubscription[];
    loading: boolean;
    error: string;
}

const initialState: StockStateData = {
    subscriptions: [],
    loading: false,
    error: '',
};

const stockSlice = createSlice({
    name: 'stock',
    initialState,
    reducers: {
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

export const { updateStockData, addSubscription, removeSubscription } =
    stockSlice.actions;

export default stockSlice.reducer;
