<template>
  <section class="bj-markdow">
    <v-md-editor 
      v-model="editorValue"  
      height="75vh" 
      :left-toolbar='leftToolbar'
      :right-toolbar='rightToolbar'
      :disabled-menus="[]"
      @upload-image="handleUploadImage"
      @fullscreen-change='handleFullscreen'
    />
  </section>
</template>

<script lang='ts'>
import { defineComponent, getCurrentInstance, ref, watch, watchEffect } from 'vue';
import { ApiUploadImg } from '@/api/common';

export default defineComponent({
  props: {
    modelValue: {
      type: String,
      default: '',
    }
  },
  emits: ['update:modelValue', 'fullscreenChange'],
  setup(props, { emit }) {
    const $message = getCurrentInstance()?.appContext.config.globalProperties.$message;
    const leftToolbar: string = 'undo redo clear | emoji tip image | h bold italic strikethrough quote | ul ol table hr link code';
    const rightToolbar: string = 'preview toc sync-scroll fullscreen';
    const editorValue = ref<string>('');
    // 全屏
    const handleFullscreen = (isFullscreen: boolean) => {
      emit('fullscreenChange', isFullscreen)
    }
    // 上传图片
    const handleUploadImage = (event: Event, insertImage: any, files: File[]) => {
      console.log(files);
      const formData = new FormData()
      formData.append('file', files[0]);
      ApiUploadImg(formData).then((res: any) => {
        console.log(res)
        const { url } = res;
        insertImage({
          url,
          desc: 'blog',
          width: '200',
          height: 'auto',
        });
        $message.success('图片上传成功');
      }).catch(err => {
        $message.success('图片上传失败');
      })
    }
   
    watch(
      () => props.modelValue,
      (val) => {
        if (val !== editorValue.value) {
          editorValue.value = val;
        }
      }
    )

    watch(
      () => editorValue.value,
      (val: string, oldVal: string) => {
        if (val === props.modelValue) {
          return
        } else {
          emit('update:modelValue', val)
        }
      }
    )

    return {
      leftToolbar,
      rightToolbar,
      handleUploadImage,
      editorValue,
      handleFullscreen,
    }
  },
})
</script>

<style lang="scss" scoped>
  .bj-markdow {
    width: 100%;
    height: 100%;
  }
</style>