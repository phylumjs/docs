<template>
	<div>
		<b-navbar toggleable="sm" type="dark" fixed="top">
			<b-container>
				<b-navbar-toggle target="nav_collapse"/>
				<b-navbar-brand to="/">PhylumJS</b-navbar-brand>
				<b-collapse is-nav id="nav_collapse">
					<b-navbar-nav class="ml-auto">
						<b-nav-dropdown text="Manual">
							<b-dd-header>Available soon...</b-dd-header>
						</b-nav-dropdown>
						<b-nav-dropdown text="API">
							<b-dd-item to="/api/pipeline">Pipeline</b-dd-item>
							<b-dd-item to="/api/tasks">Tasks</b-dd-item>
						</b-nav-dropdown>
						<b-nav-dropdown text="Ecosystem">
							<b-dd-header>Official Packages</b-dd-header>
							<b-dd-item to="/ecosystem/webpack-task">Webpack Task</b-dd-item>
							<b-dd-item to="/ecosystem/process-task">Process Task</b-dd-item>
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

<style lang="less" scoped>
	@import 'colors';

	.navbar {
		background-color: @bg-dark;
	}
</style>

<style lang="less">
	@import 'document';
</style>
