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


// 异步请求登录
const fetchLogin: (loginForm: logindata) => (dispatch: Dispatch) => Promise<void> = (loginForm) => {
    return async (dispatch: Dispatch) => {
        const res = await request.post('/login', loginForm)
        dispatch(setToken(res.data.token))
    }
}

export { setToken, fetchLogin }
export default userReducer
