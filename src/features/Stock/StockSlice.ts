import { createSlice } from '@reduxjs/toolkit';

const stockSlice = createSlice({
    name: 'stock',
    initialState: {
        stockData: [],
        loading: false,
        error: '',
    },
    reducers: {
        // @ts-ignore
        addStockData: (state, action: { payload: never }) => {
            state.stockData.push(action.payload);
        },
        updateStockData: (state, action) => {
            const { id, data } = action.payload;
            const index = state.stockData.findIndex((stock: any) => stock.id === id);
            if (index !== -1) {
                // @ts-ignore
                state.stockData[index] = { ...state.stockData[index], ...data };
            }
        },
        deleteStockData: (state, action) => {
            state.stockData = state.stockData.filter((stock: any) => stock.id !== action.payload);
        }
    },
});

export const { addStockData, updateStockData, deleteStockData } = stockSlice.actions;

export default stockSlice.reducer;
