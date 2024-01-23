<script setup>
import {onMounted, ref, reactive} from "vue";
import apiCall from "../js/apiCall.js";
import Carousel from "../components/Carousel.vue";
import Paginator from 'primevue/paginator';
const refCarousel = ref(null);
const quizState = reactive({
	quizzes: [],
	currentQuiz: [],
	quizCount: 0,
	quizNumber: 1
});
const textToCopy = ref(null);
const API_URL = "http://localhost:3000"

onMounted(async()=>{
	const token = localStorage.getItem("token");
	const request = {
		method: "GET",
		url: "/get-all-quizzes",
		headers: {
			"Authorization": token,
		},
	}

	try{
		const result = await apiCall(request);
		quizState.quizzes = result.data;
		quizState.ids = result.data.map(item=>item.id);
		quizState.currentId = quizState.ids[0];
		quizState.quizCount = quizState.quizzes.length;
		quizState.currentQuiz = quizState.quizzes[0].quiz;
		quizState.questionCount = quizState.currentQuiz.length;
	}
	catch(err){
		console.log(err);
	}
});
function switchQuizzes(index){
	quizState.currentQuiz = quizState.quizzes[index].quiz;
	refCarousel.value.currentSlide = 0;
	quizState.quizNumber = index+1;
	quizState.currentId = quizState.ids[index];
}
function copyText(){
	const textArea = document.createElement("textarea");
	textArea.value = textToCopy.value.innerText;
	
	document.body.appendChild(textArea);
	textArea.select();
	document.execCommand("copy");
	document.body.removeChild(textArea);
}
function changeAnswer(index){
}
</script>

<template>
	<div class="link-share">
		<h3>Share this link so friends can take a guess at your answers: </h3>
		<span ref="textToCopy">{{`http://localhost:5173/guess-answers?id=${quizState.currentId}`}}</span>
		<Button severity="primary" size="small" v-on:click="copyText">Copy to Clipboard</Button>
	</div>

	<Carousel ref="refCarousel" class="carousel" v-slot="{currentSlide}" v-bind:itemCount="quizState.questionCount-1"> 
		<div class="slide-container" v-for="(quiz, index) in quizState.currentQuiz" :key="index">
			<div class="current-slide" v-if="index === currentSlide">
				<h1>Question:</h1>
				<div class="question">{{quiz.question}}</div>
				
				<h1>Answers:</h1>
				<div class="answer-container">
					<div class="answer" v-for="(answer, index) in quiz.answers">{{answer}}</div>
				</div>
				
				<h1>Made Answer:</h1>
				<div class="made-answer">{{quiz.madeAnswer+1}}</div>
			</div>
		</div>
	</Carousel>

	<div class="quizzes-pagination">
		<h3>Quiz: {{quizState.quizNumber}}</h3>
		<div class="pagination-buttons">
			<Button severity="info" text 
				v-for="(count, index) in quizState.quizCount" v-bind:key="index" v-on:click="switchQuizzes(index)">{{count}}</Button>
		</div>
	</div>
</template>

<style scoped>
.link-share {
	width: 100%;
	display: flex;
	justify-content: space-evenly;
	align-items: center;
	flex-wrap: wrap;
	padding: 1rem;
}
.link-share>span {
	padding: 1rem;
}
.current-slide {
	background-color: var(--surface-50);
	position: absolute;
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding-bottom: 2vh;
}
.question {
	color: var(--primary-color);
	font-size: 1.2rem;
	height: 20%;
}
.answer {
	color: var(--primary-color);
	font-size: 1.2rem;
}
.made-answer {
	color: var(--primary-color);
	font-size: 1.2rem;
}
.answer-container {
	height: 80%;
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
}
.quizzes-pagination {
	width: 50%;
	display: flex;
	flex-direction: column;
	align-items: space-evenly;
}
.quizzes-pagination>h3 {
	align-self: center;
}
.pagination-buttons {
	display: flex;
	justify-content: space-around;
}
</style>
