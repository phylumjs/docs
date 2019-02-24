'use strict'

import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import components from './components';
import router from './router';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.use(BootstrapVue);

const app = new Vue(Object.assign({
	router
}, components.get('app-root')));

app.$mount('#app');
