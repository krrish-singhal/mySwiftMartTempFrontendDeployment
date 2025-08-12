import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  loading: false,
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },
    userLogout: (state) => {
      state.user = null;
      // Clear any auth cookies by making logout request
      fetch(`${import.meta.env.VITE_BACKEND_URL}/api/userLogout`, {
        method: "GET",
        credentials: "include",
      }).catch(err => console.error("Logout error:", err));
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setUser, userLogout, setLoading, setError } = authSlice.actions;

export default authSlice.reducer;