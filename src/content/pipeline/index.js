'use strict'

export default {
	title: 'Pipeline',
	content: () => import('./index.md'),
	children: {
		'pipeline-api': {
			title: 'Pipeline API',
			content: () => import('./pipeline-api.md')
		},
		'task-api': {
			title: 'Task API',
			content: () => import('./task-api.md')
		}
	}
}
