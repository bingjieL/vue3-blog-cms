<template>
  <section class="bj-page">
    <page-title :title="data.pagetype === 'add' ? 'Sheet Add' : 'Sheet Edit'"></page-title>
    <section class="page-content">
      <el-form :model="data.addData" :rules="rules" :ref="addFormRef" label-position='left' label-width="100px" class="page-form">
        <el-form-item label="歌单标题" prop="sheetTitle">
          <el-input v-model="data.addData.sheetTitle" placeholder='歌单标题'></el-input>
        </el-form-item>
        <el-form-item label="歌单标签" prop="sheetTag">
          <el-input v-model="data.addData.sheetTag" placeholder='歌单标签'></el-input>
        </el-form-item>
        <el-form-item label="歌单链接" prop="sheetUrl">
          <el-input v-model="data.addData.sheetUrl" placeholder='歌单链接'></el-input>
        </el-form-item>
         <el-form-item label="歌单图片" prop="sheetImg">
          <upload v-model="data.addData.sheetImg" placeholder='歌单图片'></upload>
        </el-form-item>
        <el-form-item label="sheet描述" prop="sheetDes">
          <el-input
            type="textarea"
            :rows="3"
            placeholder="sheet描述"
            v-model="data.addData.sheetDes">
          </el-input>
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
import { SheetData } from './add.vue.d'
import { ElForm } from 'element-plus';
import { useRoute, useRouter } from 'vue-router';
import { ApiSheetDetail, ApiSheetUpdate, ApiSheetAdd } from '@/api/sheet';

export default defineComponent({
  components: {
    Upload,
    PageTitle,
    PageFooter,
  },
  setup() {
    const rules = {
      sheetTitle:  [
        { required: true, message: '请输入歌单标题', trigger: 'change' }
      ],
      sheetDes:  [
        { required: true, message: '请输入歌单描述', trigger: 'change' }
      ],
      sheetUrl:  [
        { required: true, message: '请输入歌单链接', trigger: 'change' }
      ],
      sheetTag:  [
        { required: true, message: '请输入歌单标签', trigger: 'change' }
      ],
      sheetImg:  [
        { required: true, message: '请输入歌单图片', trigger: 'change' }
      ],
    }

    const route = useRoute()
    const router = useRouter();
    const $message = getCurrentInstance()?.appContext.config.globalProperties.$message;
    
    const addFormRef = ref<typeof ElForm | null>(null)

    const data = reactive<SheetData>({
      addData: {
        sheetTitle: null,
        sheetDes: '',
        sheetUrl: '',
        sheetTag: '',
        sheetImg: '',
      },
      pagetype: 'add',
    })

    const goList = () => {
      const timer = setTimeout(() => {
        router.push('/sheet/list')
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
      ApiSheetDetail({sheetId: Number(_bid)}).then((res: any) => {
        console.log('res', res)
        data.addData = res;
      })
    }

    const sheetSave = () => {
      ApiSheetAdd(data.addData).then((res: any) => {
        $message.success('保存成功')
        goList()
      })
    }
    const sheetUpdate = () => {
      ApiSheetUpdate(data.addData).then((res: any) => {
        $message.success('更新成功')
        goList()
      })
    }

    const handleSave = () => {
      if (data.pagetype === 'add') {
        sheetSave()
      } else {
        sheetUpdate()
      }
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
