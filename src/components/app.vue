<template>
	<div>
		<b-navbar toggleable="sm" type="dark" fixed="top">
			<b-container>
				<b-navbar-toggle target="nav_collapse"/>
				<b-navbar-brand to="/">PhylumJS</b-navbar-brand>
				<b-collapse is-nav id="nav_collapse">
					<b-navbar-nav class="ml-auto">
						<b-nav-item to="/pipeline">Documentation</b-nav-item>
						<b-nav-item href="https://github.com/phylumjs" target="_blank">GitHub</b-nav-item>
					</b-navbar-nav>
				</b-collapse>
			</b-container>
		</b-navbar>
		<b-navbar><b-nav-item><br></b-nav-item></b-navbar>
		<div v-if="content">
			<b-container v-if="content.wrapper === undefined || content.wrapper" class="content-wrapper">
				<b-row>
					<b-col lg="3"><app-content-nav :target="root" :path="[]"/></b-col>
					<b-col><component :is="content"/></b-col>
				</b-row>
			</b-container>
			<component v-else :is="content"/>
		</div>
	</div>
</template>

<script>
	import content from '../content'
	import notFound from './app-not-found.vue'

	export default {
		watch: {
			$route: {immediate: true, handler: 'onNavigate'}
		},

		data() {
			return {
				content: null
			}
		},

		created() {
			this.root = content
		},

		methods: {
			onNavigate() {
				const path = this.$route.path
					.split('/')
					.filter(c => c.length)
					.map(decodeURIComponent)

				let page = content
				for (const component of path) {
					if (!(page = page.children && page.children[component])) {
						break
					}
				}

				if (page) {
					page.content().then(exports => {
						this.content = exports.default
					})
				} else {
					this.content = notFound
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	.content-wrapper {
		padding-top: 40px;
	}
	.navbar {
		background-color: rgb(35, 40, 45);
	}
	.app-content-nav {
		padding-bottom: 45px;
	}
</style>

<style lang="less">
	pre {
		padding: 13px 20px 12px;
		background-color: rgba(0, 0, 0, 0.05);
		border-radius: 5px;
	}
	*+h1 { padding-top: 40px; }
	*+h2 { padding-top: 25px; }
	*+h3 { padding-top: 20px; }
	*+h4 { padding-top: 15px; }
	*+h5 { padding-top: 10px; }
</style>
