import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./reducers/userSlices";
import modalSlice from "./reducers/modalSlices";

const store = configureStore({
    reducer: {
        user: userSlice,
        modal: modalSlice,
    },
});

export default store;