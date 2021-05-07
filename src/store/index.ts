import { createStore } from 'vuex';

/**
 * @description: 动态引入vuex moudels
 * @param  {*}
 * @return {*}
 * @param {*} modulesFiles
 */

const modulesFiles = require.context('./modules', false, /.ts$/);
const modules = modulesFiles.keys().reduce(( modules: any, modulePath: string) => {
  const moduleName = modulePath.replace(/^.\/(.*)\.ts/, '$1');
  const value = modulesFiles(modulePath);
  modules[moduleName] = value.default || value;
  return modules;
}, {});

export default createStore({
  modules,
  state: {
  },
  mutations: {
  },
  actions: {
  },
});
