<template>
  <el-table
    :data="tableData"
    stripe
    style="width: 100%">
    <el-table-column
      prop="blogId"
      label="ID"
      width="60">
    </el-table-column>
    
    <el-table-column
      prop="blogId"
      label="创建时间"
      width="120">
      <template #default='{row}'>
        {{ row.created_time && dateFormat(row.created_time)}}
      </template>
    </el-table-column>
    <el-table-column
      prop="blogId"
      label="更新时间"
      width="120">
      <template #default='{row}'>
        {{ row.updated_time && dateFormat(row.updated_time)}}
      </template>
    </el-table-column>
    <el-table-column
      prop="blogLikes"
      label="文章类型"
      width="100">
      <template #default='{row}'>
        {{row.blog_type && row.blog_type.blogTypeTitle}}
      </template>
    </el-table-column>
    <el-table-column
      prop="blogLikes"
      label="热度"
      width="60">
    </el-table-column>
    <el-table-column
      label="图片"
      width="300">
      <template #default='{row}'>
        <img class="table__img" style="height: 50px" :src="row.blogImg" alt="">
      </template>
    </el-table-column>
    <el-table-column
      prop="blogTitle"
      label="博客标题"
      min-width="500">
    </el-table-column>
    <el-table-column
      label="状态"
      width="80">
      <template #default='{row}'>
        <el-tag v-if="row.blogStatus === 1" type='success'>已上架</el-tag>
        <el-tag v-else type='info'>已下架</el-tag>
      </template>
    </el-table-column>
    <el-table-column
      label="操作"
      width="200">
      <template #default='{row}'>
        <section class="action__wrap">
          <el-button icon="el-icon-sort" circle @click="handleChangeStatus(row)"></el-button>
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
  emits: ['changeStatus', 'delete', 'edit'],
  setup(props, { emit }) {
    const $confirm = getCurrentInstance()?.appContext.config.globalProperties.$confirm;

    const handleChangeStatus = (row: any) => {
      emit('changeStatus', row)
    }

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
      handleChangeStatus,
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
