import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import type { Todo } from '@/types'; // Types are included in a single file for reusability

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
	},
	actions: {
		addToDo({ commit }, todo: Todo) {
			commit('setToDo', todo);
		},
	},
	modules: {},
};

export default new Vuex.Store<RootState>(storeOptions);
