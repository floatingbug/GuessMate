<script setup>
	import {onMounted, ref} from "vue";
	import router from "./router/index.js";
    import Navbar from './components/Navbar.vue'
    import HomeView from './views/HomeView.vue'

	const isSignedIn = ref(false);
	
	onMounted(()=>{
		//isSignedIn.value = localStorage.getItem("isSignedIn");
		if(isSignedIn.value){
			router.push("/");
		}
	});
</script>

<template>
    <header>
        <Navbar v-bind:isSignedIn="isSignedIn" />
    </header>

    <RouterView v-bind:isSignedIn="isSignedIn"/>
</template>

<style scoped>
    header {
		height: 10%;
    }
</style>
