declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $Test: () => void;
  }
}

export default {
  install(app: any) {
    app.config.globalProperties.$Test = () => {
      console.log('>>>>> app.config.globalProperties', app.config.globalProperties);
    };
  },
};
