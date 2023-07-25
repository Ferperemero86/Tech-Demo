<template>
	<div></div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import ToDoItemCard from '../components/ToDoItemCrad.vue';
//import store, { Todo } from '@/store';

@Component({})
export default class HomeView extends Vue {
	//public todoToAdd: Todo = {
	//	title: '',
	//	description: '',
	//	id: 0,
	//	isCompleted: false,
	//	imageUrl: '',
	//};

	isFormValid = false;

	public addToDoItem(): void {
		if (!this.isFormValid) {
			return;
		}
	}
}
</script>

<style lang="scss"></style>
