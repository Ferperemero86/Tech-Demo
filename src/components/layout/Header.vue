<template>
	<div>
		<v-toolbar class="teal">
			<v-toolbar-title>
				<p class="ma-0 white--text">Todo List</p>
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

<style lang="scss"></style>
