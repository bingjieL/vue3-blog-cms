<template>
  <el-upload
    class="upload-file"
    action=""
    :on-remove="handleRemove"
    :before-upload='beforeImgUpload'
    :before-remove="beforeRemove"
    :file-list="fileList"
  >
  <el-button size="small" type="primary">点击上传</el-button>
  <template #tip>
    <slot name="tip">
    </slot>
  </template>
</el-upload>
</template>

<script lang='ts'>
import { computed, defineComponent, getCurrentInstance, reactive, ref, toRefs, watch, watchEffect} from 'vue';
import { ApiUploadMp3 } from '@/api/common';

interface FileObject {
  url: string;
  name?: string;
  [propsName: string]: any;
}

type ModelValue = string | string[] | undefined;
type ModuleValueType = 'string' | 'array';

export default defineComponent({
  props: {
    modelValue: {
      // url || [url] string时候逗号隔开
      type: [ String, Array ],
      default: undefined,
    },
    limit: {
      type: Number,
      default: 1,
    }
  },
  
  setup(props, { emit, slots, attrs }) {
    const vm = getCurrentInstance();
    const $message = vm?.appContext.config.globalProperties.$message;
    const $confirm = vm?.appContext.config.globalProperties.$confirm;
    const { modelValue, limit } = toRefs(props)
    let fileList = ref<Array<FileObject>>([]);

    const modelVauleType = computed<ModuleValueType>(() => {
      if (typeof modelValue.value === 'string') {
        return 'string'
      }
      return 'array'
    })


    const uploadMp3 = (file: File) => {
      const formData = new FormData()
      formData.append('file', file);
      ApiUploadMp3(formData).then((res: any) => {
        const { url } = res;
        const fileItem = {
          name: file.name,
          url,
        }
        if (limit.value === 1) {
          fileList.value = [fileItem]
        } else {
          fileList.value.push(fileItem)
        }
        $message.success('文件上传成功')
      }).catch(err => {
        // uplaodLoading.value = false;
      })
    }

    function handleRemove(file: File, fileLists: any) {
      fileList.value = fileLists
    }
    
    async function beforeRemove(file: File, fileList: any) {
      // await $confirm('此操作将删除该文件, 是否继续?', '提示')
      return true
    }

    function beforeImgUpload(file: File) {
      const fileSum = fileList.value.length;
      if (fileSum >= Number(limit.value) && limit.value !== 1) {
        $message.error(`超出数量限制,最多只能上传${limit}个文件`);
      }
      uploadMp3(file)
      return false;
    }

    watch(
      () => modelValue.value,
      (val: any) => {
        let newVal: string[] = [];
        if(!val || val === '') return;
        if (modelVauleType.value === 'string') {
          newVal = val.split(',')
        } else {
          newVal = val;
        }
        fileList.value = newVal.map((item: string) => {
          return {
            name: item,
            url: item,
          }
        })
      },
      {
        deep: true,
        immediate: true,
      }
    )

    watch(
      () => fileList.value,
      (val: Array<FileObject>) => {
       
        let newval: ModelValue = val.map((item: FileObject) => item.url)
        if (modelVauleType.value === 'string' ) {
          newval = newval.join(',')
        } 
        emit('update:modelValue', newval)
      }, {
        deep: true,
      }
    )
    
    
    return {
      fileList,
      handleRemove,
      beforeRemove,
      beforeImgUpload,
    }
  }
}) 
</script>

<style lang="scss" scoped>
.upload-file {
  max-width: 500px;
}
</style>