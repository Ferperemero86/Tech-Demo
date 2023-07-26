<template>
	<div class="to-do-card">
		<v-card class="item-card" min-height="250" max-width="200">
			<v-menu offset-y>
				<template v-slot:activator="{ on }">
					<v-btn v-on="on" class="menu-button">
						{{ toDo.isCompleted ? 'Completed' : 'Active' }}
					</v-btn>
				</template>
				<v-list>
					<v-list-item @click="toggleStatus(!toDo.isCompleted)">
						{{ toDo.isCompleted ? 'Mark as Active' : 'Mark as Completed' }}
					</v-list-item>
				</v-list>
			</v-menu>
			<v-img
				height="100"
				src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
			></v-img>
			<v-card-title class="text-center">{{ toDo.title }}</v-card-title>
			<v-card-text>{{ toDo.description }}</v-card-text>
		</v-card>
	</div>
</template>

<script lang="ts">
//import { Todo } from '@/store';
import { Vue, Component, Prop } from 'vue-property-decorator';
import type { Todo } from '@/types';

@Component({})
export default class ToDoItemCard extends Vue {
	@Prop() readonly toDo!: Todo;

	public toggleStatus(isCompleted: boolean) {
		// Dispatch an action to update the isCompleted status in the store
		this.$store.dispatch('updateTodoStatus', { id: this.toDo.id, isCompleted });
	}
}
</script>

<style scoped lang="scss">
.to-do-card {
	@media (max-width: 550px) {
		width: 100%;
	}
}

.item-card {
	width: 100%;

	@media (min-width: 751px) {
		width: 300px;
	}
}
.menu-button {
	position: absolute;
	top: 0;
	right: 0;
	border-radius: 0;
	z-index: 9999;
}
</style>
