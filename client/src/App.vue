<template>
	<v-app>
		<v-main>
			<router-view />
		</v-main>
	</v-app>
</template>

<script>
export default {
	name: 'App',
	created() {

		this.$vuetify.theme.dark = true

		let timeout

		this.$bus.$on('theme', ({ dark = true }) => {
			this.$vuetify.theme.dark = dark
		})

		this.$bus.$on('dialog-open', () => {
			if (timeout) {
				this.removeAttr(['data-dialog-open', 'data-dialog-close'])
				clearTimeout(timeout)
			}
			document.body.setAttribute('data-dialog-open', true)
		})

		this.$bus.$on('dialog-close', () => {
			document.body.setAttribute('data-dialog-close', true)
			timeout = setTimeout(() => {
				this.removeAttr([
					'data-dialog-open',
					'data-dialog-close'
				])
			}, 500);
		})
	},
	methods: {
		removeAttr(attrs, el = document.body) {
			attrs = Array.isArray(attrs) ? attrs : [attrs]
			attrs.forEach(attr => el.removeAttribute(attr))
		}
	},
};
</script>
