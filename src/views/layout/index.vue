<!--
 * @Description: Layout
 * @Author: bjl
 * @Date: 2021-04-25 16:35:13
 * @LastEditTime: 2021-04-30 13:53:21
 * @LastEditors: bjl
-->

<template>
  <section class="bj-layout">
    <header class="bj-header">
      <layout-header></layout-header>
    </header>
    <section class="bj-main-wrap">
      <layout-nav class="bj-nav"></layout-nav>
      <main class="bj-main">
        <router-view></router-view>
      </main>
    </section>
  </section>
</template>

<script lang='ts'>
import LayoutNav from './components/LayoutNav.vue';
import LayoutHeader from './components/LayoutHeader.vue';
import { onMounted } from '@vue/runtime-core';
import { useStore } from 'vuex';

export default {
  components: {
    LayoutNav,
    LayoutHeader,
  },
  setup() {
    const store = useStore();
    
    const initUserInfo = () => {
      try {
        let storage = localStorage.getItem('bj_blog_userData')
        storage = storage && JSON.parse(storage);
        store.commit('userInfo/changeUserInfo', storage);
      } catch (error) {
      }
    }
    
    onMounted(() => {
      initUserInfo()
    })
    
  }
}
</script>

<style lang="scss" scoped>
  .bj-layout {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    .bj-header {
      width: 100%;
      height: $main-header-height;
    }
    .bj-main-wrap {
      flex: 1;
      overflow: hidden;
      display: flex;
      .bj-nav {
        width: $main-nav-width;
        height: 100%;
      }
      .bj-main {
        overflow-y: auto;
        position: relative;
        margin: 15px;
        flex: 1;
        padding: 15px;
        box-shadow:0 0px 20px 3px rgba(0,0,0, .1);
        border-radius: 4px;
        // background: #fafafa;
      }
    }
  }
</style>