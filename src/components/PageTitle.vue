<template>
  <h3 class="bj-title">
    {{title}}
  </h3>
</template>

<script lang='ts'>
import { defineComponent  } from 'vue';
export default defineComponent({
  props: ['title']
})
</script>

<style lang="scss" scoped>
.bj-title {
  padding-bottom: 25px !important;
}
</style>

