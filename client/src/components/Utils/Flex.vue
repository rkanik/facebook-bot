<template>
	<div class="d-flex" :class="classes" @click="$emit('click')">
		<slot></slot>
	</div>
</template>

<script>
export default {
	name: 'd-flex',
	props: ['wrap', 'center'],
	computed: {
		classes() {
			return {
				wrap: this.wrap,
				'justify-center': this.center !== undefined
			};
		},
	},
};
</script>

<style lang='scss' scoped>
	.d-flex {
		display: flex;
		width: 100%;
		&.wrap {
			flex-wrap: wrap;
		}
	}
</style>
