import { createRouter, createWebHistory } from "vue-router";

// User SECTION Start
import UserLogin from "../components/views/user/FormLogin.vue";
import UserRegister from "../components/views/user/FormRegister.vue";
// User SECTION End

// import Dashboard from "../views/Dashboard.vue";
// import Admin from "../views/Admin.vue";

const routes = [
	{
		path: "/login",
		name: "Login",
		component: UserLogin,
		meta: { guest: true },
	},
	{
		path: "/register",
		name: "Register",
		component: UserRegister,
		meta: { guest: true },
	},
	// {
	// 	path: "/",
	// 	name: "Dashboard",
	// 	component: Dashboard,
	// 	meta: { requiresAuth: true },
	// },
	// {
	// 	path: "/admin",
	// 	name: "Admin",
	// 	component: Admin,
	// 	meta: { requiresAuth: true, roles: ["admin"] },
	// },
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

router.beforeEach((to, from, next) => {
	const isAuthenticated = !!localStorage.getItem("token");
	const userRole = localStorage.getItem("role"); // contoh: 'admin', 'user'

	if (to.meta.requiresAuth && !isAuthenticated) {
		return next({ name: "Login" });
	}

	// if (to.meta.roles && !to.meta.roles.includes(userRole)) {
	// 	return next({ name: "Dashboard" }); // atau ke 'Unauthorized.vue'
	// }

	// if (to.meta.guest && isAuthenticated) {
	// 	return next({ name: "Dashboard" });
	// }

	next();
});
