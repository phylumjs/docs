<template>
	<div>
		<div class="section section-dark">
			<b-container class="text-center">
				<img src="/images/header.png" alt="PhylumJS" class="img-fluid">
				<div class="lead">
					High performance build framework for javascript applications
				</div>
				<br>
				<a href="https://travis-ci.org/phylumjs/pipeline" target="_blank">
					<img src="https://travis-ci.org/phylumjs/pipeline.svg?branch=master">
				</a>
				<a href="https://coveralls.io/github/phylumjs/pipeline?branch=master" target="_blank">
					<img src="https://coveralls.io/repos/github/phylumjs/pipeline/badge.svg?branch=master">
				</a>
				<a href="https://www.npmjs.com/package/@phylum/pipeline" target="_blank">
					<img src="https://img.shields.io/npm/v/@phylum/pipeline.svg">
					<img src="https://img.shields.io/npm/l/@phylum/pipeline.svg">
				</a>
			</b-container>
		</div>
		<home-content/>
		<b-container class="document">
			<hr>
			<b-row>
				<b-col v-for="section in sections" :key="section.path" cols="12" md="4">
					<h4>{{section.name}}</h4>
					<div v-for="page in section.pages" :key="page.path">
						<router-link :to="section.path + page.path">{{page.name}}</router-link>
					</div>
					<br>
				</b-col>
			</b-row>
		</b-container>
	</div>
</template>

<script>
	import content from './home-content'
	import {sections} from '.'

	export default {
		components: {'home-content': content},
		wrapper: false,

		created() {
			this.sections = sections
		}
	}
</script>

<style lang="less" scoped>
	@import 'colors';

	.section {
		padding-top: 55px;
		padding-bottom: 80px;
	}
	.section-dark {
		background-color: @bg-dark;
		color: @fg-dark;
	}
</style>
