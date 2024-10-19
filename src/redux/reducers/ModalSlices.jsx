import { createSlice } from '@reduxjs/toolkit';

const iniState = {
  modalOpen: false,
};

const modalSlice = createSlice({
  name: 'modal',
  iniState,
  reducers: {
    openModal: (state) => {
      state.modalOpen = true;
    },
    closeModal: (state) => {
      state.modalOpen = false;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export const selectModalOpen = (state) => state.modal.modalOpen;

export default modalSlice.reducer;