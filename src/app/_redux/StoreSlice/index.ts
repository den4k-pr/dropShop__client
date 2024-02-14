
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SlugState {
  slugs: string[];
}

const initialState: SlugState = {
  slugs: [],
};

const slugSlice = createSlice({
  name: 'slug',
  initialState,
  reducers: {
    addSlug: (state, action: PayloadAction<string>) => {
      const newSlug = action.payload;
      
      if (!state.slugs.includes(newSlug)) {
        state.slugs = [...state.slugs, newSlug];
      } else {
        console.log(`Slug "${newSlug}" вже існує.`);
      }
    },
    clearSlugs: (state) => {
      state.slugs = [];
    },
  },
});

export const { addSlug, clearSlugs } = slugSlice.actions;
export default slugSlice.reducer;
