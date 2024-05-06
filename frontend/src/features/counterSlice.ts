import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CounterState {
  count: number;
}

const loadStateFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem('counterState');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState) as CounterState;
  } catch (err) {
    return undefined;
  }
};

const initialState: CounterState = loadStateFromLocalStorage() || {
  count: 0,
};

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state, action: PayloadAction<number>) => {
      state.count += action.payload;
      localStorage.setItem('counterState', JSON.stringify(state));
    },
    decrement: (state, action: PayloadAction<number>) => {
      state.count -= action.payload;
      localStorage.setItem('counterState', JSON.stringify(state));
    },
  },
});

export const counterReducer = counterSlice.reducer;
export const { increment, decrement } = counterSlice.actions;
