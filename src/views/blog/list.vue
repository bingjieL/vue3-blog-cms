<template>
  <section class="bj-page">
    <page-title title="博客列表"></page-title>
    <section class="page__action">
      <el-button type="primary" plain @click="handleAdd">添加</el-button>
    </section>
    <section class="page__content">
     <list-table 
      :tableData='data.tableData'
      @changeStatus='handleChangeStatus'
      @delete='handleDelete'
      @edit='handleEdit'
    >
    </list-table>
    </section>
    <pagination v-model="data.paginationData" @change='handlePaginationChange'></pagination>
  </section>
</template>

<script lang='ts'>
import { defineComponent, getCurrentInstance, onMounted, reactive } from 'vue';
import PageTitle from '@/components/PageTitle.vue';
import Pagination from '@/components/Pagination.vue';
import ListTable from './components/BlogTable.vue';
import { ApiGetDelete, ApiGetBlog, ApiGetBlogChangeStatus } from '@/api/blog';

import { BlogListData } from './list.d';
import { useRouter } from 'vue-router';

export default defineComponent({
  components: {
    PageTitle,
    Pagination,
    ListTable,
  },

  setup() {
    const data = reactive<BlogListData>({
      paginationData: {
        page: 1,
        tatol: 0,
      },
      tableData: []
    })
    const router = useRouter()
    const $message = getCurrentInstance()?.appContext.config.globalProperties.$message;

    const getListData = () => {
      ApiGetBlog({pageNumber: data.paginationData.page}).then((res: any) => {
        const { count, rows } = res;
        data.tableData = rows;
        data.paginationData.tatol = count;
      })
    }

    const handlePaginationChange = (page: number) => {
      getListData()
    }
    const handleChangeStatus = (row: any) => {
      ApiGetBlogChangeStatus({blogId: row.blogId, blogStatus: row.blogStatus === 1 ? 2 : 1 }).then((res: any) => {
        $message.success('状态切换成功')
        getListData()
      })
    }
    const handleDelete = (row: any) => {
      ApiGetDelete({blogId: row.blogId}).then((res) => {
        $message.success('删除成功')
        getListData()
      })
    }
    const handleEdit = (row: any) => {
      router.push({
        path: '/blog/add',
        query: {
          _bid: row.blogId,
        }
      })
    }
    const handleAdd = () => {
      router.push('/blog/add')
    } 
    
    const init = () => {
      getListData()
    }
    onMounted(() => {
      init()
    })
    return {
      data,
      handlePaginationChange,
      handleChangeStatus,
      handleDelete,
      handleEdit,
      handleAdd,

    }
  },
  

})
</script>

<style lang="scss" scoped>
.bj-page {
  height: 100%;
  display: flex;
  flex-direction: column;
  .page__content {
    flex: 1;
    overflow-y: auto;
  }
  .page__action {
    text-align: right;
    padding-bottom: 15px;
  }

}
</style>
