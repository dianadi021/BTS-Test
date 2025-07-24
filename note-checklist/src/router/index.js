import { createRouter, createWebHistory } from "vue-router";

import WelcomeHome from "../views/pages/WelcomeHome.vue";
import DashboardHome from "../views/pages/DashboardHome.vue";

const routes = [
	{
		path: "/",
		name: "WelcomeHome",
		component: WelcomeHome,
		meta: { guest: true, requiresAuth: false },
	},
	{
		path: "/dashboard",
		name: "DashboardHome",
		component: DashboardHome,
		meta: { requiresAuth: true },
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

router.beforeEach((to, from, next) => {
	const isAuthenticated = !!sessionStorage.getItem("_token");

	if (to.meta.requiresAuth && !isAuthenticated) {
		return next({ name: "WelcomeHome" });
	}

	if (to.meta.guest && isAuthenticated) {
		return next({ name: "DashboardHome" });
	}

	next();
});

export default router;
