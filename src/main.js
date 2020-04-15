import Vue from 'vue';
import App from './App.vue';

import VueRouter from 'vue-router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/style/iconfont.css';

import SearchInput from '../src/components/SearchInput';

Vue.component('search-input', SearchInput);
Vue.use(ElementUI);
Vue.use(VueRouter);

Vue.config.productionTip = false;

const routes = [
    { path: '/', component: () => import('./views/index.vue') },
    { path: '/demo', component: () => import('./views/demo.vue') },
    { path: '/layout', component: () => import('./views/layout.vue') }
];

const router = new VueRouter({
    routes
});

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');
