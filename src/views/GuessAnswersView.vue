<script setup>
import {ref, reactive, onMounted} from "vue";
import {useRouter} from "vue-router";
import apiCall from "../js/apiCall.js";
import Carousel from "../components/Carousel.vue";
const router = useRouter();
const quizState = reactive({
	quiz: null,
	currentQuestion: "",
	currentAnswers: "",
	guessAnswers: [],
	questionCount: 0,
});


onMounted(async ()=>{
	//get quiz
	const id = router.currentRoute.value.query.id;
	const request = {
		method: "GET",
		url: `/get-quiz?id=${id}`,
		withCredentials: true
	}

	try{
		const result = await apiCall(request);
		quizState.quiz = result.data.quiz;
		quizState.questionCount = quizState.quiz.length -1;
	}
	catch(err){
		console.log(err)
	}
});

</script>

<template>
	<Carousel v-slot="{currentSlide}" v-bind:itemCount="quizState.questionCount">
		<div class="slide-container" v-for="(quiz, index) in quizState.quiz">
			<div class="slide" v-if="index === currentSlide"> 
				{{quiz}}
			</div>
		</div>
	</Carousel>
</template>

<style scoped>
</style>
