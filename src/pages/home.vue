<template>
	<div>
		<div class="section section-dark">
			<b-container class="text-center">
				<img src="/images/header.png" alt="PhylumJS" class="img-fluid">
				<div class="lead">
					High performance build framework for javascript applications
				</div>
			</b-container>
		</div>
		<home-content/>
		<b-container class="document">
			<div v-for="section in sections" :key="section.path">
				<h5>{{section.name}}</h5>
				<div v-for="page in section.pages">
					<router-link :to="section.path + page.path">{{page.name}}</router-link>
				</div>
				<br>
			</div>
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
