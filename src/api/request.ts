/*
 * @Description: axios 封装
 * @Author: bjl
 * @Date: 2021-04-25 17:16:10
 * @LastEditTime: 2021-05-06 17:17:12
 * @LastEditors: bjl
 */

import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosError,
  AxiosResponse,
} from 'axios';

import { ElMessage, ElLoading } from 'element-plus';
import store from '@/store';
import router from '@/router';


let loadingInstance: any = null;
let loadingInstanceSum: number = 0;

const axiosInstance: AxiosInstance = axios.create({
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    loadingInstance =  ElLoading.service({
      lock: true,
      text: '加载中...',
      spinner: 'el-icon-loading',
      background: 'rgba(250, 250, 250, 0.1)',
      customClass: 'bj-loading',
    });
    loadingInstanceSum += 1;
    const userData: any = window.localStorage.getItem('bj_blog_userData');
    if (userData) {
      config.headers.Authorization = `Bearer ${JSON.parse(userData).token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    loadingInstanceSum = 0;
    loadingInstance.close();
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (respone: AxiosResponse) => {
    loadingInstanceSum -= 1;
    if ( loadingInstanceSum === 0) {
      loadingInstance.close();
    }
    return respone;
  },
  (error: AxiosError) => {
    loadingInstanceSum = 0;
    loadingInstance.close();
    if (error && error instanceof Object && error.response) {
      if (error.response.status === 401) {
        window.localStorage.removeItem('bj_blog_userData');
        ElMessage.error('～ 登陆状态已过期, 请重新登陆！ ～');
        store.commit('userInfo/changeUserInfo', { isLogin: false });
        router.push('/login');
      } else {
        ElMessage.error('～ 服务异常,请稍后再试 ～');
      }
    } else {
      ElMessage.error('～ 服务异常,请稍后再试 ～');
    }
    return Promise.reject(error);
  },
);

class Request {
  private readonly axiosInstance = axiosInstance;
  public responeCb(res: AxiosResponse, reslove: any, reject: any ) {
    const { code, message } = res.data;
    if (code === 200) {
      reslove(res.data.data);
    } else {
      ElMessage.error(message);
      reject(res.data);
    }
  }
  public get(url: string, params?: any, headers?: any) {
    return new Promise((resolve, reject) => {
      this.axiosInstance.get(url, { params, headers })
      .then((res: AxiosResponse) => {
        this.responeCb(res, resolve, reject);
      })
      .catch((err: AxiosError) => {
        reject(err);
      });
    });
  }
  public post(url: string, data?: any, headers?: any) {
    return new Promise(( resolve, reject) => {
      this.axiosInstance.post(url, data, { headers })
      .then((res: AxiosResponse) => {
        this.responeCb(res, resolve, reject);
      })
      .catch((err: AxiosError) => {
        reject(err);
      });
    });
  }
}

export default new Request();
