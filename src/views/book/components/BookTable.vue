<template>
  <el-table
    :data="tableData"
    stripe
    style="width: 100%">
    <el-table-column
      prop="bookId"
      label="ID"
      width="100">
    </el-table-column>
    <el-table-column
      prop="bookAuthor"
      label="作者"
      width="200">
    </el-table-column>
    
    <el-table-column
      prop="blogId"
      label="创建时间"
      width="200">
      <template #default='{row}'>
        {{ row.created_time && dateFormat(row.created_time)}}
      </template>
    </el-table-column>
    <el-table-column
      prop="blogId"
      label="更新时间"
      width="200">
      <template #default='{row}'>
        {{ row.updated_time && dateFormat(row.updated_time)}}
      </template>
    </el-table-column>
    <el-table-column
      label="图片"
      width="300">
      <template #default='{row}'>
        <img class="table__img" style="height: 50px" :src="row.bookPic" alt="">
      </template>
    </el-table-column>
    <el-table-column
      prop="bookTitle"
      label="book标题"
      min-width="500">
    </el-table-column>
    <el-table-column
      label="操作"
      width="200">
      <template #default='{row}'>
        <section class="action__wrap">
          <el-button type="primary" icon="el-icon-edit" circle @click="handleEdit(row)"></el-button>
          <el-button type="danger" icon="el-icon-delete" circle @click="handleDelete(row)"></el-button>
        </section>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang='ts'>
import { defineComponent, getCurrentInstance } from 'vue';
import { dateFormat } from '@/utils';

export default defineComponent ({
  props:['tableData'],
  emits: ['delete', 'edit'],
  setup(props, { emit }) {
    const $confirm = getCurrentInstance()?.appContext.config.globalProperties.$confirm;

    const handleEdit = (row: any) => {
      emit('edit', row)
    }
    const handleDelete = (row: any) => {
      $confirm('点击确认将删除此条记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        emit('delete', row)
      })
    }

    return {
      handleEdit,
      handleDelete,
      dateFormat: dateFormat
    }
  }
})
</script>

<style lang="scss" scoped>
.table__img {
  width: 120px;
  height: 50px;
  border: 1px dashed #ddd;
  object-fit: contain;
  object-position: center;
  padding: 4px;
  border-radius: 4px;
}
</style>
