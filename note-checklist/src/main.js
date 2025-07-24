import { createApp } from "vue";
import { createStore } from "vuex";

const store = createStore({
	state() {
		return {
			user: {
				_token: sessionStorage.getItem("_token"),
				isLogin: !!sessionStorage.getItem("_token")
			},
		};
	},
});

import "./style.css";
import App from "./App.vue";
import router from "./router";

createApp(App).use(router).use(store).mount("#app");
