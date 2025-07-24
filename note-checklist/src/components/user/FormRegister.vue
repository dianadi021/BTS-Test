<script setup>
	import { ref } from "vue";
	import axios from "axios";

	const email = ref("");
	const username = ref("");
	const password = ref("");
	async function userOnRegister() {
		try {
			const res = await axios.post("http://94.74.86.174:8080/api/register", {
				email: email.value,
				username: username.value,
				password: password.value,
			});
			
			const response = res?.data;
			if (response.statusCode == 2000) {
				alert("Register sukses, silakan login.");
                window.location.reload();
			}
		} catch (err) {
			alert("Gagal register: " + err.response?.data?.message || err.message);
		}
	}
</script>

<template>
	<form @submit.prevent="userOnRegister">
		<div class="flex gap-10">
			<input
				v-model="email"
				type="email"
				placeholder="Email"
				class="border rounded-lg w-full px-3 py-2 focus:outline-none text-sm"
				required />
			<input
				v-model="username"
				type="text"
				placeholder="Username"
				class="border rounded-lg w-full px-3 py-2 focus:outline-none text-sm"
				required />
			<input
				v-model="password"
				type="password"
				placeholder="Password"
				class="border rounded-lg w-full px-3 py-2 focus:outline-none text-sm"
				required />

			<button
				type="submit"
				class="inline-flex items-center px-4 py-2 bg-primary border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-primary focus:bg-primary active:bg-primary focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150">
				Register
			</button>
		</div>

		<p class="mt-4 text-sm text-center">
			Sudah punya akun?
			<a
				href="#"
				@click.prevent="$emit('togggleChangeFormView')"
				class="text-blue-500"
				>Login di sini</a
			>
		</p>
	</form>
</template>
