'use strict'

import Vue from 'vue'
import Router from 'vue-router'

import {home, sections} from './pages'

Vue.use(Router)

export default new Router({
	routes: [
		home,
		...(function * () {
			for (const section of sections) {
				for (const page of section.pages) {
					yield {
						path: section.path + page.path,
						component: page.component
					}
				}
			}
		})(),
		{path: '*', component: () => import('./pages/404')}
	]
})
