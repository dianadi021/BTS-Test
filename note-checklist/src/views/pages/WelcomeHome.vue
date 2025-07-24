<script setup>
	import { ref } from "vue";
	import LoginForm from "../../components/user/FormLogin.vue";
	import RegisterForm from "../../components/user/FormRegister.vue";

	const isLogin = ref(true);
	function togggleChangeFormView() { isLogin.value = !isLogin.value; }
</script>

<template>
	<div>
		<div class="flex justify-center mt-20">
			<div class="bg-white p-10 rounded-lg shadow-lg w-1/2">
				<div class="text-center mb-4">
					<h2 class="text-xl font-bold">
						{{ isLogin ? "Login" : "Register" }}
					</h2>
				</div>

				<div class="flex justify-around">
					<LoginForm
						v-if="isLogin"
						@togggleChangeFormView="togggleChangeFormView" />
					<RegisterForm
						v-else
						@togggleChangeFormView="togggleChangeFormView" />
				</div>
			</div>
		</div>
	</div>
</template>
