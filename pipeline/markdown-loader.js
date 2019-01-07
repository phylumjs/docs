'use strict'

const marked = require('marked')
const stringEscape = require('js-string-escape')
const {highlight} = require('highlight.js')

class Renderer extends marked.Renderer {
	link(href, title, text) {
		if (href.startsWith('/')) {
			return `<router-link :to="'${stringEscape(href)}'">${text}</router-link>`
		}
		if (/^https?:\/\//.test(href)) {
			return `<a :href="'${stringEscape(href)}'" target="_blank">${text}</a>`
		}
		return super.link(href, title, text)
	}
}

module.exports = function (content) {
	const cb = this.async()
	marked(content, {
		renderer: new Renderer(),
		headerIds: false,
		highlight: (code, lang) => {
			return lang ? highlight(lang, code, true).value : code
		}
	}, (err, html) => {
		if (err) {
			cb(err)
		} else {
			cb(null, `<template>
				<b-container class="document">
					${html}
				</b-container>
			</template>
			<style lang="less">
				@import 'document.less';
			</style>`)
		}
	})
}
