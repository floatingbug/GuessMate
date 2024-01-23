<script setup>
	import {reactive, ref, onMounted} from "vue";
	import InputGroup from 'primevue/inputgroup';
	import InputGroupAddon from 'primevue/inputgroupaddon';
	import InputText from "primevue/inputtext";
	import InputNumber from "primevue/inputnumber";
	import Password from "primevue/password";
	import apiCall from "../js/apiCall.js";

	const credentials = reactive({
		name: "",
		email: "",
		password: ""
	});

	const msg = ref("");
	const isSignedUp = ref(false);
	const isEmailConfirmed = ref(false);

	onMounted(()=>{
		if(localStorage.getItem("isEmailConfirmed")){
			isEmailConfirmed.value = true;
			$router.push("/");
		}
		if(localStorage.getItem("isSignedUp")){
			isSignedUp.value = true;
		}
	});

	async function signUp(){
		const request = {
			method: "post",
			url: "/sign-up",
			data: credentials
		};

		const result = await apiCall(request);
		if(result.success){
			localStorage.setItem("isSignedUp", true);
			isSignedUp.value = true;
			msg.value = result.msg;
		}
	}
</script>

<template>
	<div class="sign-container" v-if="!isSignedUp">
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

	<div class="show-confirm-email-msg" v-if="isSignedUp">
		<div>Please confirm your e-mail.</div>
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

.show-confirm-email-msg {
	display: flex;
	justify-content: center;
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
