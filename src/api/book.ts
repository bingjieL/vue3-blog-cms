/*
 * @Description: api book
 * @Author: bjl
 * @Date: 2021-04-27 09:50:49
 * @LastEditTime: 2021-05-07 10:36:44
 * @LastEditors: bjl
 */

import request from './request';
import { baseUrl } from '@/config/url';
import { BookAddData } from '../views/book/add.vue.d';
/**
 * @description: 获取book列表
 * @param  {*}
 * @return {*}
 * @param {LoginData} params
 */
export const ApiBookGet = () => {
  return request.post(`${baseUrl}/api/book/get`, {});
};

/**
 * @description: 新增book
 * @param  {*}
 * @return {*}
 * @param {LoginData} params
 */
export const ApiBookAdd = (params: BookAddData) => {
  return request.post(`${baseUrl}/api/book/add`, params);
};

/**
 * @description: 编辑book
 * @param  {*}
 * @return {*}
 * @param {LoginData} params
 */
export const ApiBookUpdate = (params: BookAddData) => {
  return request.post(`${baseUrl}/api/book/update`, params);
};

/**
 * @description: 删除book
 * @param  {*}
 * @return {*}
 * @param {LoginData} params
 */
export const ApiBookDelete = (params: {bookId: number}) => {
  return request.post(`${baseUrl}/api/book/delete`, params);
};

/**
 * @description: 获取book详情
 * @param  {*}
 * @return {*}
 * @param {LoginData} params
 */
export const ApiBookDetail = (params: {bookId: number}) => {
  return request.post(`${baseUrl}/api/book/getById`, params);
};
