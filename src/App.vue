<script setup>
	import {onMounted, ref} from "vue";
	import router from "./router/index.js";
    import Navbar from './components/Navbar.vue'
    import HomeView from './views/HomeView.vue'
	import checkIfIsSignedIn from "./js/checkIfIsSignedIn.js";
	import eventBus from "./js/eventBus.js";
	
	onMounted(()=>{
		if(checkIfIsSignedIn()){
			eventBus.isSignedIn = true;
		}
	});

</script>

<template>
    <header>
        <Navbar />
    </header>

    <RouterView />
</template>

<style scoped>
    header {
		width: 100%;
    }
</style>
