import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import type { Todo, CardMenu } from '@/types'; // Types are included in a single file for reusability

Vue.use(Vuex);

// Define the type for your state
export interface RootState {
	activeTodos: Todo[];
	completedTodos: Todo[];
	todos: Todo[];
}

// Define the type for your root store
const storeOptions: StoreOptions<RootState> = {
	state: {
		todos: [],
		activeTodos: [],
		completedTodos: [],
	},
	getters: {
		todos: (state) => {
			return state.todos;
		},
		activeTodos: (state) => {
			return state.todos.filter((todo) => !todo.isCompleted);
		},
		completedTodos: (state) => {
			return state.todos.filter((todo) => todo.isCompleted);
		},
	},
	mutations: {
		setToDo(state, todo: Todo) {
			state.todos.push(todo);
		},
		// Gets the card found in the state in the action logic and updates its status
		setTodoStatus(state, { isCompleted, todo }: CardMenu) {
			if (todo) {
				todo.isCompleted = isCompleted;
			}
		},
		setTodoImage(state, { imageUrl, todo }) {
			if (todo) {
				todo.imageUrl = imageUrl;
			}
		},
	},
	actions: {
		addToDo({ commit }, todo: Todo) {
			commit('setToDo', todo);
		},
		//Finds card and calls mutation to update the card status
		updateTodoStatus({ commit, state }, { id, isCompleted }: CardMenu) {
			const todo = state.todos.find((todo) => todo.id === id);
			if (todo) {
				commit('setTodoStatus', { isCompleted, todo });
			}
		},
		updateTodoImage({ commit, state }, { id, imageUrl }) {
			const todo = state.todos.find((todo) => todo.id === id);

			commit('setTodoImage', { imageUrl, todo });
		},
	},
	modules: {},
};

export default new Vuex.Store<RootState>(storeOptions);
