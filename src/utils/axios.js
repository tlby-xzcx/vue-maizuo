import axios from "axios";
import { Toast } from "vant"
import router from "../router";

let baseURL = "http://localhost:3000"
let token = "";
// let baseURL = axios.defaults.baseURL;
axios.defaults.headers.common['token'] = token;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';


function loading() {
    Toast.loading({
        message: '加载中...',
        forbidClick: true,
    });
}

function fail(msg) {
    Toast.fail(msg);
}

function success(msg) {
    Toast.success(msg);
}

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 发送请求之前
    token = sessionStorage.token || token;
    config.headers.token = token;//客户端发送token到服务端
    // console.log(config)
    loading()
    return config;
}, function (error) {
    // 发送请求失败
    fail("请求失败！")
    return Promise.reject(error);
});

// 服务器端到客户端
axios.interceptors.response.use(function (response) {
    // 响应成功
    if (response.data.type == 1) {//1表示成功，0表示失败，没有type就直接成功
        success(response.data.msg || "响应成功")
    } else {
        if (response.data.type == 0) {
            fail(response.data.msg || "失败...")
        } else {
            success(response.data.msg || "响应成功")
        }
    }

    if (response.data.code == '3000') {
        router.push({ name: "login" })
    }

    return response;
}, function (error) {
    // 响应失败
    fail("响应失败")
    return Promise.reject(error);
});

export { axios, baseURL }