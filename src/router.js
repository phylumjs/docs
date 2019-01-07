'use strict'

import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
	routes: [
		{path: '/', component: () => import('./pages/home')},
		{path: '/api/pipeline', component: () => import('./pages/api-pipeline')},
		{path: '/api/tasks', component: () => import('./pages/api-tasks')},
		{path: '/manual/concepts', component: () => import('./pages/manual-concepts')},
		{path: '/manual/writing-tasks', component: () => import('./pages/manual-writing-tasks')}
	]
})
