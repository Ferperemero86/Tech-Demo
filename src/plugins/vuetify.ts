import Vue from 'vue';
import Vuetify from 'vuetify';

Vue.use(Vuetify);

// Modified theme structure to get theme colors
export default new Vuetify({
	iconfont: 'md',
	theme: {
		options: {
			customProperties: true,
		},
		themes: {
			light: {
				primary: '#4fa928',
				primaryDark: '#326918',
				secondary: '#673ab7',
				accent: '#83db59',
				error: '#D2232A',
				yellow: '#FFCC00',
				brown: '#654321',
			},
		},
	},
});
