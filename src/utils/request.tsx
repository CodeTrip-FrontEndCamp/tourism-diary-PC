//axios封装处理
//1.根域名配置，2.超时时间，3.请求拦截器/响应拦截器
import axios from "axios";
import { getToken, removeToken } from "./token";
import router from "@/router";
import { message } from "antd";

const request = axios.create({
  baseURL: "http://47.116.215.205:3001",
  timeout: 5000,
});

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    message.error("请求发送失败");
    return Promise.reject(error);
  }
);

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    // 如果响应成功但业务状态码不是成功，也需要处理
    if (response.data && response.data.code !== 200) {
      message.error(response.data.message || "请求失败");
      return Promise.reject(new Error(response.data.message || "请求失败"));
    }
    return response.data;
  },
  (error) => {
    // 处理网络错误
    if (!error.response) {
      message.error("网络连接失败，请检查网络");
      return Promise.reject(new Error("网络连接失败"));
    }

    // 处理 HTTP 状态码错误
    switch (error.response.status) {
      case 401:
        message.error("登录已过期，请重新登录");
        removeToken();
        router.navigate("/login");
        break;
      case 403:
        message.error("没有权限访问");
        break;
      case 404:
        message.error("请求的资源不存在");
        break;
      case 500:
        message.error("服务器错误，请稍后重试");
        break;
      default:
        message.error("请求失败，请稍后重试");
    }

    return Promise.reject(error);
  }
);

export { request };
