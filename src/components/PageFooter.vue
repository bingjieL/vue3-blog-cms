<template>
  <footer class="page__footer">
    <el-divider style="margin: 15px 0;"></el-divider>
    <el-button type="primary" @click="$emit('fix')">保存</el-button>
    <el-button @click="$emit('cancel')">取消</el-button>
  </footer>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
export default defineComponent({
  emit: ['fix', 'cancel'],
})
</script>

<style lang="scss" scoped>

</style>

