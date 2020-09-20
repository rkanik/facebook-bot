<template>
	<div class="home">
		<v-btn color="primary" @click="fetchTasks">Fetch tasks</v-btn>
		{{$tasks}}
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
	name: 'Home',
	methods: {
		...mapActions(['fetchTasks'])
	},
	computed: {
		...mapGetters(['$tasks'])
	},
}
</script>
