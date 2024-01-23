<script setup>
    import {ref, onMounted, toRef, watch} from 'vue'
	import {useRouter} from "vue-router";
	import Menubar from "primevue/menubar";
	import Menu from "primevue/menu";
	import checkIfIsSignedIn from "../js/checkIfIsSignedIn.js";
	import eventBus from "../js/eventBus.js";

	const router = useRouter();
	const isSignedIn = ref(false);
	const items = ref([
		{
			label: "Add Quiz",
			command: ()=>{
				router.push("/add-quiz");
			}
		},
		{
			label: "Quizzes",
			items: [
				{
					label: "completed-quizzes",
					command: ()=>{
						router.push("/completed-quizzes");
					}
				}
			]
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
	const isResponsiveMode = ref(false);

	watch(()=> eventBus.isSignedIn, (oldValue, newValue)=>{
		if(checkIfIsSignedIn()){
			isResponsiveMode.value = true;
			isSignedIn.value = true;
		}
		else{
			isResponsiveMode.value = false;
		}
	});

	function toggle(event) {
		menu.value.toggle(event);
	};
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
	height: 60px;
}

:deep(.p-menubar-root-list) {
	width: 100%;
	min-width: 0;
	max-width: 330px;
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
