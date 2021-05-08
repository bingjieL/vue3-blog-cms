<template>
  <section class="bj-page">
    <page-title :title="data.pagetype === 'add' ? '类型 Add' : '类型 Edit'"></page-title>
    <section class="page-content">
      <el-form :model="data.addData" :rules="rules" :ref="(el) =>  addFormRef = el" label-position='left' label-width="100px" class="page-form">
        <el-form-item label="类型标题" prop="blogTypeTitle">
          <el-input v-model="data.addData.blogTypeTitle" placeholder='类型标题'></el-input>
        </el-form-item>
      </el-form>
    </section>
    <page-footer @fix="handleSave" @cancel="handleCancel"></page-footer>
  </section>
</template>

<script lang='ts'>
import { defineComponent, onMounted, reactive, ref, getCurrentInstance } from 'vue';
import PageTitle from '@/components/PageTitle.vue';
import PageFooter from '@/components/PageFooter.vue';
import { BlogTypeData } from './add.vue.d'
import { ElForm } from 'element-plus';
import { useRoute, useRouter } from 'vue-router';
import { ApiBlogTypeDetail, ApiBlogTypeUpdate, ApiBlogTypeAdd } from '@/api/blogType';

export default defineComponent({
  components: {
    PageTitle,
    PageFooter,
  },
  setup() {
    const rules = {
      blogTypeTitle:  [
        { required: true, message: '请输入blogType标题', trigger: 'change' }
      ],
    }

    const route = useRoute()
    const router = useRouter();
    const $message = getCurrentInstance()?.appContext.config.globalProperties.$message;
    
    const addFormRef = ref<typeof ElForm | null>(null)

    const data = reactive<BlogTypeData>({
      addData: {
        blogTypeTitle: null,
      },
      pagetype: 'add',
    })

    const goList = () => {
      const timer = setTimeout(() => {
        router.push('/blogType/list')
        clearInterval(timer)
      }, 200);
    }

    const initDetailData = () => {
      const { _bid } = route.query;
      if (!_bid) {
        data.pagetype = 'add'
        return;
      } else {
        data.pagetype = 'edit'
      }
      ApiBlogTypeDetail({blogTypeId: Number(_bid)}).then((res: any) => {
        console.log('res', res)
        data.addData = res;
      })
    }

    const blogTypeSave = () => {
      ApiBlogTypeAdd(data.addData).then((res: any) => {
        $message.success('保存成功')
        goList()
      })
    }
    const blogTypeUpdate = () => {
      ApiBlogTypeUpdate(data.addData).then((res: any) => {
        $message.success('更新成功')
        goList()
      })
    }

    const handleSave = () => {
      addFormRef.value!.validate((validate: boolean) => {
        if (validate) {
          if (data.pagetype === 'add') {
            blogTypeSave()
          } else {
            blogTypeUpdate()
          }
        }
      })
      
    }
    const handleCancel = () => {
      goList()
    } 

    onMounted(() => {
      initDetailData()
    })

    return {
      data,
      rules,
      addFormRef,
      handleSave,
      handleCancel,
    }
  },
})
</script>

<style lang="scss" scoped>
.bj-page {
  display: flex;
  height: 100%;
  flex-direction: column;
  .bj-title {
    padding-bottom: 15px;
  }
  .page-content {
    flex: 1;
    overflow-y: auto;
    padding-right: 40px;
    :deep(.el-textarea){
      width: 60%;
    }
    :deep(.el-input) {
      width: 30%;
      min-width: 140px;
    }
    :deep(.el-select) {
      width: 30%;
      min-width: 140px;
      .el-input {
        width: 100%;
      }
    }
  }
}
</style>
