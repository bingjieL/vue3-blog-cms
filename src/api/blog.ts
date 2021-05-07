/*
 * @Description: api blog
 * @Author: bjl
 * @Date: 2021-04-27 09:50:49
 * @LastEditTime: 2021-05-06 18:29:04
 * @LastEditors: bjl
 */

import request from './request';
import { baseUrl } from '@/config/url';
import { BlogAddData } from '@/views/blog/add.vue.d';

/**
 * @description: 获取博客
 * @param  {*}
 * @return {*}
 * @param {LoginData} params
 */
export const ApiGetBlog = (params: {pageNumber: number}) => {
  return request.post(`${baseUrl}/api/blog/get`, params);
};

/**
 * @description:新增博客
 * @param  {*}
 * @return {*}
 * @param {object} params
 */
export const ApiGetAdd = (params: BlogAddData) => {
  return request.post(`${baseUrl}/api/blog/add`, params);
};

/**
 * @description: 删除博客
 * @param  {*}
 * @return {*}
 * @param {object} params
 */
export const ApiGetDelete = (params: {blogId: number}) => {
  return request.post(`${baseUrl}/api/blog/delete`, params);
};

/**
 * @description: 编辑博客
 * @param  {*}
 * @return {*}
 * @param {object} params
 */
export const ApiGetUpdate = (params: BlogAddData) => {
  return request.post(`${baseUrl}/api/blog/update`, params);
};

/**
 * @description: 详情
 * @param  {*}
 * @return {*}
 * @param {object} params
 */
export const ApiGetBlogById = (params: {blogId: number}) => {
  return request.post(`${baseUrl}/api/blog/getById`, params);
};



/**
 * @description: 改变状态
 * @param  {*}
 * @return {*}
 * @param {object} params
 */
export const ApiGetBlogChangeStatus = (params: {blogId: number, blogStatus: number}) => {
  return request.post(`${baseUrl}/api/blog/changeStatus`, params);
};
