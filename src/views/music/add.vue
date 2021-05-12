<template>
  <section class="bj-page">
    <page-title :title="data.pagetype === 'add' ? 'Music Add' : 'Music Edit'"></page-title>
    <section class="page-content">
      <el-form :model="data.addData" :rules="rules" :ref="(el) =>  addFormRef = el" label-position='left' label-width="100px" class="page-form">
        <el-form-item label="music标题" prop="musicTitle">
          <el-input v-model="data.addData.musicTitle" placeholder='music标题'></el-input>
        </el-form-item>
        <el-form-item label="music作者" prop="musicAuthor">
          <el-input v-model="data.addData.musicAuthor" placeholder='music作者'></el-input>
        </el-form-item>
        <el-form-item label="歌词地址" prop="musicLrc">
          <el-input v-model="data.addData.musicLrc" placeholder='歌词地址'></el-input>
        </el-form-item>
        <el-form-item label="music小图" prop="musicPic">
          <upload v-model="data.addData.musicPic" placeholder='music小图'></upload>
        </el-form-item>
        <el-form-item label="歌曲" prop="musicUrl">
          <upload-file v-model="data.addData.musicUrl" placeholder='歌曲'></upload-file>
        </el-form-item>
      </el-form>
    </section>
    <page-footer @fix="handleSave" @cancel="handleCancel"></page-footer>
  </section>
</template>

<script lang='ts'>
import { defineComponent, onMounted, reactive, ref, getCurrentInstance } from 'vue';
import Upload from '@/components/Upload.vue';
import UploadFile from '@/components/UploadFile.vue';

import PageTitle from '@/components/PageTitle.vue';
import PageFooter from '@/components/PageFooter.vue';
import { MusicData } from './add.vue.d'
import { ElForm } from 'element-plus';
import { useRoute, useRouter } from 'vue-router';
import { ApiMusicDetail, ApiMusicUpdate, ApiMusicAdd } from '@/api/music';


export default defineComponent({
  components: {
    Upload,
    UploadFile,
    PageTitle,
    PageFooter,
  },
  setup() {
    const rules = {
      musicTitle:  [
        { required: true, message: '请输入music标题', trigger: 'change' }
      ],
      musicLrc:  [
        { required: true, message: '请输入歌词链接', trigger: 'change' }
      ],
      musicAuthor:  [
        { required: true, message: '请输入歌词作者', trigger: 'change' }
      ],
      musicPic:  [
        { required: true, message: '请上传music小图', trigger: 'change' }
      ],
      musicUrl:  [
        { required: true, message: '请上传music', trigger: 'change' }
      ],
      
      
    }

    const route = useRoute()
    const router = useRouter();
    const $message = getCurrentInstance()?.appContext.config.globalProperties.$message;
    
    const addFormRef = ref<typeof ElForm | null>(null)

    const data = reactive<MusicData>({
      addData: {
        musicTitle: null,
        musicPic: '',
        musicLrc: '',
        musicUrl: '',
        musicAuthor: '',
      },
      pagetype: 'add',
    })

    const goList = () => {
      const timer = setTimeout(() => {
        router.push('/music/list')
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
      ApiMusicDetail({musicId: Number(_bid)}).then((res: any) => {
        console.log('res', res)
        data.addData = res;
      })
    }

    const musicSave = () => {
      ApiMusicAdd(data.addData).then((res: any) => {
        $message.success('保存成功')
        goList()
      })
    }
    const musicUpdate = () => {
      ApiMusicUpdate(data.addData).then((res: any) => {
        $message.success('更新成功')
        goList()
      })
    }

    const handleSave = () => {
      addFormRef.value!.validate((validate: boolean) => {
        if (validate) {
          if (data.pagetype === 'add') {
            musicSave()
          } else {
            musicUpdate()
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
