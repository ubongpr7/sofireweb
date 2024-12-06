import {configureStore} from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import { apiSlice } from "./services/apiSlice";
export const makeStore = ()=>
    configureStore({
        reducer:{
            [apiSlice.reducerPath]:apiSlice.reducer,
            // [authReducer.name]:authReducer.reducer,
        },
        // middleware:(getDefaultMiddleware)=>
        // getDefaultMiddleware().concat(apiSlice.middleware),
        // preloadedState:{
        //     [apiSlice.reducerPath]:[],
            auth: authReducer
        },
        // devtools:process.NODE_ENV !=='production'
    })

    export type AppStore =ReturnType<typeof makeStore>;
    export type RootState = ReturnType<AppStore['getState']>;
    export type AppDispatch = AppStore['dispatch'];