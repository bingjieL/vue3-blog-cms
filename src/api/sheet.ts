/*
 * @Description: 歌单
 * @Author: bjl
 * @Date: 2021-04-27 09:50:49
 * @LastEditTime: 2021-05-07 11:38:35
 * @LastEditors: bjl
 */

import request from './request';
import { baseUrl } from '@/config/url';
import { SheetAddData } from '../views/sheet/add.vue.d';
/**
 * @description: 获取sheet列表
 * @param  {*}
 * @return {*}
 * @param {LoginData} params
 */
export const ApiSheetGet = () => {
  return request.post(`${baseUrl}/api/sheet/get`, {});
};

/**
 * @description: 新增sheet
 * @param  {*}
 * @return {*}
 * @param {LoginData} params
 */
export const ApiSheetAdd = (params: SheetAddData) => {
  return request.post(`${baseUrl}/api/sheet/add`, params);
};

/**
 * @description: 编辑sheet
 * @param  {*}
 * @return {*}
 * @param {LoginData} params
 */
export const ApiSheetUpdate = (params: SheetAddData) => {
  return request.post(`${baseUrl}/api/sheet/update`, params);
};

/**
 * @description: 删除sheet
 * @param  {*}
 * @return {*}
 * @param {LoginData} params
 */
export const ApiSheetDelete = (params: {sheetId: number}) => {
  return request.post(`${baseUrl}/api/sheet/delete`, params);
};

/**
 * @description: 获取sheet详情
 * @param  {*}
 * @return {*}
 * @param {LoginData} params
 */
export const ApiSheetDetail = (params: {sheetId: number}) => {
  return request.post(`${baseUrl}/api/sheet/getById`, params);
};
