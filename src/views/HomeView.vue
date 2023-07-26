<template>
	<div class="home">
		<div class="hero">
			<h1 class="text-center">Todo List</h1>
			<v-btn class="blue white--text" @click="addToDoItem">
				<v-icon>mdi-plus</v-icon>
			</v-btn>
		</div>
		<div class="cards">
			<div class="cards__section">
				<h2 class="text-h6 mb-8">Active</h2>
				<div class="cards__wrapper">
					<ToDoItemCard
						v-for="todo in getActiveTodos()"
						:key="todo.id"
						:toDo="todo"
					/>
				</div>
			</div>
			<div class="cards__section">
				<h2 class="text-h6 mb-8">Completed</h2>
				<div class="cards__wrapper">
					<ToDoItemCard
						v-for="todo in getCompletedTodos()"
						:key="todo.id"
						:toDo="todo"
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import ToDoItemCard from '../components/ToDoItemCard.vue';

import { Todo } from '@/types';

@Component({
	components: { ToDoItemCard },
})
export default class HomeView extends Vue {
	public todoToAdd: Todo = {
		title: 'Card 1',
		description: 'Test',
		id: 1,
		isCompleted: false,
		imageUrl: '',
	};

	public getActiveTodos() {
		return this.$store.getters.activeTodos;
	}

	public getCompletedTodos() {
		return this.$store.getters.completedTodos;
	}

	isFormValid = false;

	public addToDoItem(): void {
		console.log('click');
		this.$store.dispatch('addToDo', this.todoToAdd);
		//if (!this.isFormValid) {
		//	return;
		//}
	}
}
</script>

<style scoped lang="scss">
.home {
	width: 90%;
	max-width: 1500px;
	margin: 0 auto;
}

.hero {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin: 30px auto;
	max-width: 800px;
}

.to-do-card {
	margin-top: 30px;
}

.cards {
	width: 100%;
	display: flex;
	justify-content: space-between;

	&__section {
		flex-wrap: wrap;
		width: 45%;
	}

	&__wrapper {
		display: flex;
		column-gap: 20px;
		flex-wrap: wrap;
	}
}
</style>
