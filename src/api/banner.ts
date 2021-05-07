/*
 * @Description: api banner
 * @Author: bjl
 * @Date: 2021-04-27 09:50:49
 * @LastEditTime: 2021-05-07 10:36:44
 * @LastEditors: bjl
 */

import request from './request';
import { baseUrl } from '@/config/url';
import { BannerAddData } from '../views/banner/add.vue.d';
/**
 * @description: 获取banner列表
 * @param  {*}
 * @return {*}
 * @param {LoginData} params
 */
export const ApiBannerGet = () => {
  return request.post(`${baseUrl}/api/banner/get`, {});
};

/**
 * @description: 新增banner
 * @param  {*}
 * @return {*}
 * @param {LoginData} params
 */
export const ApiBannerAdd = (params: BannerAddData) => {
  return request.post(`${baseUrl}/api/banner/add`, params);
};

/**
 * @description: 编辑banner
 * @param  {*}
 * @return {*}
 * @param {LoginData} params
 */
export const ApiBannerUpdate = (params: BannerAddData) => {
  return request.post(`${baseUrl}/api/banner/update`, params);
};

/**
 * @description: 删除banner
 * @param  {*}
 * @return {*}
 * @param {LoginData} params
 */
export const ApiBannerDelete = (params: {bannerId: number}) => {
  return request.post(`${baseUrl}/api/banner/delete`, params);
};

/**
 * @description: 获取banner详情
 * @param  {*}
 * @return {*}
 * @param {LoginData} params
 */
export const ApiBannerDetail = (params: {bannerId: number}) => {
  return request.post(`${baseUrl}/api/banner/getById`, params);
};
