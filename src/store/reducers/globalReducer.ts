import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ReducerNames } from './reducerNames';

export enum Modes {
  NONE = 'none',
  ANCHOR_DAYS = 'anchor_days',
  WEEKDAYS = 'weekdays',
  MODULO_EASY = 'modulo_easy',
  MODULO_HARD = 'modulo_hard',
  LEAP_YEARS = 'leap_years',
}

interface GlobalState {
  mode: Modes;
}

const initialState: GlobalState = {
  mode: Modes.ANCHOR_DAYS,
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
