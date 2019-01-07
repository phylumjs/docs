'use strict'

import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
	routes: [
		{path: '/', component: () => import('./pages/home')},
		{path: '/api/pipeline', component: () => import('./pages/api-pipeline')},
		{path: '/api/tasks', component: () => import('./pages/api-tasks')},
		{path: '/ecosystem/process-task', component: () => import('./pages/ecosystem-process-task')},
		{path: '/ecosystem/webpack-task', component: () => import('./pages/ecosystem-webpack-task')},
		{path: '*', component: () => import('./pages/404')}
	]
})
