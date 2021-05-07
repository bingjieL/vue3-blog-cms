import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

import Home from '../views/home/home.vue';
import Layout from '../views/layout/index.vue';
import Login from '../views/login/login.vue';

const BlogList = () => import('../views/blog/list.vue');
const BlogAdd = () => import('../views/blog/add.vue');

const BannerList = () => import('../views/banner/list.vue');
const BannerAdd = () => import('../views/banner/add.vue');

const BookList = () => import('../views/book/list.vue');
const BookAdd = () => import('../views/book/add.vue');

const HotSwiperList = () => import('../views/hotSwiper/list.vue');
const HotSwiperAdd = () => import('../views/hotSwiper/add.vue');

const SheetList = () => import('../views/sheet/list.vue');
const SheetAdd = () => import('../views/sheet/add.vue');

const BlogTypeList = () => import('../views/blogType/list.vue');
const BlogTypeAdd = () => import('../views/blogType/add.vue');

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      isHidden: true,
    },
  },
  {
    path: '/',
    name: 'Home',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'HomeIndex',
        meta: {
          title: '首页',
        },
        component: Home,
      },
    ],
  },
  {
    path: '/blog',
    name: 'Blog',
    component: Layout,
    redirect: '/blog/list',
    meta: {
      title: '博客管理',
      icon: 'el-icon-document',
    },
    children: [
      {
        path: '/blog/list',
        name: 'BlogList',
        meta: {
          title: '博客列表',
        },
        component: BlogList,
      }, {
        path: '/blog/add',
        name: 'BlogAdd',
        meta: {
          title: '博客新增',
        },
        component: BlogAdd,
      },
    ],
  },
  {
    path: '/banner',
    name: 'banner',
    component: Layout,
    redirect: '/banner/list',
    meta: {
      title: 'banner管理',
      icon: 'el-icon-picture',
    },
    children: [
      {
        path: '/banner/list',
        name: 'bannerList',
        meta: {
          title: 'banner列表',
        },
        component: BannerList,
      }, {
        path: '/banner/add',
        name: 'BannerAdd',
        meta: {
          title: 'banner新增',
        },
        component: BannerAdd,
      },
    ],
  },
  {
    path: '/book',
    name: 'book',
    component: Layout,
    redirect: '/book/list',
    meta: {
      title: '书籍管理',
      icon: 'el-icon-reading',

    },
    children: [
      {
        path: '/book/list',
        name: 'bookList',
        meta: {
          title: '书籍列表',
        },
        component: BookList,
      }, {
        path: '/book/add',
        name: 'BookAdd',
        meta: {
          title: '书籍新增',
        },
        component: BookAdd,
      },
    ],
  },
  {
    path: '/hotSwiper',
    name: 'hotSwiper',
    component: Layout,
    redirect: '/hotSwiper/list',
    meta: {
      title: '热门项目',
      icon: 'el-icon-s-order',
    },
    children: [
      {
        path: '/hotSwiper/list',
        name: 'hotSwiperList',
        meta: {
          title: '项目列表',
        },
        component: HotSwiperList,
      }, {
        path: '/hotSwiper/add',
        name: 'hotSwiperAdd',
        meta: {
          title: '项目新增',
        },
        component: HotSwiperAdd,
      },
    ],
  },
  {
    path: '/sheet',
    name: 'sheet',
    component: Layout,
    redirect: '/sheet/list',
    meta: {
      title: '歌单管理',
      icon: 'el-icon-tickets',
    },
    children: [
      {
        path: '/sheet/list',
        name: 'sheetList',
        meta: {
          title: '歌单列表',
        },
        component: SheetList,
      }, {
        path: '/sheet/add',
        name: 'sheetAdd',
        meta: {
          title: '歌单新增',
        },
        component: SheetAdd,
      },
    ],
  },
  {
    path: '/blogType',
    name: 'blogType',
    component: Layout,
    redirect: '/blogType/list',
    meta: {
      title: '博客类型管理',
      icon: 'el-icon-postcard',
    },
    children: [
      {
        path: '/blogType/list',
        name: 'blogTypeList',
        meta: {
          title: '类型列表',
        },
        component: BlogTypeList,
      }, {
        path: '/blogType/add',
        name: 'blogTypeAdd',
        meta: {
          title: '类型新增',
        },
        component: BlogTypeAdd,
      },
    ],
  },

];


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const { path } = to;
  const goLoginPage = () => {
    next({
      path: '/login',
      query: {
        redirect: path,
      },
    });
  };
  if (path !== '/login') {
    let storageUserInfo: any = localStorage.getItem('bj_blog_userData');
    try {
      if (storageUserInfo) {
        storageUserInfo = JSON.parse(storageUserInfo);
        if (!storageUserInfo.isLogin) {
          goLoginPage();
        } else {
          next();
        }
      } else {
        goLoginPage();
      }
    } catch (error) {
      goLoginPage();
    }
  } else {
    next();
  }
});


export default router;
