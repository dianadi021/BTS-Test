<script setup>
	import { computed } from "vue";
	import { useStore } from "vuex";
	import WelcomeHome from "./views/pages/WelcomeHome.vue";
	import DashboardHome from "./views/pages/DashboardHome.vue";

	const store = useStore();
	const isLogin = computed(() => store.state.user.isLogin);
</script>

<template>
	<template v-if="isLogin">
		<router-view />
	</template>
	<template v-else>
		<WelcomeHome />
	</template>
</template>
