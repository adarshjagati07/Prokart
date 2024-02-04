//only to set user credentials to local storage and remove them.
//we are not dealing with any API and endpoints over here.
import { createSlice } from "@reduxjs/toolkit";

//firstly check if there is userinfo if not then we'll set it to null.
const initialState = {
	userInfo: localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setCredentials: (state, action) => {
			state.userInfo = action.payload;
			localStorage.setItem("userInfo", JSON.stringify(action.payload));
		},
		logout: (state, action) => {
			state.userInfo = null;
			localStorage.removeItem("userInfo");
		}
	}
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
