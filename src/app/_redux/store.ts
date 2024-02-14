import { combineReducers, configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { persistReducer } from 'redux-persist'
import cartReducer from "./CartSlice"
import slugReducer from "./StoreSlice"
import soldProductsReducer from "./SoldProductsSlice"
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'rotanlal',
    storage
}
   
const rootReducer = combineReducers({
    cart: cartReducer,
    slug: slugReducer,
    sold: soldProductsReducer
}) 

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat()
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
