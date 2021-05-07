/*
 * @Description: vue.config.js
 * @Author: bjl
 * @Date: 2021-04-25 17:46:25
 * @LastEditTime: 2021-04-25 17:47:44
 * @LastEditors: bjl
 */
const path = require('path');

module.exports = {
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "scss",
      patterns: [
        path.resolve(__dirname, "src/assets/scss/variables.scss"),
        path.resolve(__dirname, "src/assets/scss/mixins.scss"),
      ],
    },
  },
}


