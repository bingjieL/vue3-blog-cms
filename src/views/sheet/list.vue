<template>
  <section class="bj-page">
    <page-title title="歌单列表"></page-title>
    <section class="page__action">
      <el-button type="primary" plain @click="handleAdd">添加</el-button>
    </section>
    <section class="page__content">
     <list-table 
      :tableData='data.tableData'
      @delete='handleDelete'
      @edit='handleEdit'
    >
    </list-table>
    </section>
  </section>
</template>

<script lang='ts'>
import { defineComponent, getCurrentInstance, onMounted, reactive } from 'vue';
import PageTitle from '@/components/PageTitle.vue';
import ListTable from './components/SheetTable.vue';
import { ApiSheetGet, ApiSheetDelete } from '@/api/sheet';
import { SheetListData } from './list.d';
import { useRouter } from 'vue-router';

export default defineComponent({
  components: {
    PageTitle,
    ListTable,
  },

  setup() {
    const data = reactive<SheetListData>({
      tableData: []
    })
    const router = useRouter()
    const $message = getCurrentInstance()?.appContext.config.globalProperties.$message;

    const getListData = () => {
      ApiSheetGet().then((res: any) => {
        const { rows } = res;
        data.tableData = rows;
      })
    }

    const handlePaginationChange = (page: number) => {
      getListData()
    }
    const handleDelete = (row: any) => {
      ApiSheetDelete({sheetId: row.sheetId}).then((res) => {
        $message.success('删除成功')
        getListData()
      })
    }
    const handleEdit = (row: any) => {
      router.push({
        path: '/sheet/add',
        query: {
          _bid: row.sheetId,
        }
      })
    }
    const handleAdd = () => {
      router.push('/sheet/add')
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
