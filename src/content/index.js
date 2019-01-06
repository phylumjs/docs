'use strict'

import pipeline from './pipeline'

export default {
	content: () => import('./index.vue'),
	children: {
		pipeline
	}
}
