import Vue from 'vue';
import App from './App.vue';

import VueRouter from 'vue-router';
import ElementUI from 'element-ui';
import './assets/style/mfe-iconfont.css';
import './assets/style/ibuild-iconfont.css';

import './assets/style/common.less';
import './assets/style/element-variables.scss';
import SearchInput from '../src/components/SearchInput';
import SearchTree from '../src/components/SearchTree';
import BgProgress from '../src/components/BgProgress';
import SearchTable from '../src/components/SearchTable';
import FileUploader from '../src/components/FileUploader';
import PopoverInput from '../src/components/PopoverInput';

Vue.component('search-input', SearchInput);
Vue.component('search-tree', SearchTree);
Vue.component('bg-progress', BgProgress);
Vue.component('search-table', SearchTable);
Vue.component('file-uploader', FileUploader);
Vue.component('popover-input', PopoverInput);
Vue.use(ElementUI);
Vue.use(VueRouter);

Vue.config.productionTip = false;

const routes = [
    { path: '/', component: () => import('./views/index.vue') },
    { path: '/demo', component: () => import('./views/demo.vue') },
    { path: '/layout', component: () => import('./views/layout.vue') },
    { path: '/quality', component: () => import('./views/quality.vue') },
];

const router = new VueRouter({
    routes,
});

new Vue({
    router,
    render: (h) => h(App),
}).$mount('#app');
