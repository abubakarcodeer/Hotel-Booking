
import { createSlice } from '@reduxjs/toolkit';
import { getSessionUser, getSessionToken } from '../../utils/authentication';

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    timeZone: '',
    isLoading: false,
    reFetch: false,
    user: getSessionUser(),
    isAuthenticated: !!getSessionToken(),
    theme: {
      colorPrimary: '#946244',
      colorLink: '#946244'
    }
  },
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    reFetchData: (state) => {
      state.reFetch = !state.reFetch;
    },
    setAuth: (state, action) => {
      state.user = action.payload.user;
      state.isAuthenticated = action.payload.isAuthenticated;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    }
  }
});

// Action creators are generated for each case reducer function
export const { setLoading, reFetchData, setAuth, logout } = appSlice.actions;

export default appSlice.reducer;
