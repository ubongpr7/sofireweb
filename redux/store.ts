import {configureStore} from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
export const makeStore = ()=>
    configureStore({
        reducer:{
            auth: authReducer
        },
        devtools:process.NODE_ENV !=='production'
    })

    export type AppStore =ReturnType<typeof makeStore>;
    export type RootState = ReturnType<AppStore['getState']>;
    export type AppDispatch = AppStore['dispatch'];
    export const wrapper = createWrapper<AppStore>(makeStore,{debug:true});