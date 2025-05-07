import { logindata } from "@/pages/Login";
import { request } from "@/utils";
import { Dispatch, createSlice } from "@reduxjs/toolkit";

const userStore = createSlice({
    name: 'user',
    initialState: {
        token: ''
    },
    reducers: {
        setToken(state, action) {
            state.token = action.payload
        }//同步修改
    }
})

const { setToken } = userStore.actions

const userReducer = userStore.reducer

export { setToken}
export default userReducer
