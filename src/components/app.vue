<template>
	<div>
		<b-navbar toggleable="sm" type="dark" variant="dark">
			<b-container>
				<b-navbar-toggle target="nav_collapse"/>
				<b-navbar-brand to="/">PhylumJS</b-navbar-brand>
				<b-collapse is-nav id="nav_collapse">
					<b-navbar-nav class="ml-auto">
						<!-- <b-nav-item to="/docs">Documentation</b-nav-item> -->
					</b-navbar-nav>
				</b-collapse>
			</b-container>
		</b-navbar>
		<b-container v-if="content" class="content">
			<div v-html="content"></div>
		</b-container>
	</div>
</template>

<script>
	import content from '../content'

	export default {
		watch: {
			$route: {immediate: true, handler: 'onNavigate'}
		},

		data() {
			return {
				content: ''
			}
		},

		methods: {
			onNavigate() {
				const path = this.$route.path
					.split('/')
					.filter(c => c.length)
					.map(decodeURIComponent)

				// TODO: Resolve path.
				content.content().then(exports => {
					this.content = exports.default
				})
			}
		}
	}
</script>

<style lang="less">
	.content {
		padding-top: 40px;
	}
</style>
