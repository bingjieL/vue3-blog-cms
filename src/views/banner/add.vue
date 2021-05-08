<template>
  <section class="bj-page">
    <page-title :title="data.pagetype === 'add' ? 'Banner Add' : 'Banner Edit'"></page-title>
    <section class="page-content">
      <el-form :model="data.addData" :rules="rules" :ref="(el) =>  addFormRef = el" label-position='left' label-width="100px" class="page-form">
        <el-form-item label="banner标题" prop="bannerTitle">
          <el-input v-model="data.addData.bannerTitle" placeholder='banner标题'></el-input>
        </el-form-item>
        <el-form-item label="banner小图" prop="bannerImg">
          <upload v-model="data.addData.bannerImg" placeholder='banner小图'></upload>
        </el-form-item>
      </el-form>
    </section>
    <page-footer @fix="handleSave" @cancel="handleCancel"></page-footer>
  </section>
</template>

<script lang='ts'>
import { defineComponent, onMounted, reactive, ref, getCurrentInstance } from 'vue';
import Upload from '@/components/Upload.vue';
import PageTitle from '@/components/PageTitle.vue';
import PageFooter from '@/components/PageFooter.vue';
import { BannerData } from './add.vue.d'
import { ElForm } from 'element-plus';
import { useRoute, useRouter } from 'vue-router';
import { ApiBannerDetail, ApiBannerUpdate, ApiBannerAdd } from '@/api/banner';

export default defineComponent({
  components: {
    Upload,
    PageTitle,
    PageFooter,
  },
  setup() {
    const rules = {
      bannerTitle:  [
        { required: true, message: '请输入banner标题', trigger: 'change' }
      ],
      
      bannerImg:  [
        { required: true, message: '请上传banner小图', trigger: 'change' }
      ],
    }

    const route = useRoute()
    const router = useRouter();
    const $message = getCurrentInstance()?.appContext.config.globalProperties.$message;
    
    const addFormRef = ref<typeof ElForm | null>(null)

    const data = reactive<BannerData>({
      addData: {
        bannerTitle: null,
        bannerImg: '',
      },
      pagetype: 'add',
    })

    const goList = () => {
      const timer = setTimeout(() => {
        router.push('/banner/list')
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
      ApiBannerDetail({bannerId: Number(_bid)}).then((res: any) => {
        console.log('res', res)
        data.addData = res;
      })
    }

    const bannerSave = () => {
      ApiBannerAdd(data.addData).then((res: any) => {
        $message.success('保存成功')
        goList()
      })
    }
    const bannerUpdate = () => {
      ApiBannerUpdate(data.addData).then((res: any) => {
        $message.success('更新成功')
        goList()
      })
    }

    const handleSave = () => {
      addFormRef.value!.validate((validate: boolean) => {
        if (validate) {
          if (data.pagetype === 'add') {
            bannerSave()
          } else {
            bannerUpdate()
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
