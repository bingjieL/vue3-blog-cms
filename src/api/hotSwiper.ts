/*
 * @Description: api hotSwiper
 * @Author: bjl
 * @Date: 2021-04-27 09:50:49
 * @LastEditTime: 2021-05-07 11:17:06
 * @LastEditors: bjl
 */

import request from './request';
import { baseUrl } from '@/config/url';
import { HotSwiperAddData } from '../views/hotSwiper/add.vue.d';
/**
 * @description: 获取hotSwiper列表
 * @param  {*}
 * @return {*}
 * @param {LoginData} params
 */
export const ApiHotSwiperGet = () => {
  return request.post(`${baseUrl}/api/hotSwiper/get`, {});
};

/**
 * @description: 新增hotSwiper
 * @param  {*}
 * @return {*}
 * @param {LoginData} params
 */
export const ApiHotSwiperAdd = (params: HotSwiperAddData) => {
  return request.post(`${baseUrl}/api/hotSwiper/add`, params);
};

/**
 * @description: 编辑hotSwiper
 * @param  {*}
 * @return {*}
 * @param {LoginData} params
 */
export const ApiHotSwiperUpdate = (params: HotSwiperAddData) => {
  return request.post(`${baseUrl}/api/hotSwiper/update`, params);
};

/**
 * @description: 删除hotSwiper
 * @param  {*}
 * @return {*}
 * @param {LoginData} params
 */
export const ApiHotSwiperDelete = (params: {hotId: number}) => {
  return request.post(`${baseUrl}/api/hotSwiper/delete`, params);
};

/**
 * @description: 获取hotSwiper详情
 * @param  {*}
 * @return {*}
 * @param {LoginData} params
 */
export const ApiHotSwiperDetail = (params: {hotId: number}) => {
  return request.post(`${baseUrl}/api/hotSwiper/getById`, params);
};
