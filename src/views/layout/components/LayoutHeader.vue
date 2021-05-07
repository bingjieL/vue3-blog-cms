<template>
  <header class="bj-layout-header">
    <div class="bj-layout-header__logo">Jay</div>
    <div class="bj-layout-header__rightMenu">
      <el-dropdown @command="handleCommand">
        <div class="user">
          <img class="user_avatar" src="@/assets/images/header.jpeg" alt="">
          <h4>{{userData.userName}}</h4>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command='loginOut'>退出登陆</el-dropdown-item>
            <el-dropdown-item divided>敬请期待</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </header>
</template>

<script lang='ts'>
import { defineComponent, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';


export default defineComponent ({
  setup() {
    const store = useStore();
    const router = useRouter();

    const userData = reactive(store.state.userInfo)
    
    const loginOut = () => {
      localStorage.removeItem('bj_blog_userData')
      store.commit('userInfo/changeUserInfo', {})
      router.push('/login')
    }

    const handleCommand = (key: string) => {
      switch (key) {
        case 'loginOut':
          loginOut();
          break;
        default:
          break;
      }
    }
    return {
      userData,
      handleCommand
    }
  }
  
}) 

</script>

<style lang="scss" scoped>
.bj-layout-header {
  display: flex;
  align-items: center;
  height: 100%;
  .bj-layout-header__logo {
    width: $main-nav-width;
    background: $main-nav-header-bj-color;
    height: 100%;
    text-align: center;
    font-size: 18px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #ffd04b;
  }
  .bj-layout-header__rightMenu {
    background: #fff;
    flex: 1;
    height: 100%;
    box-shadow:0 0px 20px 3px rgba(0,0,0, .1);
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-right: 15px;
    .user {
      display: flex;
      align-items: center;
      cursor: pointer;
      .user_avatar {
        margin-right: 10px;
        height: 30px;
        width: 30px;
        border-radius: 100%;
        padding: 2px;
        border: 1px solid #ddd;
      }
    }
    
  }
}
</style>