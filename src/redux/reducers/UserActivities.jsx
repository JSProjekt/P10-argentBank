import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

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
      return rejectWithValue(error.response?.data.message || error.message);
    }
  }
);

// Action pour récupérer les informations utilisateur
export const getUser = createAsyncThunk(
  'user/getUser',
  async (_, { rejectWithValue, getState }) => {
    try {
      const { userToken } = getState().auth;

      if (!userToken) {
        throw new Error('User token is missing');
      }

      const response = await axios.post(
        `${backURL}/api/v1/user/profile`,
        {},
        { headers: { 'Authorization': `Bearer ${userToken}` } }
      );

      return response.data.body;

    } catch (error) {
      return rejectWithValue(error.response?.data.message || error.message);
    }
  }
);

// Action pour mettre à jour les informations utilisateur
export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (userData, { rejectWithValue, getState }) => {
    try {
      const { userToken } = getState().auth;

      if (!userToken) {
        throw new Error('User token is missing');
      }

      const response = await axios.put(
        `${backURL}/api/v1/user/profile`,
        userData,
        { headers: { 'Authorization': `Bearer ${userToken}`, 'Content-Type': 'application/json' } }
      );

      localStorage.setItem('userInfo', JSON.stringify(response.data.body));

      return response.data.body;

    } catch (error) {
      return rejectWithValue(error.response?.data.message || error.message);
    }
  }
);