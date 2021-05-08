<template>
  <footer class="page__footer">
    <el-divider v-if="showTopline" style="margin: 15px 0;"></el-divider>
    <el-button type="primary" @click="$emit('fix')">{{fixText}}</el-button>
    <el-button @click="$emit('cancel')">{{cancelText}}</el-button>
  </footer>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
export default defineComponent({
  props: {
    fixText: {
      type: String,
      default: '保存'
    },
    cancelText: {
      type: String,
      default: '取消'
    },
    showTopline: {
      type: Boolean,
      default: true,
    }
  },
  emit: ['fix', 'cancel'],
})
</script>

<style lang="scss" scoped>

</style>

