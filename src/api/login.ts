/*
 * @Description: api login
 * @Author: bjl
 * @Date: 2021-04-27 09:50:49
 * @LastEditTime: 2021-04-27 14:42:15
 * @LastEditors: bjl
 */

import request from './request';
import { baseUrl } from '@/config/url';
import { LoginData } from '@/views/login/login.vue.d';

/**
 * @description: 登陆接口
 * @param  {*}
 * @return {*}
 * @param {LoginData} params
 */
export const Apilogin = (params: LoginData) => {
  return request.post(`${baseUrl}/api/users/login`, params);
};
