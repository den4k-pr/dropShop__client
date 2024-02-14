// src/redux/cart/cartSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface ProductItem {
  id: number;
  name: string;
  slug: string;
  price: number;
  priceDrop: number;
  quantity: number;
  categoryName: string;
  image: string;
}

interface SoldProductsState {
  items: ProductItem[];
}

const initialState: SoldProductsState = {
  items: [],
};

const soldProductsSlice = createSlice({
    name: 'sold-products',
    initialState,
    reducers: {
      addItems: (state, action: PayloadAction<ProductItem[]>) => {
        action.payload.forEach(newItem => {
          const { id } = newItem;
          const existingItemIndex = state.items.findIndex(item => item.id === id);
  
          if (existingItemIndex !== -1) {
            // Якщо товар існує, збільшуємо його кількість
            state.items[existingItemIndex] = {
              ...state.items[existingItemIndex],
              quantity: state.items[existingItemIndex].quantity + 1,
            };
          } else {
            // Якщо товар не існує, додаємо його до масиву
            state.items.push({
              ...newItem,
              quantity: 1,
            });
          }
        });
      },
      removeItem: (state, action: PayloadAction<number>) => {
        state.items = state.items.filter(item => item.id !== action.payload);
      },
      clearSoldProducts: (state) => {
        state.items = [];
      },
    },
  });
  
export const selectTotalPrice = (state: RootState) => {
  return state.cart.items.reduce((total: any, item: any) => {
    const itemPrice = item.price - (item.price * (item.priceDrop / 100));
    return total + itemPrice;
  }, 0);
};

export const { addItems, clearSoldProducts } = soldProductsSlice.actions;

export default soldProductsSlice.reducer;
