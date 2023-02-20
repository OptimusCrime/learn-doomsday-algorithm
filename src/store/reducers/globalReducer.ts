import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ReducerNames } from './reducerNames';

export enum Modes {
  NONE = 'none',
  ANCHOR_DAYS = 'anchor_days',
  LEAP_YEARS = 'leap_years',
  DOOMSDAYS = 'doomsdays',
  CALCULATE = 'calculate',
}

interface GlobalState {
  mode: Modes;
}

const initialState: GlobalState = {
  mode: Modes.NONE,
};

const globalReducer = createSlice({
  name: ReducerNames.GLOBAL,
  initialState: initialState,
  reducers: {
    setMode(state, action: PayloadAction<Modes>) {
      state.mode = action.payload;
    },
  },
});

export const { setMode } = globalReducer.actions;

export default globalReducer.reducer;
