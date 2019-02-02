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
			{name: 'Writing a CLI', path: '/cli', component: () => import('./manual-cli')},
			{name: 'Upgrade Guides', path: '/upgrade', component: () => import('./manual-upgrade')}
		]
	},
	{
		name: 'API',
		path: '/api',
		pages: [
			{name: 'Pipeline', path: '/pipeline', component: () => import('./api-pipeline')},
			{name: 'Tasks', path: '/tasks', component: () => import('./api-tasks')},
			{name: 'Output Streams', path: '/output-stream', component: () => import('./api-output-stream')},
			{name: 'Extension', path: '/extension', component: () => import('./api-extension')},
			{name: 'Changelog', path: '/changelog', component: () => import('./api-changelog')}
		]
	},
	{
		name: 'Ecosystem',
		path: '/ecosystem',
		pages: [
			{name: 'Official Packages', path: '/packages', component: () => import('./ecosystem-packages')}
		]
	}
]
