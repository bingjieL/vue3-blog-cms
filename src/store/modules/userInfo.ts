

const userInfo = {
  namespaced: true,
  state: {
    isLogin: false,
    token: null,
    userName: null,
  },
  actions: {

  },
  mutations: {
    changeUserInfo(state: any, params: any) {
      console.log('tst')
      Object.assign(state, params);
    },
  },
};

export default userInfo;
