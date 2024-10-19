import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const backURL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3001';

// Action pour se connecter
export const userLogin = createAsyncThunk(
  'user/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const resp = await axios.post(
        `${backURL}/api/v1/user/login`,
        { email, password },
        { headers: { 'Content-Type': 'application/json' } }
      );

      const token = resp.data.body.token;
      localStorage.setItem('userToken', token);

      const userInfoResp = await axios.post(
        `${backURL}/api/v1/user/profile`,
        {},
        { headers: { 'Authorization': `Bearer ${token}` } }
      );

      return {
        token,
        userInfo: userInfoResp.data.body
      };
    } catch (error) {
      return rejectWithValue(error.responce?.data.message || error.message);
    }
  }
);

// État initial
const initState = {
  loading: false,
  userInfo: JSON.parse(localStorage.getItem('userInfo')) || null,
  userToken: localStorage.getItem('userToken') || null,
  error: null,
  success: false,
};

const userSlice = createSlice({
  name: 'user',
  initState,
  reducers: {
    userLogout: (state) => {
      state.userInfo = null;
      state.userToken = null;
      localStorage.removeItem('userToken');
      localStorage.removeItem('userInfo');
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.userToken = action.payload.token;
        state.userInfo = action.payload.userInfo;
        state.success = true;
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  }
});

export const { userLogout } = userSlice.actions;

export const selectUserToken = (state) => !!state.auth.userToken;
export const selectLoading = (state) => state.auth.loading;
export const selectError = (state) => state.auth.error;
export const selectUserInfo = (state) => state.auth.userInfo;

export default userSlice.reducer;