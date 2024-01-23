<script setup>
import {ref, defineExpose} from "vue";
const currentSlide = ref(0);
const props = defineProps({
	itemCount: Number
});
defineExpose({
	currentSlide
});

function moveSlide(direction){
	if(direction === "right" && currentSlide.value < props.itemCount){
		currentSlide.value++;
	}
	if(direction === "left" && currentSlide.value > 0){
		currentSlide.value--;
	}
}
</script>

<template>
	<div class="carousel">
		<slot v-bind:currentSlide="currentSlide" />
		<Button class="left-toggle" severity="info" icon="pi pi-angle-left" text v-on:click="moveSlide('left')" />
		<Button class="right-toggle" severity="info" icon="pi pi-angle-right" text v-on:click="moveSlide('right')" />
	</div>
</template>

<style scoped>
.carousel {
	position: relative;
	border: 2px solid var(--primary-color);
	width: 100%;
	max-width: 70%;
	min-width: 320px;
	height: 50%;
	display: flex;
	flex-grow: 1;
}

.left-toggle, .right-toggle {
	position: absolute;
	top: 50%;
}

.right-toggle {
	right: 0;
}

.left-toggle {
	left: 0;
}

:deep(.p-button-icon) {
	font-size: 3rem;
	
}
@media(max-width: 1200px){
	.carousel {
		max-width: 100%;
	}
}
</style>
