/*
 * @Description: api blogType
 * @Author: bjl
 * @Date: 2021-04-27 09:50:49
 * @LastEditTime: 2021-05-07 13:38:23
 * @LastEditors: bjl
 */

import request from './request';
import { baseUrl } from '@/config/url';
import { BlogTypeAddData } from '../views/blogType/add.vue.d';
/**
 * @description: 获取blogType列表
 * @param  {*}
 * @return {*}
 * @param {LoginData} params
 */
export const ApiBlogTypeGet = () => {
  return request.post(`${baseUrl}/api/blogType/get`, {});
};

/**
 * @description: 新增blogType
 * @param  {*}
 * @return {*}
 * @param {LoginData} params
 */
export const ApiBlogTypeAdd = (params: BlogTypeAddData) => {
  return request.post(`${baseUrl}/api/blogType/add`, params);
};

/**
 * @description: 编辑blogType
 * @param  {*}
 * @return {*}
 * @param {LoginData} params
 */
export const ApiBlogTypeUpdate = (params: BlogTypeAddData) => {
  return request.post(`${baseUrl}/api/blogType/update`, params);
};

/**
 * @description: 删除blogType
 * @param  {*}
 * @return {*}
 * @param {LoginData} params
 */
export const ApiBlogTypeDelete = (params: {blogTypeId: number}) => {
  return request.post(`${baseUrl}/api/blogType/delete`, params);
};

/**
 * @description: 获取blogType详情
 * @param  {*}
 * @return {*}
 * @param {LoginData} params
 */
export const ApiBlogTypeDetail = (params: {blogTypeId: number}) => {
  return request.post(`${baseUrl}/api/blogType/getById`, params);
};
