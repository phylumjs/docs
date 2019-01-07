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
	</div>
</template>

<script>
	import content from './home-content'

	export default {
		components: {'home-content': content},
		wrapper: false
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
