import { configureStore } from '@reduxjs/toolkit'
import ColorServiceReducer from './slices/ColorServiceSlice';
import HttpCommunicationsReducer from './slices/HttpCommunicationsSlice';
import GridPresetsReducer from './slices/GridPresetsSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer, persistStore } from 'redux-persist';






export const store = configureStore({
    reducer: {
        gridPresetsReducer:GridPresetsReducer,// persistedReducer,
        colorServiceReducer: ColorServiceReducer,
        httpCommunicationsReducer: HttpCommunicationsReducer,
    },

    // Include below to avoid the warning about size of store
    // middleware: (getDefaultMiddleware) =>
    //     getDefaultMiddleware({
    //         serializableCheck: false,
    //     }),
})



// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch