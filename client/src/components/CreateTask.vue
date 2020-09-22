<template>
	<div class="create-task">
		<v-card class="pa-5 pt-0" :loading="loading" :disabled="loading">
			<v-card-title class="pt-6">User Profile</v-card-title>
			<v-card-subtitle>Please fill up the form properly and then click create to create a task</v-card-subtitle>
			<v-card-text>
				<perfect-scrollbar class="create-task__scrollbar">
					<v-form ref="task-form" class="py-1">
						<v-subheader class="pl-0">BASICS</v-subheader>

						<!-- Task type -->
						<v-select
							:items="taskTypes"
							v-bind="defBind"
							v-model="task.type"
							name="task-type"
							label="Task Type"
						></v-select>

						<!-- Task name -->
						<v-text-field
							:rules="rules"
							v-bind="defBind"
							v-model="task.name"
							name="task-name"
							label="Task Name"
						></v-text-field>

						<!-- Task description -->
						<v-textarea
							rows="3"
							row-height="25"
							v-bind="defBind"
							v-model="task.description"
							name="task-description"
							label="Task Description (Optional)"
						></v-textarea>
						<v-subheader class="pl-0">TASK URLS</v-subheader>
						<div class="pl-8">
							<!-- Task Urls -->
							<v-text-field
								v-for="(url, ui) of task.urls"
								:key="ui"
								:rules="urlRules"
								v-bind="defBind"
								v-model="url.url"
							></v-text-field>
						</div>
						<v-subheader class="pl-0">MESSAGE</v-subheader>

						<!-- Task message -->
						<v-textarea
							rows="3"
							row-height="25"
							v-bind="defBind"
							v-model="task.message"
							name="task-message"
							label="Task Message"
							:rules="requiredRules"
						></v-textarea>

						<v-subheader class="pl-0">SCHEDULE</v-subheader>
						<d-flex class="py-2 pointer pr-1">
							<flex-item mw="75" @click="task.triggerOnce = !task.triggerOnce">
								<h5 class="subtitle-1">Trigger Once</h5>
								<p class="body-2 mb-0">Trigger once on specied time only.</p>
							</flex-item>
							<flex-item class="d-flex justify-end align-center">
								<v-switch v-model="task.triggerOnce"></v-switch>
							</flex-item>
						</d-flex>

						<v-datetime-picker
							v-if="task.triggerOnce"
							label="Select Datetime"
							v-model="task.trigger.datetime"
						>
							<template slot="dateIcon">
								<v-icon>{{$mdi.calendar}}</v-icon>
							</template>
							<template slot="timeIcon">
								<v-icon>{{$mdi.clock}}</v-icon>
							</template>
						</v-datetime-picker>

						<d-flex v-else>
							<v-menu
								ref="TimePicker"
								v-model="timePicker"
								:close-on-content-click="false"
								:nudge-right="40"
								:return-value.sync="task.trigger.time"
								transition="scale-transition"
								offset-y
								max-width="290px"
								min-width="290px"
							>
								<template v-slot:activator="{ on, attrs }">
									<v-text-field
										v-model="task.trigger.time"
										label="Time"
										readonly
										v-bind="{...attrs,...defBind}"
										v-on="on"
										class="mr-3"
										:rules="requiredRules"
									></v-text-field>
								</template>
								<v-time-picker
									full-width
									ampmInTitle
									v-if="timePicker"
									v-model="task.trigger.time"
									@click:minute="$refs.TimePicker.save(task.trigger.time)"
									:rules="requiredRules"
								></v-time-picker>
							</v-menu>
							<v-text-field
								v-bind="defBind"
								v-model="task.trigger.every.value"
								name="trigger-interval-value"
								label="Value"
								class="mr-3"
								:rules="requiredRules"
							></v-text-field>
							<v-select
								:items="triggerIntervalUnit"
								v-bind="defBind"
								v-model="task.trigger.every.unit"
								name="trigger-interval-unit"
								label="Unit"
							></v-select>
						</d-flex>
					</v-form>
				</perfect-scrollbar>
			</v-card-text>
			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn color="red darken-1" text @click="$emit('close')">Close</v-btn>
				<v-btn color="blue darken-1" text @click="handleClickCreate">Create</v-btn>
			</v-card-actions>
		</v-card>
	</div>
</template>

<script>

import { vUrl, vRequired, vLength } from '../helpers/validation'

export default {
	name: 'CreateTask',
	props: {
		loading: Boolean
	},
	data: () => ({
		e6: 1,
		rules: [vRequired(), vLength(5)],
		urlRules: [vUrl({
			checkEmpty: false
		})],
		requiredRules: [vRequired()],
		defBind: {
			dense: true,
			outlined: true,
			'hide-details': true,
			class: {
				'mb-3': true
			}
		},
		taskTypes: [
			{
				text: 'Post On Group',
				value: 'POST_ON_GROUP'
			},
			{
				text: 'Send Message',
				value: 'SEND_MESSAGE'
			}
		],
		triggerIntervalUnit: [
			{
				text: 'Hour',
				value: 'HOUR'
			},
			{
				text: 'Day',
				value: 'DAY'
			},
		],
		datePicker: false,
		timePicker: false,
		task: {
			name: '',
			type: 'POST_ON_GROUP',
			trigger: {
				every: {
					unit: 'DAY',
					value: 1
				},
				time: new Date().toJSON().split("T").pop().split(':').slice(0, 2).join(':'),
				datetime: new Date(),
			},
			urls: [
				{
					name: '',
					url: ''
				}
			],
			message: '',
			triggerOnce: true,

			running: false,
			done: false
		}
	}),
	watch: {
		task: {
			handler(task) {

				let allFilledUp = task.urls.every(({ url }) => url.trim() !== '')
				if (allFilledUp) {
					return this.task.urls.push({ url: '', name: '' })
				}

				let noOfEmptyField = task.urls.reduce(
					(count, { url }) => url.trim() === '' ? count + 1 : count, 0
				)
				if (noOfEmptyField > 1) {
					let filledUrls = task.urls.filter(({ url }) => url.trim() !== '')
					this.task.urls = [...filledUrls, { url: '', name: '' }]
				}
			},
			deep: true
		}
	},
	methods: {
		handleClickCreate() {

			// if (this.task.urls.length > 1)
			// 	this.task.urls = this.task.urls.filter(({ url }) => url.trim() !== '')

			// console.log(this.task.urls.filter(({ url }) => url.trim() !== ''));

			//this.task.urls.slice(0, this.task.urls.length - 1)

			this.$refs['task-form'].validate() &&
				this.$emit('create', this.task)
		}
	},
}
</script>

<style lang='scss' scoped>
	.create-task {
		&__scrollbar {
			height: 400px;
			margin-right: -1rem;
			padding-right: 1rem;
		}
	}
</style>