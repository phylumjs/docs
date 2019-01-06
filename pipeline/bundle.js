'use strict'

const path = require('path')
const webpack = require('webpack')
const webpackTask = require('@phylum/webpack-task')
const WebpackLogPlugin = require('webpack-fancy-log')
const HtmlPlugin = require('html-webpack-plugin')
const VuePlugin = require('vue-loader/lib/plugin')
const CssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssPlugin = require('optimize-css-assets-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const markdown = require.resolve('./markdown-loader')

module.exports = webpackTask(async ctx => {
	const {watch, dev} = ctx.pipeline.data
	return {
		context: path.join(__dirname, '..'),
		mode: dev ? 'development' : 'production',
		watch: Boolean(watch),
		target: 'web',
		devtool: dev ? 'source-map' : false,
		entry: [
			...(dev ? [] : ['@babel/polyfill']),
			...(watch ? ['./src/hmr'] : []),
			'./src'
		],
		output: {
			path: path.join(__dirname, '../dist'),
			filename: '[name].[hash].js'
		},
		module: {
			rules: [
				{
					test: /\.vue$/,
					use: 'vue-loader'
				},
				{
					test: /\.md$/,
					use: ['vue-loader', markdown]
				},
				{
					type: 'javascript/auto',
					test: /vue\.index\.json$/,
					use: dev ? 'vue-webpack-index' : ['babel-loader', 'vue-webpack-index']
				},
				{
					test: /\.less$/,
					use: [
						dev ? 'vue-style-loader' : CssExtractPlugin.loader,
						'css-loader',
						'less-loader'
					]
				},
				{
					test: /\.css$/,
					use: [
						dev ? 'vue-style-loader' : CssExtractPlugin.loader,
						'css-loader'
					]
				},
				...(dev ? [] : [
					{
						test: /\.js$/,
						use: 'babel-loader'
					}
				]),
				{
					test: /\.png$/,
					use: {
						loader: 'file-loader',
						options: {
							name: '[hash].[ext]',
							outputPath: 'img/'
						}
					}
				}
			]
		},
		resolve: {
			extensions: ['.js', '.json', '.vue'],
			mainFiles: ['index.js', 'vue.index.json'],
			alias: {
				vue$: dev ? 'vue/dist/vue.runtime.js' : 'vue/dist/vue.runtime.min.js'
			}
		},
		plugins: [
			new WebpackLogPlugin({name: 'website'}),
			new VuePlugin(),
			new HtmlPlugin({
				template: './src/index.html',
				inject: 'body',
				minify: {collapseWhitespace: true, removeComments: true}
			}),
			...(watch ? [
				new webpack.HotModuleReplacementPlugin()
			] : []),
			...(dev ? [] : [
				new OptimizeCssPlugin(),
				new CssExtractPlugin({filename: '[name].[hash].css'}),
				new CopyPlugin([
					{from: './src/static'}
				])
			])
		]
	}
})
