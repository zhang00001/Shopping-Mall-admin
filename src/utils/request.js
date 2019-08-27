import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '../store'
import router from './../router'
import qs from "qs"
// 创建axios实例

const service = axios.create({
    baseURL: process.env.BASE_API, // api的base_url
    timeout: 15000, // 请求超时时间,
    // withCredentials: true,
    // changeOrigin: true,
})

// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
// request拦截器
service.interceptors.request.use(config => {

    if (config.method === 'post') {
        config.data = qs.stringify(config.data);
    }
    if (sessionStorage.getItem("token")) {
        config.headers.token = sessionStorage.getItem("token")

    }
    return config
}, error => {

    console.log(error) // for debug
    Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
    response => {
        /**
         * code为非0是抛错 可结合自己业务进行修改
         */

        const res = response.data
        if (response.status !== 200) {

            Message({
                message: res.msg,
                type: 'error',
                duration: 3 * 1000
            })

            // 401:未登录;
            if (res.code === 401 || res.code === 403) {
                MessageBox.alert('登录过期，请重新登录', {
                    confirmButtonText: '重新登录',
                    type: 'warning'
                }).then(() => {

                    window.location = '/login';
                    localStorage.clear();
                    location.reload()

                })
            }
            return Promise.reject('error')
        } else {

            if (response.data.code == 401) {
                MessageBox.alert('登录过期，请重新登录', {
                    confirmButtonText: '重新登录',
                    type: 'warning'
                }).then(() => {

                    window.location = '/login';
                    sessionStorage.clear();
                    location.reload()

                })
                return
            } else {
                return response.data
            }


        }

    },
    error => {


        return Promise.reject(error)



    }
)

export default service