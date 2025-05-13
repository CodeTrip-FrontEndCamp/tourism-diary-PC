import { createSlice } from "@reduxjs/toolkit";
import { getProfileAPI, loginAPI } from "@/apis/user";
import { message } from "antd";
import { Dispatch } from "redux";
import { logindata } from "@/pages/Login";

interface UserState {
  token: string;
  userInfo: {
    name: string;
    role: string;
    [key: string]: any;
  };
  role: string;
}

const initialState: UserState = {
  token: localStorage.getItem("token_key") || "",
  userInfo: {
    name: "",
    role: "",
  },
  role: localStorage.getItem("user_role") || "",
};

const userStore = createSlice({
  name: "user",
  initialState,
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
      localStorage.setItem("token_key", action.payload);
    },
    setUserInfo(state, action) {
      state.userInfo = action.payload;
    },
    setUserRole(state, action) {
      state.role = action.payload;
      localStorage.setItem("user_role", action.payload);
    },
    clearUserInfo(state) {
      state.token = "";
      state.userInfo = initialState.userInfo;
      state.role = "";
      localStorage.removeItem("token_key");
      localStorage.removeItem("user_role");
    },
  },
});

const { setToken, setUserInfo, setUserRole, clearUserInfo } = userStore.actions;

const userLogin = (loginForm: logindata) => {
  return async (dispatch: Dispatch) => {
    try {
      const res = await loginAPI(loginForm);
      dispatch(setToken(res.data.token));
      dispatch(setUserRole(loginForm.role));
      message.success("登录成功");
    } catch (error) {
      message.error("登录失败");
      return Promise.reject(error);
    }
  };
};

const getProfile = () => {
  return async (dispatch: Dispatch) => {
    try {
      const res = await getProfileAPI();
      dispatch(setUserInfo(res.data));
    } catch (error) {
      message.error("获取用户信息失败");
      return Promise.reject(error);
    }
  };
};

const userLogout = () => {
  return (dispatch: Dispatch) => {
    dispatch(clearUserInfo());
    message.success("退出成功");
  };
};

export { userLogin, getProfile, userLogout };
export default userStore.reducer;
