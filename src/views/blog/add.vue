<template>
  <section class="bj-page">
    <page-title :title="data.pagetype === 'add' ? 'Blog Add' : 'Blog Edit'"></page-title>
    <section class="page-content">
      <el-form :model="data.addData" :rules="rules" :ref="addFormRef" label-position='left' label-width="100px" class="page-form">
        <el-form-item label="博客标题" prop="blogTitle">
          <el-input v-model="data.addData.blogTitle" placeholder='博客标题'></el-input>
        </el-form-item>
        <el-form-item label="博客类型" prop="blog_type_id">
          <el-select v-model="data.addData.blog_type_id" placeholder="请选择博客类型">
            <el-option 
              v-for="item in data.typeOption" 
              :key="item.blogTypeId" 
              :label="item.blogTypeTitle" 
              :value="item.blogTypeId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="博客小图" prop="blogImg">
          <upload v-model="data.addData.blogImg" placeholder='博客小图'></upload>
        </el-form-item>
        <el-form-item label="博客描述" prop="blogDes">
          <el-input
            type="textarea"
            :rows="3"
            placeholder="博客描述"
            v-model="data.addData.blogDes">
          </el-input>
        </el-form-item>
        <el-form-item label="博客内容" prop="blogContent">
          <markdow-edit v-model="data.addData.blogContent"></markdow-edit>
        </el-form-item>
        
      </el-form>
    </section>
    <page-footer @fix="handleSave" @cancel="handleCancel"></page-footer>
  </section>
</template>

<script lang='ts'>
import { defineComponent, onMounted, reactive, ref, getCurrentInstance } from 'vue';
import MarkdowEdit from '@/components/MarkdonEdit.vue';
import Upload from '@/components/Upload.vue';
import PageTitle from '@/components/PageTitle.vue';
import PageFooter from '@/components/PageFooter.vue';
import { BlogData } from './add.vue.d'
import { ElForm } from 'element-plus';
import { useRoute, useRouter } from 'vue-router';
import { ApiBlogTypeGet } from '@/api/blogType';
import { ApiGetBlogById, ApiGetUpdate, ApiGetAdd } from '@/api/blog';

export default defineComponent({
  components: {
    MarkdowEdit,
    Upload,
    PageTitle,
    PageFooter,
  },
  setup() {
    const rules = {
      blogTitle:  [
        { required: true, message: '请输入博客标题', trigger: 'change' }
      ],
      blog_type_id:  [
        { required: true, message: '请选择博客类型', trigger: 'change' }
      ],
      blogImg:  [
        { required: true, message: '请上传博客小图', trigger: 'change' }
      ],
      blogContent:  [
        { required: true, message: '请填写博客内容', trigger: 'change' }
      ],
      blogDes:  [
        { required: true, message: '请输入博客描述', trigger: 'change' }
      ],
    }

    const route = useRoute()
    const router = useRouter();
    const $message = getCurrentInstance()?.appContext.config.globalProperties.$message;
    
    const addFormRef = ref<typeof ElForm | null>(null)

    const data = reactive<BlogData>({
      addData: {
        blogTitle: null,
        blog_type_id: null,
        blogImg: '',
        blogContent: '',
        blogDes: null,
      },
      typeOption: [],
      pagetype: 'add',
    })

    const goList = () => {
      const timer = setTimeout(() => {
        router.push('/blog/list')
        clearInterval(timer)
      }, 200);
    }

    const initSelect = () => {
      ApiBlogTypeGet().then((res: any) => {
        console.log('res', res)
        data.typeOption = res.rows;
      })
    }
    const initDetailData = () => {
      const { _bid } = route.query;
      if (!_bid) {
        data.pagetype = 'add'
        return;
      } else {
        data.pagetype = 'edit'
      }
      ApiGetBlogById({blogId: Number(_bid)}).then((res: any) => {
        console.log('res', res)
        data.addData = res;
      })
    }

    const blogSave = () => {
      ApiGetAdd(data.addData).then((res: any) => {
        $message.success('保存成功')
        goList()
      })
    }
    const blogUpdate = () => {
      ApiGetUpdate(data.addData).then((res: any) => {
        $message.success('更新成功')
        goList()
      })
    }

    const handleSave = () => {
      if (data.pagetype === 'add') {
        blogSave()
      } else {
        blogUpdate()
      }
    }
    const handleCancel = () => {
      goList()
    } 

    onMounted(() => {
      initSelect()
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
