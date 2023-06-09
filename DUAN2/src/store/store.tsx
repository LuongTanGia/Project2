import {
    configureStore,
    combineReducers,
    ThunkAction,
    Action,
} from "@reduxjs/toolkit";

import ticketReducer from "./ticketSlice";
import HometicketReducer from "./HomeTicket";

const rootReducer = combineReducers({
    ticket: ticketReducer,
    hometicket: HometicketReducer,
});

const store = configureStore({
    reducer: rootReducer,
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
