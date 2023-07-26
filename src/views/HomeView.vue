<template>
	<div class="home">
		<div class="hero">
			<h1 class="text-center">Todo List</h1>
			<v-btn class="blue white--text" @click="showForm">
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
		<TodoForm
			v-if="isFormVisible"
			@cancel-form="hideForm"
			@update-form="submitForm"
		/>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ToDoItemCard from '@/components/ToDoItemCard.vue';
import TodoForm from '@/components/ToDoForm.vue';

import type { Todo, FormData } from '@/types';

@Component({
	components: { ToDoItemCard, TodoForm },
})
export default class HomeView extends Vue {
	isFormValid = false;
	isFormVisible = false;

	public getActiveTodos() {
		return this.$store.getters.activeTodos;
	}

	public getCompletedTodos() {
		return this.$store.getters.completedTodos;
	}

	public showForm() {
		this.isFormVisible = true;
	}

	public hideForm() {
		this.isFormVisible = false;
	}

	public validateForm(formData: FormData) {
		// Validate the form fields
		if (!formData.title || !formData.description) {
			alert('Please fill in both Title and Description fields.');
			return;
		}

		// Check if the title already exists in the todos array
		const existingTodo = this.$store.getters.todos.find(
			(todo: Todo) => todo.title === formData.title
		);
		if (existingTodo) {
			alert('A todo with the same title already exists.');
			return;
		}

		this.isFormValid = true;
	}

	// Runs form validation and adds task if data is valid.
	public submitForm(formData: FormData) {
		const { title, description } = formData;

		this.isFormValid = false;

		this.validateForm(formData);

		if (!this.isFormValid) {
			return;
		}

		const todo: Todo = {
			title,
			description,
			id: this.$store.getters.todos.length + 1, // Assign a unique ID based on the number of existing todos
			isCompleted: false,
			imageUrl: '',
		};

		this.$store.dispatch('addToDo', todo);
		this.hideForm();
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
