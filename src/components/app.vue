<template>
	<div>
		<b-navbar toggleable="sm" type="dark" fixed="top">
			<b-container>
				<b-navbar-toggle target="nav_collapse"/>
				<b-navbar-brand to="/">PhylumJS</b-navbar-brand>
				<b-collapse is-nav id="nav_collapse">
					<b-navbar-nav class="ml-auto">
						<b-nav-dropdown v-for="section in sections" :key="section.path" :text="section.name">
							<b-dd-item v-for="page in section.pages" :key="page.path" :to="section.path + page.path">{{page.name}}</b-dd-item>
						</b-nav-dropdown>
						<b-nav-item href="https://github.com/phylumjs" target="_blank">GitHub</b-nav-item>
					</b-navbar-nav>
				</b-collapse>
			</b-container>
		</b-navbar>
		<b-navbar><b-nav-item><br></b-nav-item></b-navbar>
		<router-view/>
	</div>
</template>

<script>
	import {sections} from '../pages'

	export default {
		created() {
			this.sections = sections
		}
	}
</script>

<style lang="less" scoped>
	@import 'colors';

	.navbar {
		background-color: @bg-dark;
	}
</style>

<style lang="less">
	@import 'document';
</style>
