<template>
	<v-container>
		<div class="home">
			<div class="text-center pa-5">
				<v-btn class="mx-2" color="primary" @click="fetchTasks">Fetch tasks</v-btn>
				<v-btn
					class="mx-2"
					color="success"
					@click="createTaskDialog=true,$bus.$emit('dialog-open')"
				>Create task</v-btn>
			</div>

			<div class="masonry pa-3" data-col="4">
				<div class="masonry__item" v-for="task in $tasks" :key="task.id">
					<v-card class="task-card" :class="{'overlay-open': confirmTaskDelete === task.id}" outlined>
						<div class="task-card__content">
							<!-- Start Top Right Buttons -->
							<div class="task-card__top_right_btns">
								<v-btn icon small class="task-card__edit mr-2 grey darken-2">
									<v-icon size="16">{{$mdi.edit}}</v-icon>
								</v-btn>
								<v-btn
									icon
									small
									class="task-card__delete grey darken-2"
									@click="confirmTaskDelete = task.id"
								>
									<v-icon size="16">{{$mdi.del}}</v-icon>
								</v-btn>
							</div>
							<!-- End Top Right Buttons -->

							<v-card-title>{{task.title || 'Task title'}}</v-card-title>
							<v-card-subtitle>{{taskRunAt(task.postAt)}}</v-card-subtitle>
							<v-card-text>
								<v-list dense>
									<v-subheader>GROUPS</v-subheader>
									<v-list-item v-for="(group, i) in task.groups" :key="i">
										<v-list-item-content>
											<v-list-item-title v-text="group"></v-list-item-title>
										</v-list-item-content>
									</v-list-item>
								</v-list>
								<v-subheader>POST</v-subheader>
								{{task.post}}
							</v-card-text>
						</div>
						<div class="task-card__overlay">
							<div class="task-card__delete-actions">
								<v-btn fab dark small color="teal" class="task-card__delete-confirm mx-2">
									<v-icon>{{$mdi.check}}</v-icon>
								</v-btn>
								<v-btn
									fab
									dark
									small
									color="error"
									class="task-card__close mx-2"
									@click="confirmTaskDelete=null"
								>
									<v-icon>{{$mdi.close}}</v-icon>
								</v-btn>
							</div>
						</div>
					</v-card>
				</div>
			</div>
		</div>
		<v-dialog v-model="createTaskDialog" persistent max-width="600px">
			<CreateTask
				:loading="taskCreating"
				@close="createTaskDialog=false,$bus.$emit('dialog-close')"
				@create="handleCreateTask"
			/>
		</v-dialog>
	</v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import moment from 'moment'

// Components
import CreateTask from '@/components/CreateTask'

export default {
	name: 'Home',
	data: () => ({
		createTaskDialog: false,
		taskCreating: false,
		confirmTaskDelete: null
	}),
	components: {
		CreateTask
	},
	computed: {
		...mapGetters(['$tasks'])
	},
	methods: {
		...mapActions(['fetchTasks']),
		taskRunAt(time) {
			return moment(time).calendar()
		},
		handleCreateTask(task) {
			console.log(task);
		}
	},
}
</script>
<style lang="scss">
	.home {
		padding: 4rem 0;
	}
	.task-card {
		overflow: hidden;

		&__content {
			transition: filter 300ms ease-in-out;
			filter: blur(0px);
		}

		&__top_right_btns {
			position: absolute;
			top: 1rem;
			right: 1rem;
		}

		&__overlay {
			position: absolute;
			top: 0;
			left: 0;
			height: 100%;
			width: 100%;
			background-color: #1e1e1e9c;
			opacity: 0;
			visibility: hidden;
			transition: all 200ms ease-in-out;
			display: grid;
			place-items: center;
		}

		&__edit,
		&__close,
		&__delete,
		&__delete-confirm {
			transition: transform 400ms ease-in-out;
			transform: scale(0);
		}

		&__delete,
		&__close {
			transition-delay: 100ms;
		}

		&:hover {
			&:not(.overlay-open) {
				.task-card__delete,
				.task-card__edit {
					transform: scale(1);
				}
			}
		}

		&.overlay-open {
			.task-card__content {
				filter: blur(3px);
			}
			.task-card__overlay {
				opacity: 1;
				visibility: visible;
			}
			.task-card__delete-confirm,
			.task-card__close {
				transform: scale(1);
			}
		}
	}
</style>