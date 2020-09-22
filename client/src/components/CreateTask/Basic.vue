<template>
	<div class="Basic">
		<v-select
			:items="taskTypes"
			v-bind="defBind"
			v-model="task.type"
			name="task-type"
			label="Task Type"
		></v-select>
		<v-text-field v-bind="defBind" v-model="task.name" name="task-name" label="Task Name"></v-text-field>

		<v-textarea
			rows="3"
			row-height="25"
			v-bind="defBind"
			v-model="task.description"
			name="task-description"
			label="Task Description (Optional)"
		></v-textarea>
	</div>
</template>

<script>
export default {
	name: 'Basic',
    
}
</script>

<style lang='scss' scoped>
	.Basic {
	}
</style>