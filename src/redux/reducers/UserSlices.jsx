import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const backURL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3001';

// État initial
const initialState = {
  loading: false,
  userInfo: JSON.parse(localStorage.getItem('userInfo')) || null,
  userToken: localStorage.getItem('userToken') || null,
  error: null,
  success: false,
};

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
      console.log('token', token);
      const userInfoResp = await axios.get(
        `${backURL}/api/v1/user/profile`,
        { headers: { 'Authorization': `Bearer ${token}` } }
      );

      localStorage.setItem('userInfo', JSON.stringify(userInfoResp.data.body));

      return {
        token,
        userInfo: userInfoResp.data.body
      };
    } catch (error) {
      return rejectWithValue(error.response?.data.message || error.message);
    }
  }
);

export const userUpdate = createAsyncThunk(
  'user/userUpdate',
  async (userData, { rejectWithValue, getState }) => {
    try {
      const token = getState().user.userToken;
      if (!token) {
        return rejectWithValue('User not logged in');
      }

      const resp = await axios.put(
        `${backURL}/api/v1/user/profile`,
        userData,
        { headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' } }
      );

      localStorage.setItem('userInfo', JSON.stringify(resp.data.body));

      return resp.data.body;
    }
    catch (error) {
      return rejectWithValue(error.responce?.data.message || error.message);
    }
  }
);

export const getUserInfo = createAsyncThunk(
  'user/getUserInfo',
  async (_, { rejectWithValue, getState }) => {
    try {
      const token = getState().user.userToken;
      if (!token) {
        throw new Error('User not logged in');
      }

      const resp = await axios.get(
        `${backURL}/api/v1/user/profile`,
        {},
        { headers: { 'Authorization': `Bearer ${token}` } }
      );

      return resp.data.body;

    } catch (error) {
      return rejectWithValue(error.responce?.data.message || error.message);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userLogout: (state) => {
      state.userInfo = null;
      state.userToken = null;
      localStorage.removeItem('userToken');
      localStorage.removeItem('userInfo');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
        state.error = null;

      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.userToken = action.payload.token;
        state.userInfo = action.payload.userInfo;
        state.userToken = action.payload.token;
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        localStorage.removeItem('userToken');
        localStorage.removeItem('userInfo');
      })
      .addCase(userUpdate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userUpdate.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
      })
      .addCase(userUpdate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getUserInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
        state.userToken = null;
        localStorage.removeItem('userToken');
      })
      .addCase(getUserInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { userLogout } = userSlice.actions;
export const selectUserInfo = (state) => state.user.userInfo;
export const selectUserToken = (state) => !!state.user.userToken;
export const selectLoading = (state) => state.user.loading;
export const selectError = (state) => state.user.error;



export default userSlice.reducer;