// src/redux/fontsSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FontData {
  id: number;
  name: string;
  font_url: string;
}

interface FontsState {
  fonts: FontData[];
  refresh: boolean; 
}

const initialState: FontsState = {
  fonts: [],
  refresh: false,
};

const fontsSlice = createSlice({
  name: 'fonts',
  initialState,
  reducers: {
    setFonts(state, action: PayloadAction<FontData[]>) {
      state.fonts = action.payload;
      state.refresh = false; // Reset refresh flag
    },
    deleteFont(state, action: PayloadAction<number>) {
      state.fonts = state.fonts.filter(font => font.id !== action.payload);
    },
    triggerRefresh(state) {
      state.refresh = true; 
    },
  },
});

export const { setFonts, deleteFont, triggerRefresh } = fontsSlice.actions;
export default fontsSlice.reducer;
