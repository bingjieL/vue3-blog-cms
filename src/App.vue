<template>
  <router-view/>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect, Ref, getCurrentInstance, watch} from 'vue';
import { useTest } from '@/useHook/useTest';

export default defineComponent({
  name: 'App',
  data() {
    return {
      testNumber: 1,
    }
  },
  setup() {
    
    const vm = getCurrentInstance()
    console.log('vm', vm)
  },
  
}) 
</script>

<style lang="scss">
body,html {
  width: 100%;
  height: 100%;
  #app {
    width: 100%;
    height: 100%;
  }
}
</style>
