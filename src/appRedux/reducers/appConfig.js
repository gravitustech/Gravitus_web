import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  theme     : 'light',
  toppings  : ['Cheese'], // Array Exp
  gluten    : true // Boolean Exp
};

export const configReducer = createSlice({
  name : 'appConfig',
  initialState,
  reducers : {
    toggleTheme(state) {
      state.theme == 'light' ? 'dark' : light;
    },
    addToppings(state, action) {
      state.toppings = [...state.toppings, action.payload];
    },
    toggleGluten(state) {
      state.gluten = !state.gluten;
    }
  }
})

export const {toggleTheme} = configReducer.actions;

export default configReducer.reducer;