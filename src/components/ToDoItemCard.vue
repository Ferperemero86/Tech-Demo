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
				:src="toDo.imageUrl || 'https://via.placeholder.com/150'"
			>
				<v-btn icon rounded elevation="2" class="black" @click="openFileInput">
					<v-icon color="white">mdi-upload</v-icon>
				</v-btn>
			</v-img>
			<v-card-title class="text-center">{{ toDo.title }}</v-card-title>
			<v-card-text>{{ toDo.description }}</v-card-text>
		</v-card>
		<input
			type="file"
			ref="fileInputRef"
			style="display: none"
			accept="image/*"
			@change="handleImageUpload"
		/>
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
		this.$store.dispatch('updateTodoStatus', { id: this.toDo.id, isCompleted });
	}

	private get fileInputRef() {
		// Ensures the ref exists and is of the correct type
		return this.$refs.fileInputRef as HTMLInputElement;
	}

	public openFileInput() {
		// Opens the file input when the button is clicked
		this.fileInputRef.click();
	}

	public handleImageUpload(event: Event) {
		const input = event.target as HTMLInputElement;

		if (input.files && input.files.length > 0) {
			const file = input.files[0];
			const reader = new FileReader();

			reader.onload = (e) => {
				const imageData = e.target?.result as string;

				// Notifies the parent component to update the image URL
				this.$emit('update:imageUrl', imageData);

				// Updates the toDo.imageUrl property in this component
				this.toDo.imageUrl = imageData;
			};
			reader.readAsDataURL(file);
		}
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
