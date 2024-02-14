// src/redux/cart/cartSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface CartItem {
  id: number;
  size: string;
  name: string;
  slug: string;
  price: number;
  priceDrop: number;
  quantity: number;
  categoryName: string;
  selectedColor: string;
  image: string;
  sizes: string[];
  colors: string[];
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const MAX_QUANTITY = 10; // Додаємо константу для максимальної кількості

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const { id } = action.payload;
      const existingItem = state.items.find(item => item.id === id);
   
      if (existingItem) {
         if (existingItem.quantity < MAX_QUANTITY) {
            existingItem.quantity += 1;
         }
      } else {
         try {
            const newItem: CartItem = {
               ...action.payload,
               quantity: 1
            };
            state.items.push(newItem);
         } catch (error) {
            console.error('Error while serializing action:', error);
         }
      }
   },
   
    updateQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
      const { id, quantity } = action.payload;
      const itemToUpdate = state.items.find(item => item.id === id);

      if (itemToUpdate) {
        // Перевіряємо, чи нове значення кількості не перевищує максимальну
        itemToUpdate.quantity = Math.min(quantity, MAX_QUANTITY);
      }
    },
    updateColor: (state, action: PayloadAction<{ id: number; color: string }>) => {
      const { id, color } = action.payload;
      const itemToUpdate = state.items.find(item => item.id === id);

      if (itemToUpdate) {
        itemToUpdate.selectedColor = color;
      }
    },
    updateSize: (state, action: PayloadAction<{ id: number; size: string }>) => {
      const { id, size } = action.payload;
      const itemToUpdate = state.items.find(item => item.id === id);

      if (itemToUpdate) {
        itemToUpdate.size = size;
      }
    },
    removeItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const selectTotalPrice = (state: RootState) => {
  return state.cart.items.reduce((total: any, item: any) => {
    const itemPrice = item.price - (item.price * (item.priceDrop / 100));
    return total + itemPrice * item.quantity; // Змінено для врахування кількості товару
  }, 0);
};

export const { updateQuantity, addItem, removeItem, clearCart, updateColor, updateSize } = cartSlice.actions;

export default cartSlice.reducer;
