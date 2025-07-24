<script setup>
	import { ref, onMounted } from "vue";
	import { useRoute } from "vue-router";
	import axios from "axios";

    const token = sessionStorage.getItem("_token");
	const headers = { Authorization: `Bearer ${token}` };

	const route = useRoute();
	const noteId = route.params.id;

	const dataNote = ref(null);
	onMounted(async () => {
		try {
			const res = await axios.get(`http://94.74.86.174:8080/api/checklist/${noteId}/item`, { headers });
			dataNote.value = res.data;
		} catch (err) {
			alert("Gagal mengambil data note: " + err.response?.data?.message || err.message);
		}
	});
</script>

<template>
	<div></div>
</template>
