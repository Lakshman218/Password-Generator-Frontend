import { createSlice } from "@reduxjs/toolkit";

const userInitialState = {
  user: null,
  token: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState: userInitialState,
  reducers: {
    loginSuccuss: (state, action) => {
      state.user = action.payload.user
      state.token = action.payload.user.token
    },
    logout: (state) => {
      state.user = null
      state.token = null
    }
  }
})

export const { loginSuccuss, logout } = authSlice.actions
export default authSlice.reducer;