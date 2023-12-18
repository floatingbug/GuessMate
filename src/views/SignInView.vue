<script setup>
	import {ref, reactive} from "vue";
	import InputGroup from 'primevue/inputgroup';
	import InputGroupAddon from 'primevue/inputgroupaddon';
	import InputText from "primevue/inputtext";
	import InputNumber from "primevue/inputnumber";
	import apiCall from "../renderless-components/apiCall.js";

	const credentials = reactive({
		name: "",
		email: "",
		password: ""
	});

	async function signIn(){
		const request = {
			method: "post",
			url: "/sign-in",
			data: {name: username.value}
		};
		const result = await apiCall(request);
	}

</script>

<template>
	<div class="sign-container">
		<h1>Sign in</h1>
		<div class="user-input-container">
			<InputGroup>
				<InputGroupAddon>
					<i class="pi pi-user"></i>
				</InputGroupAddon>
				<InputText placeholder="Username or Email" v-model="credentials.name" />
			</InputGroup>
			<InputGroup>
				<InputGroupAddon>
					<i class="pi pi-user"></i>
				</InputGroupAddon>
				<InputText placeholder="Password" v-model="credentials.password" />
			</InputGroup>
			<Button label="Sign in" v-on:click="signIn" />
		</div>
	</div>
</template>

<style scoped>
.sign-container {
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: 10%;
}

.user-input-container {
	width: 100%;
	max-width: 500px;
	display: flex;
	flex-direction: column;
	gap: 20px;
}

.user-input-container>Button {
	width: 100%;
}

@media(max-width: 472px){
	.user-input-container {
		max-width: 300px;
	}
}

@media(max-width: 350px){
	.user-input-container {
		max-width: 250px;
	}
}
</style>
