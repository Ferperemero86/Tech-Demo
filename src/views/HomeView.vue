<template>
	<div class="home">
		<div class="hero">
			<h1 class="text-center">Todo List</h1>
			<div class="hero__buttons">
				<v-btn :color="primaryDark" @click="showForm">
					<v-icon color="white">mdi-plus</v-icon>
				</v-btn>
				<v-btn :color="brown" class="white--text" @click="getRandomTodo"
					>Random Todo</v-btn
				>
			</div>
		</div>
		<div class="cards">
			<div class="cards__section">
				<h2 class="text-h6 mb-8">Active</h2>
				<div class="cards__wrapper">
					<ToDoItemCard
						v-for="todo in getActiveTodos()"
						:key="todo.id"
						:toDo="todo"
						@edit-todo="editTodo"
						@delete-todo="deleteTodo"
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
						:imageUrl="todo.imageUrl"
						@edit-todo="editTodo"
						@delete-todo="deleteTodo"
					/>
				</div>
			</div>
		</div>
		<TodoForm
			v-if="isFormVisible"
			@cancel-form="hideForm"
			@update-form="submitForm"
			:isEditing="isEditing"
		/>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ToDoItemCard from '@/components/ToDoItemCard.vue';
import TodoForm from '@/components/ToDoForm.vue';
import makeRequest from '@/api';

import { Todo, FormData } from '@/types';

@Component({
	components: { ToDoItemCard, TodoForm },
})
export default class HomeView extends Vue {
	isFormValid = false;
	isFormVisible = false;
	isEditing = false;

	primaryDark = this.$vuetify.theme.themes.light.primaryDark;
	brown = this.$vuetify.theme.themes.light.brown;

	public editTodo() {
		this.isEditing = true;
		this.isFormVisible = true;
	}

	public deleteTodo(todo: Todo) {
		this.$store.dispatch('deleteToDo', todo);
	}

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
		this.isEditing = false;
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

	public async getRandomTodo() {
		const randomNumber = Math.floor(Math.random() * (100 - 1 + 1)) + 1;
		const url = `https://jsonplaceholder.typicode.com/todos/${randomNumber}`;
		// Fetch Api data
		// Allows any data as one property does not mach Todo structure
		const data = await makeRequest<any>('GET', url);
		const { id, title, description, completed, imageUrl } = data;

		if (data) {
			//Here we make sure our new Todo has the right structure
			const randomTodo: Todo = {
				id,
				title,
				description,
				isCompleted: completed, // Changes completed property to isCompleted to mach theTodo structure
				imageUrl,
			};

			randomTodo.id = this.$store.getters.todos.length + 1; // Adds the next id in the list

			this.$store.dispatch('addToDo', randomTodo);
		}
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

		if (this.isEditing) {
			this.$store.dispatch('editToDo', todo);
		} else {
			this.$store.dispatch('addToDo', todo);
		}
		this.hideForm();
	}
}
</script>

<style scoped lang="scss">
.home {
	width: 90%;
	max-width: 1500px;
	margin: 0 auto;
	padding-bottom: 50px;
}

.hero {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	margin: 30px auto;
	max-width: 500px;

	&__buttons {
		margin-top: 30px;
		display: flex;
		column-gap: 50px;
	}
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
