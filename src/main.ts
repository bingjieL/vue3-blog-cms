import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import globalProperties from './utils/globalProperties';
import './assets/scss/reset.scss';
import VmdEditor from './utils/installVmdEditor';

// v-md-editor

console.log('>>>> c1 ===> end')
console.log('>>>> c2 ===> end')


const app = createApp(App);

app.use(store);
app.use(router);
app.use(ElementPlus, { size: 'mini' });
app.use(globalProperties);
app.use(VmdEditor);

app.mount('#app');
