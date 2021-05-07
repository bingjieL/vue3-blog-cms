<template>
  <el-upload
    class="avatar-uploader"
    action=""
    :show-file-list="false"
    :before-upload="beforeImgUpload"
  >
    <div class="upload__placeholder" v-loading='uplaodLoading'>
      <img v-if="imageUrl" :src="imageUrl" class="avatar">
      <i v-else class="el-icon-plus"></i>
    </div>
  </el-upload>
</template>

<script lang='ts'>
import { defineComponent, getCurrentInstance, ref, watch, watchEffect} from 'vue';
import { ApiUploadImg } from '@/api/common';

export default defineComponent({
  props: {
    modelValue: {
      type: String,
      default: undefined,
    }
  },
  
  setup(props, { emit, slots, attrs }) {
    
    const vm = getCurrentInstance();
    const $message = vm?.appContext.config.globalProperties.$message;
    const uplaodLoading = ref<boolean>(false);
    const imageUrl = ref<string>('');

    watch(
      () => props.modelValue,
      (val: string) => {
        if (val !== imageUrl.value) {
          imageUrl.value = val;
        }
      },
    )

    watch(
      () => imageUrl.value,
      (val: string) => {
        if (val !== props.modelValue) {
          emit('update:modelValue', val)
        }
      },
      {
        deep: true,
      }
    )

    const uploadImg = (file: File) => {
      uplaodLoading.value = true;
      const formData = new FormData()
      formData.append('file', file);
      ApiUploadImg(formData).then((res: any) => {
        const { url } = res;
        imageUrl.value = url;
        uplaodLoading.value = false;
        $message.success('图片上传成功')
      }).catch(err => {
        uplaodLoading.value = false;
      })
    }

    const beforeImgUpload = (file: File) => {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
      const isLt5M = file.size / 1024 / 1024 < 5;
      if (!isJPG) {
        $message.error('上传头像图片只能是 JPG PNG 格式!');
      }
      if (!isLt5M) {
        $message.error('上传头像图片大小不能超过 5MB!');
      }
      if (isJPG && isLt5M) {
        uploadImg(file)
      }
      return false;
    }

    return {
      beforeImgUpload,
      uplaodLoading,
      imageUrl,
    }
  }
}) 
</script>

<style lang="scss" scoped>
.upload__placeholder {
  width: 80px;
  height: 80px;
  
  text-align: center;
  line-height: 80px;
  border: 1px dashed #ddd;
  padding: 4px;
  border-radius: 5px;
  font-size: 20px;
  background: #fafafa;
  &:hover {
    border: 1px dashed $base-color;
  }
  & > img {
    width: 100%;
    height: 100%;
    object-position: center;
    object-fit: contain;
  }
}
</style>