import { logindata } from "@/pages/Login";
import { request } from "@/utils";
import { Dispatch, createSlice } from "@reduxjs/toolkit";
import { setToken as _setToken, getToken } from "@/utils";

const userStore = createSlice({
    name: 'user',
    initialState: {
        token: getToken() || ''
    },
    reducers: {
        setToken(state, action) {
            state.token = action.payload
            _setToken(action.payload)
        }
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
