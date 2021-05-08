<template>
  <section class="bj-page">
    <page-title :title="data.pagetype === 'add' ? 'Book Add' : 'Book Edit'"></page-title>
    <section class="page-content">
      <el-form :model="data.addData" :rules="rules" :ref="(el) =>  addFormRef = el" label-position='left' label-width="100px" class="page-form">
        <el-form-item label="书籍标题" prop="bookTitle">
          <el-input v-model="data.addData.bookTitle" placeholder='书籍标题'></el-input>
        </el-form-item>
        <el-form-item label="book作者" prop="bookAuthor">
          <el-input v-model="data.addData.bookAuthor" placeholder='书籍作者'></el-input>
        </el-form-item>
        <el-form-item label="PDF" prop="bookpdfUrl">
          <el-input v-model="data.addData.bookpdfUrl" placeholder='书籍PDF链接'></el-input>
        </el-form-item>
         <el-form-item label="书籍小图" prop="bookPic">
          <upload v-model="data.addData.bookPic" placeholder='书籍小图'></upload>
        </el-form-item>
        <el-form-item label="书籍描述" prop="bookDes">
          <el-input
            type="textarea"
            :rows="3"
            placeholder="书籍描述"
            v-model="data.addData.bookDes">
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
import { BookData } from './add.vue.d'
import { ElForm } from 'element-plus';
import { useRoute, useRouter } from 'vue-router';
import { ApiBookDetail, ApiBookUpdate, ApiBookAdd } from '@/api/book';

export default defineComponent({
  components: {
    Upload,
    PageTitle,
    PageFooter,
  },
  setup() {
    const rules = {
      bookTitle:  [
        { required: true, message: '请输入book标题', trigger: 'change' }
      ],
      bookAuthor:  [
        { required: true, message: '请输入book作者', trigger: 'change' }
      ],
      bookDes:  [
        { required: true, message: '请输入book描述', trigger: 'change' }
      ],
      bookpdfUrl:  [
        { required: true, message: '请输入bookPDF链接', trigger: 'change' }
      ],
      bookdlUrl:  [
        { required: true, message: '请输入bookKDL链接', trigger: 'change' }
      ],
      bookPic:  [
        { required: true, message: '请输入book图片', trigger: 'change' }
      ],
    }

    const route = useRoute()
    const router = useRouter();
    const $message = getCurrentInstance()?.appContext.config.globalProperties.$message;
    
    const addFormRef = ref<typeof ElForm | null>(null)

    const data = reactive<BookData>({
      addData: {
        bookTitle: null,
        bookAuthor: '',
        bookDes: '',
        bookpdfUrl: '',
        bookdlUrl: '',
        bookPic: '',
      },
      pagetype: 'add',
    })

    const goList = () => {
      const timer = setTimeout(() => {
        router.push('/book/list')
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
      ApiBookDetail({bookId: Number(_bid)}).then((res: any) => {
        console.log('res', res)
        data.addData = res;
      })
    }

    const bookSave = () => {
      ApiBookAdd(data.addData).then((res: any) => {
        $message.success('保存成功')
        goList()
      })
    }
    const bookUpdate = () => {
      ApiBookUpdate(data.addData).then((res: any) => {
        $message.success('更新成功')
        goList()
      })
    }

    const handleSave = () => {
      addFormRef.value!.validate((validate: boolean) => {
        if (validate) {
          if (data.pagetype === 'add') {
            bookSave()
          } else {
            bookUpdate()
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
