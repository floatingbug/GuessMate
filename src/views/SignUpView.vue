<script setup>
	import {reactive} from "vue";
	import InputGroup from 'primevue/inputgroup';
	import InputGroupAddon from 'primevue/inputgroupaddon';
	import InputText from "primevue/inputtext";
	import InputNumber from "primevue/inputnumber";
	import Password from "primevue/password";
	import apiCall from "../renderless-components/apiCall.js";

	const credentials = reactive({
		name: "",
		email: "",
		password: ""
	});

	async function signUp(){
		const request = {
			method: "post",
			url: "/sign-up",
			data: credentials
		};

		const result = await apiCall(request);
		if(result.success){

		}
	}
</script>

<template>
	<div class="sign-container">
		<h1>Sign up</h1>
		<div class="user-input-container">
			<InputGroup>
				<InputGroupAddon>
					<i class="pi pi-user"></i>
				</InputGroupAddon>
				<InputText placeholder="Username" v-model="credentials.name" />
			</InputGroup>
			<InputGroup>
				<InputGroupAddon>
					<i class="pi pi-envelope"></i>
				</InputGroupAddon>
				<InputText placeholder="Email" v-model="credentials.email" />
			</InputGroup>
			<InputGroup>
				<InputGroupAddon>
					<i class="pi pi-eye-slash"></i>
				</InputGroupAddon>
				<Password placeholder="Password" v-model="credentials.password" />
			</InputGroup>
			<Button label="Sign up" v-on:click="signUp" />
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
