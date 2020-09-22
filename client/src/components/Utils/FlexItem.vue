<template>
	<div class="flex-item" :style="styles" @click="$emit('click')">
		<slot></slot>
	</div>
</template>

<script>
export default {
	name: 'flex-item',
	props: ['w', 'mw'],
	computed: {
		styles() {
			const width = this.w || 100;
			let styles = `width:${width}%;`;
			if (this.mw) styles += `min-width:${this.mw}%;`;
			return styles;
		},
	},
};
</script>
