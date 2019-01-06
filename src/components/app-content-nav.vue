<template>
	<div class="app-content-nav">
		<div v-for="(child, id) of target.children" :class="['depth-' + path.length]">
			<b-link @click="open(id)">{{child.title}}</b-link>
			<div class="children" v-if="child.children">
				<app-content-nav :target="child" :path="path.concat(id)"/>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			target: Object,
			path: Array
		},

		methods: {
			open(id) {
				this.$router.push('/' + this.path.concat(id).join('/'))
			}
		}
	}
</script>

<style lang="less" scoped>
	.app-content-nav {
		.children {
			padding-left: 12px;
		}
		.depth-0 {
			& > a {
				font-weight: 600;
			}
			& > .children {
				padding-bottom: 20px;
			}
		}
		.depth-1 {
			opacity: 0.7;
		}
	}
</style>
