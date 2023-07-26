<template>
	<div class="teal">
		<v-toolbar class="px-20 mx-auto teal" flat max-width="1400">
			<v-toolbar-title>
				<p class="ma-0 white--text">Todo App</p>
			</v-toolbar-title>
			<v-spacer></v-spacer>
			<div>
				<p class="ma-0 white--text">Tech Demo</p>
			</div>
		</v-toolbar>
	</div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({})
export default class Header extends Vue {}
</script>

<style scoped lang="scss"></style>
