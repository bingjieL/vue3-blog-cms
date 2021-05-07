<template>
     <el-menu
      :uniqueOpened="true"
      :default-active="defaultPath"
      class="bj-nav"
      router
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <template v-for="item in navData" :key="item.path">
        <el-submenu :index="item.path" v-if="item.children && item.children.length > 1">
          <template #title>
            <i v-if="item.meta && item.meta.icon" :class="item.meta.icon"></i>
            <span>{{item.meta && item.meta.title}}</span>
          </template>
          <el-menu-item v-for="_item in item.children" :index="_item.path" :key="_item.path">
            {{_item.meta && _item.meta.title}}
          </el-menu-item>
        </el-submenu>
        <el-menu-item :index="item.children[0].path" v-else>
          <i class="el-icon-menu"></i>
          <template #title>{{item.children[0].meta && item.children[0].meta.title}}</template>
        </el-menu-item>
      </template>
    </el-menu>
</template>

<script lang='ts'>
import { computed, defineComponent, ref, watch } from 'vue';
import router from '@/router';
import { RouteRecordRaw, useRoute } from 'vue-router';

export default defineComponent ({
  setup() {
    const routes = router.options.routes;
    const route = useRoute();
    const defaultPath = ref<string>(route.path)

    watch(
      () => route.path,
      (val: string) => {
        defaultPath.value = val;
      }
    )
    const navData = computed<RouteRecordRaw[]>(()=> {
      const routeFilter = (route: RouteRecordRaw[]) => {
        return route.filter((item: RouteRecordRaw) => {
          if (item.children && item.children instanceof Array) {
            item.children = routeFilter(item.children);
          }
          return !item.meta || !item.meta.isHidden;
        })
      }
      return routeFilter(routes)
    })
    return {
      navData,
      defaultPath,
    }
  }
  
}) 
</script>

<style lang="scss" scoped>
  .bj-nav {
    overflow-y: auto;
    width: 100%;
  }
</style>
