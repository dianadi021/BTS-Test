<script setup>
	import { ref } from "vue";
	import axios from "axios";

	const token = sessionStorage.getItem("_token");
	const headers = { Authorization: `Bearer ${token}` };

	const isOpenModalTambahNote = ref(false);
	function openModalTambahNote() {
		isOpenModalTambahNote.value = !isOpenModalTambahNote.value;
	}

	const titleChecklist = ref("");
	async function simpanJudulNote() {
		try {
			const res = await axios.post(
				"http://94.74.86.174:8080/api/checklist",
				{
					name: titleChecklist.value,
				},
				{ headers }
			);

			const respone = res?.data;
			if (respone.statusCode == 2000 && respone.data) {
				alert(respone.message);
			}
		} catch (err) {
			alert("Gagal simpan judul note: " + err.response?.data?.message || err.message);
		}
	}

	const checklists = ref([]);
	(async function () {
		try {
			const res = await axios.get("http://94.74.86.174:8080/api/checklist", { headers });

			const respone = res?.data;
			if (respone.statusCode == 2100 && respone.data) {
				checklists.value = respone.data;
				alert(respone.message);
			}
		} catch (err) {
			alert("Gagal mengambil data note: " + err.response?.data?.message || err.message);
		}
	})();
</script>

<template>
	<div class="w-full flex justify-end p-3">
		<button class="inline-flex items-center px-4 py-2 bg-danger border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-danger focus:bg-danger active:bg-danger focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150">Logout</button>
	</div>

	<div class="w-full p-3">
		<div class="w-full">
			<h1>Dashboard</h1>
			<h2>Note Checklist</h2>
		</div>

		<div class="w-full flex gap-10">
			<button
				@click="openModalTambahNote"
				class="inline-flex items-center px-4 py-2 bg-success border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-success focus:bg-success active:bg-success focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150">
				Tambah
			</button>
		</div>

		<div class="w-full flex flex-wrap justify-center gap-10">
			<div
				v-if="checklists != 0"
				v-for="(checklist, index) in checklists"
				class="bg-white rounded-lg shadow-lg p-4 w-1/4">
				<div class="text-center">
					<h3 class="text-lg font-bold">{{ checklist.name }}</h3>
				</div>
				<div class="mt-2">
					<p class="text-sm text-gray-600">Daftar checklist:</p>
					<ul class="list-disc pl-4">
						<li
							v-for="(item, index) in checklist.items"
							:key="index">
							<input
								type="checkbox"
								:id="`item-${index}`" />
							<label :for="`item-${index}`">{{ item.name }}</label>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>

	<div
		v-show="isOpenModalTambahNote"
		class="fixed z-10 inset-0 overflow-y-auto">
		<div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
			<div
				class="fixed inset-0 transition-opacity"
				aria-hidden="true">
				<div class="absolute inset-0 bg-gray-500 opacity-75"></div>
			</div>

			<span
				class="hidden sm:inline-block sm:align-middle sm:h-screen"
				aria-hidden="true"
				>&#8203;</span
			>

			<div class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
				<div>
					<div class="text-center">
						<h3 class="text-lg leading-6 font-medium text-gray-900">Tambah Note Checklist</h3>
					</div>

					<div class="mt-2">
						<p class="text-sm text-gray-600">Apa ide inspirasimu hari ini?</p>
					</div>

					<div class="w-full">
						<form @submit.prevent="simpanJudulNote">
							<input
								v-model="titleChecklist"
								type="text"
								placeholder="Judul Note Checklist"
								class="border rounded-lg w-full px-3 py-2 focus:outline-none text-sm"
								required />

							<div class="flex gap-5 mt-5 sm:mt-6">
								<button
									type="submit"
									class="inline-flex items-center px-4 py-2 bg-primary border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-primary focus:bg-primary active:bg-primary focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150">
									Simpan
								</button>
								<button
									type="reset"
									class="inline-flex items-center px-4 py-2 bg-danger border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-danger focus:bg-danger active:bg-danger focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150">
									Reset
								</button>
								<button
									type="button"
									class="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm"
									@click="openModalTambahNote">
									Tutup
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
