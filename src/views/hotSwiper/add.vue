<template>
  <section class="bj-page">
    <page-title :title="data.pagetype === 'add' ? '热门项目 Add' : '热门项目 Edit'"></page-title>
    <section class="page-content">
      <el-form :model="data.addData" :rules="rules" label-position='left' :ref="(el) =>  addFormRef = el" label-width="100px" class="page-form">
        <el-form-item label="项目标题" prop="hotTitle">
          <el-input v-model="data.addData.hotTitle" placeholder='项目标题'></el-input>
        </el-form-item>
        <el-form-item label="项目Git链接" prop="hotUrl">
          <el-input v-model="data.addData.hotUrl" placeholder='项目Git链接'></el-input>
        </el-form-item>
         <el-form-item label="项目小图" prop="hotImg">
          <upload v-model="data.addData.hotImg" placeholder='项目小图'></upload>
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
import { HotSwiperData } from './add.vue.d'
import { ElForm } from 'element-plus';
import { useRoute, useRouter } from 'vue-router';
import { ApiHotSwiperDetail, ApiHotSwiperUpdate, ApiHotSwiperAdd } from '@/api/hotSwiper';

export default defineComponent({
  components: {
    Upload,
    PageTitle,
    PageFooter,
  },
  setup() {
    const rules = {
      hotTitle:  [
        { required: true, message: '请输入hotSwiper标题', trigger: 'change' }
      ],
      hotUrl:  [
        { required: true, message: '请输入git链接', trigger: 'change' }
      ],
      hotImg:  [
        { required: true, message: '请输入hotSwiper图片', trigger: 'change' }
      ],
    }

    const route = useRoute()
    const router = useRouter();
    const $message = getCurrentInstance()?.appContext.config.globalProperties.$message;
    
    const addFormRef = ref<typeof ElForm | null>(null)

    const data = reactive<HotSwiperData>({
      addData: {
        hotTitle: null,
        hotImg: '',
        hotUrl: '',
      },
      pagetype: 'add',
    })

    const goList = () => {
      const timer = setTimeout(() => {
        router.push('/hotSwiper/list')
        clearInterval(timer)
      }, 200);
    }

    const initDetailData = () => {
      const { _hid } = route.query;
      if (!_hid) {
        data.pagetype = 'add'
        return;
      } else {
        data.pagetype = 'edit'
      }
      ApiHotSwiperDetail({hotId: Number(_hid)}).then((res: any) => {
        console.log('res', res)
        data.addData = res;
      })
    }

    const hotSwiperSave = () => {
      ApiHotSwiperAdd(data.addData).then((res: any) => {
        $message.success('保存成功')
        goList()
      })
    }
    const hotSwiperUpdate = () => {
      ApiHotSwiperUpdate(data.addData).then((res: any) => {
        $message.success('更新成功')
        goList()
      })
    }

    const handleSave = () => {
      addFormRef.value!.validate((validate: boolean) => {
        if (validate) {
          if (data.pagetype === 'add') {
            hotSwiperSave()
          } else {
            hotSwiperUpdate()
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
