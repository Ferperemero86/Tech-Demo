<template>
	<v-overlay>
		<v-container fluid>
			<v-row justify="center">
				<v-col cols="12">
					<v-card class="form-card">
						<v-card-title class="form-title">Add Todo</v-card-title>
						<v-card-text>
							<v-form @submit.prevent="updateForm">
								<v-text-field
									v-model="title"
									label="Title"
									required
								></v-text-field>
								<v-textarea
									v-model="description"
									label="Description"
									required
								></v-textarea>
								<div class="d-flex justify-space-between">
									<v-btn color="primary" type="submit">Add</v-btn>
									<v-btn @click="cancelForm">Cancel</v-btn>
								</div>
							</v-form>
						</v-card-text>
					</v-card>
				</v-col>
			</v-row>
		</v-container>
	</v-overlay>
</template>

<style scoped lang="scss">
.form-card {
	width: 300px;

	@media (min-width: 751px) {
		width: 400px;
	}
}
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

// All the form logic is in the parent homepage component and
// passed to the form for reusability
@Component({})
export default class TodoForm extends Vue {
	title = '';
	description = '';

	public cancelForm() {
		this.$emit('cancel-form');
	}

	public updateForm() {
		this.$emit('update-form', {
			title: this.title,
			description: this.description,
		});
	}
}
</script>

<style scoped lang="scss"></style>
