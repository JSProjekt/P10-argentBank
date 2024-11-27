import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./reducers/UserSlices";
import modalSlice from "./reducers/ModalSlices";

const store = configureStore({
    reducer: {
        user: userSlice,
        modal: modalSlice,
    },
});

export default store;