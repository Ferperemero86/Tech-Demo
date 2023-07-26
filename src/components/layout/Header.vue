<template>
	<div class="wrapper">
		<v-toolbar
			class="px-20 mx-auto"
			flat
			max-width="1400"
			:color="primaryColor"
		>
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
export default class Header extends Vue {
	primaryColor = this.$vuetify.theme.themes.light.primary;
}
</script>

<style scoped lang="scss">
.wrapper {
	width: 100%;
	background: #4fa928;
}
</style>
