/*
 * @Description: api 音乐列表
 * @Author: bjl
 * @Date: 2021-04-27 09:50:49
 * @LastEditTime: 2021-05-11 17:00:04
 * @LastEditors: bjl
 */

import request from './request';
import { baseUrl } from '@/config/url';
import { MusicAddData } from '@/views/music/add.vue.d';
/**
 * @description: 获取music列表
 * @param  {*}
 * @return {*}
 * @param {LoginData} params
 */
export const ApiMusicGet = () => {
  return request.post(`${baseUrl}/api/music/get`, {});
};

/**
 * @description: 新增music
 * @param  {*}
 * @return {*}
 * @param {LoginData} params
 */
export const ApiMusicAdd = (params: MusicAddData) => {
  return request.post(`${baseUrl}/api/music/add`, params);
};

/**
 * @description: 编辑music
 * @param  {*}
 * @return {*}
 * @param {LoginData} params
 */
export const ApiMusicUpdate = (params: MusicAddData) => {
  return request.post(`${baseUrl}/api/music/update`, params);
};

/**
 * @description: 删除music
 * @param  {*}
 * @return {*}
 * @param {LoginData} params
 */
export const ApiMusicDelete = (params: {musicId: number}) => {
  return request.post(`${baseUrl}/api/music/delete`, params);
};

/**
 * @description: 获取music详情
 * @param  {*}
 * @return {*}
 * @param {LoginData} params
 */
export const ApiMusicDetail = (params: {musicId: number}) => {
  return request.post(`${baseUrl}/api/music/getById`, params);
};
