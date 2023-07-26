<template>
	<div class="to-do-card">
		<v-card class="item-card" min-height="250" max-width="200">
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
	//toggleStatus(): void {}
	@Prop() readonly toDo!: Todo;
}
</script>

<style lang="scss"></style>
