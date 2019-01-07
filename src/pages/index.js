'use strict'

export const home = {
	path: '/',
	component: () => import('./home')
}

export const sections = [
	{
		name: 'Manual',
		path: '/manual',
		pages: [
			{name: 'Pipeline Usage', path: '/pipeline', component: () => import('./manual-pipeline')},
			{name: 'Writing Tasks', path: '/tasks', component: () => import('./manual-tasks')},
			{name: 'Writing a CLI', path: '/cli', component: () => import('./manual-cli')}
		]
	},
	{
		name: 'API',
		path: '/api',
		pages: [
			{name: 'Pipeline', path: '/pipeline', component: () => import('./api-pipeline')},
			{name: 'Tasks', path: '/tasks', component: () => import('./api-tasks')}
		]
	},
	{
		name: 'Ecosystem',
		path: '/ecosystem',
		pages: [
			{name: 'Webpack Task', path: '/webpack-task', component: () => import('./ecosystem-webpack-task')},
			{name: 'Process Task', path: '/process-task', component: () => import('./ecosystem-process-task')}
		]
	}
]