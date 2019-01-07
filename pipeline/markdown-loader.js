'use strict'

const marked = require('marked')
const stringEscape = require('js-string-escape')
const {highlight} = require('highlight.js')

module.exports = function (content) {
	const cb = this.async()
	marked(content, {
		headerIds: false,
		highlight: (code, lang) => {
			return lang ? highlight(lang, code, true).value : code
		}
	}, (err, html) => {
		if (err) {
			cb(err)
		} else {
			cb(null, `<template><b-container class="document">${html}</b-container></template><style lang="less">@import 'document.less';</style>`)
		}
	})
}
