/*
 * @Description: api common 公共Api
 * @Author: bjl
 * @Date: 2021-04-27 09:50:49
 * @LastEditTime: 2021-05-12 14:08:28
 * @LastEditors: bjl
 */

import request from './request';
import { baseUrl } from '@/config/url';

/**
 * @description: 上传图片接口
 * @param  {*}
 * @return {*}
 * @param {LoginData} params
 */
export const ApiUploadImg = (params: FormData) => {
  return request.post(`${baseUrl}/api/upFiles`, params);
};

/**
 * @description: 上传Mp3
 * @param  {*}
 * @return {*}
 * @param {LoginData} params
 */
export const ApiUploadMp3 = (params: FormData) => {
  return request.post(`${baseUrl}/api/upFilesMP3`, params);
};
