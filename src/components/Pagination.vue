<template>
  <section class="bj-pagination">
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-size="10"
      layout="total, prev, pager, next, jumper"
      :total="modelValue.tatol">
    </el-pagination>
  </section>
  
</template>

<script lang='ts'>
import { defineComponent, ref, toRefs, watch, PropType, nextTick } from 'vue';

export interface PaginationData {
  page: number;
  tatol: number;
}

export default defineComponent ({
  emits: ['change', 'update:modelValue'],
  props: {
    modelValue: {
      type: Object as PropType<PaginationData>,
      default: { page: 1, tatol: 0}
    }
    
  },
  setup(props, { emit }) {
    const currentPage = ref<number>(1);
    const { modelValue } = toRefs< {modelValue:PaginationData}>(props);
    watch(
      () => modelValue.value,
      (val: PaginationData) => {
        if (val.page !== currentPage.value) {
          currentPage.value = val.page
        }
      }, {
        immediate: true,
        deep: true,
      }
    )
    watch(
      () => currentPage.value,
      (val: number) => {
        if (val !== modelValue.value.page) {
          const newPaginationData = {
            tatol: modelValue.value.tatol,
            page: val
          }
          emit('update:modelValue', newPaginationData)
        }
      }
    )
    const handleCurrentChange = (page: number) => {
      currentPage.value = page;
      nextTick(() => {
        emit('change', page)
      })
    }
    return {
      handleCurrentChange,
      currentPage,
    }
  }
})
</script>

<style lang="scss" scoped>
.bj-pagination {
  text-align: right;
  padding: 15px 0;
}
</style>
