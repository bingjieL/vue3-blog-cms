<template>
  <section class="bj-page">
    <el-card class="page-card">
      <template #header>
        <h3 class="page-card__header"><i class="el-icon-guide"></i> JAY 博客后台管理系统</h3>
      </template>
      <section class="page-card__content">
        <el-form :model="loginData" :rules="rules" :ref="(el) => loginFormRef = el" class="demo-ruleForm">
          <el-form-item  prop="userName">
            <el-input v-model="loginData.userName" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item  prop="password">
            <el-input type="password" v-model="loginData.password" placeholder="请输入用户密码"></el-input>
          </el-form-item>
        </el-form>
        <el-button class="page-card__content__btn" @click="handleLogin" :loading='submitLoading' type="primary">登陆</el-button>
      </section>
    </el-card>
  </section>
</template>

<script lang='ts'>

import { defineComponent, getCurrentInstance, reactive, ref, ComponentPublicInstance } from 'vue';
import { ElForm } from 'element-plus';
import { LoginData } from './login.vue.d';
import { Apilogin } from '@/api/login';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default defineComponent({
  setup(props, ctx) {
    const vm = getCurrentInstance()
    const router = useRouter()
    const store = useStore()
    const rules = {
      userName: [
        { required: true, message: '请输入用户名称', trigger: 'change' }
      ],
      password: [
        { required: true, message: '请输入用户密码', trigger: 'change' }
      ],
    }

    const loginFormRef = ref<typeof ElForm | null>(null);
    const submitLoading = ref<boolean>(false);

    const loginData = reactive<LoginData>({
      userName: null,
      password: null
    })
    
    const handleLogin: () => void = () => {
      loginFormRef.value && loginFormRef.value.validate((valid: boolean) => {
        if (valid) {
          submitLoading.value = true;
          Apilogin(loginData).then((res: any) => {
            console.log('>>>> res', res)
            const { token, userName, } = res;
            const storeParams = { token, userName, isLogin: true}
            window.localStorage.setItem('bj_blog_userData', JSON.stringify(storeParams))
            store.commit('userInfo/changeUserInfo', storeParams)
            router.push('/');
          }).catch(err => {
            submitLoading.value = false;
          })
        }
      })
    }

    return {
      loginFormRef,
      rules,
      loginData,
      handleLogin,
      submitLoading,
    }
  }
}) 
</script>

<style lang="scss" scoped>
  .bj-page {
    width: 100%;
    height: 100%;
    background: url('~@/assets/images/bj.jpg') center no-repeat;
    background-size: cover;
    position: relative;
    .page-card {
      position: absolute;
      width: auto;
      min-width: 320px;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      .page-card__header {
        & > i {
          color: $base_color;
          margin-right: 5px;
        }
      }
      .page-card__content {
        padding: 20px 0;
        .page-card__content__btn {
          width: 100%;
          margin-top: 10px;
        }
      }
    }
  }
</style>
