<script setup>
    import {ref, toRef, onMounted} from 'vue'
	import router from "../router/index.js";
	import Menubar from "primevue/menubar";
	import Menu from "primevue/menu";

	const items = ref([
		{
			label: "Answer questions"
		},
		{
			label: "Guess questions"
		}
	]);
	const user = ref([
		{
			label: "Profile",
		},
		{
			label: "logout"
		}
	]);
	const menu = ref();
	const isResponsiveMode = ref(true);

	onMounted(()=>{
		if(isSignedIn.value){
			isResponsiveMode.value = true;
		}
		else{
			isResponsiveMode.value = false;
		}
	});
	
	function toggle(event) {
		menu.value.toggle(event);
	};
	
	const props = defineProps(["isSignedIn"]);
	const isSignedIn = toRef(props.isSignedIn);
</script>

<template>
	<Menubar v-bind:model="items" breakpoint="1000px">
		<template #start>
			GuessMate
		</template>

		<template #item="{item}">
			<div v-if="isSignedIn">
				<Button link size="large">{{item.label}}</Button>
			</div>
		</template>

		<template #end>
			<div class="user-container" v-if="isSignedIn">
				<Button type="button" icon="pi pi-user" @click="toggle" aria-haspopup="true" aria-controls="overlay_menu" />
			   	<Menu ref="menu" id="overlay_menu" :model="user" :popup="true" />
			</div>
			<div class="sign-container" v-if="!isSignedIn">
				<Button label="Sign in" link v-on:click="$router.push('/sign-in')" />
				<Button label="Sign up" link v-on:click="$router.push('/sign-up')" />
			</div>
		</template>

		<template #menubuttonicon>
			<i v-if="isResponsiveMode" class="pi pi-bars" style="font-size: 2rem"/>
			<i v-if="!isResponsiveMode"/>
		</template>
	</Menubar>
</template>

<style scoped>
.p-menubar{
}

:deep(.p-menubar-root-list) {
	width: 100%;
	min-width: 0;
	max-width: 390px;
	justify-content: space-between;
	margin-left: 10%;
}

:deep(.p-menubar-start) {
	font-size: 2rem;
	min-width: 180px;
	flex-shrink: 0;
}

:deep(.p-menubar-end) {
	width: 100%;
	max-width: 70px;
	display: flex;
	justify-content: flex-end;
	flex-shrink: 0;
}

.sign-container {
	max-width: 140px;
	display: flex;
	justify-content: space-between;
	margin-left: auto;
}

.sign-container>* {
	padding: 0;
}

.user-container {
	max-width: 150px;
}
</style>
