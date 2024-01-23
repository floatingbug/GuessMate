<script setup>
import {ref, reactive, onMounted} from 'vue';
import {useRouter} from "vue-router";
import Dropdown from 'primevue/dropdown';
import Card from 'primevue/card';
import SelectButton from "primevue/selectbutton";
import Listbox from 'primevue/listbox';
import predefinedQuiz from "../js/predefinedQuiz.js";
import apiCall from "../js/apiCall.js";

const router = useRouter();
const state = reactive({
	showCreateOwnQuestion: false,
	showPredefinedQuestions: false,
	errorMsg: "",
});
const stateQuiz = reactive({
	currQuestion: "",
	currAnswers: [],
	answerCounter: 0,
	questionCount: 0,
	numberOfQuestions: 0, 
	madeAnswers: [],
});

const selectedQuestion = ref();
const questions = ref([
	{name: "questions1", code: 1},
	{name: "questions2", code: 2},
	{name: "questions3", code: 3},
]);

function getFirstTwoAnswers(answers){
	const firstTwoAnswers = [];
	firstTwoAnswers.push(answers[0]);
	firstTwoAnswers.push(answers[1]);
	return firstTwoAnswers;
}
function getLastTwoAnswers(answers){
	const lastTwoAnswers = [];
	lastTwoAnswers.push(answers[2]);
	lastTwoAnswers.push(answers[3]);
	return lastTwoAnswers;
}

function initPredefinedQuiz(){
	stateQuiz.title = "predefined questions",
	stateQuiz.currQuestion = predefinedQuiz[0].question;
	stateQuiz.currAnswers = predefinedQuiz[0].answers;
	//0 is also a question
	stateQuiz.numberOfQuestions = 3;
	stateQuiz.quiz = predefinedQuiz;
}

//answer is a number between 1 and 4
function makeAnswer(answer){
	//add quizData to stateQuiz
	stateQuiz.madeAnswers.push(answer);
	stateQuiz.answerCounter++;

	//check if quiz is done
	if(stateQuiz.questionCount === stateQuiz.numberOfQuestions){
		const answers = [...stateQuiz.madeAnswers];
		//insert madeAnswers in quiz
		for(let i = 0; i < answers.length; i++){
			stateQuiz.quiz[i].madeAnswer = answers[i];
		}
		const quiz = [...stateQuiz.quiz]

		return sendQuizData(quiz)
	}

	//load next questions and answers to stateQuiz
	stateQuiz.questionCount++;
	stateQuiz.currQuestion = predefinedQuiz[stateQuiz.questionCount].question;
	stateQuiz.currAnswers = predefinedQuiz[stateQuiz.questionCount].answers;
}

async function sendQuizData(quiz){
	const token = localStorage.getItem("token");
	const request = {
		method: "post",
		url: "/add-quiz",
		headers: {
			"Authorization": token,
		},
		data: {title: stateQuiz.title, quiz}
	};
	
	try{
		const result = await apiCall(request);
		console.log(result)
		if(result.success){
			return router.push("/completed-quizzes");
		}
		state.errorMsg = result.msg;
	}
	catch(err){
		console.log(err);
	}
}
</script>

<template>
	<Card v-if="!(state.showPredefinedQuestions || state.showCreateOwnQuestion)">
		<template #title>Adding a Quiz</template>
		<template #content>
			You have the option to create your own questions and answers or simply choose from predefined questions. Then, provide your answers accordingly.
		</template>
		<template #footer>
			<div class="choosing-modus-container" >
				<Button label="Create own questions" v-on:click="state.showCreateOwnQuestion = true" />
				<Button label="Predefined questions" v-on:click="state.showPredefinedQuestions = true, initPredefinedQuiz()" />
			</div>
		</template>
	</Card>

	<Card v-if="state.showPredefinedQuestions">
		<template #title>Predefined Questions</template>
		<template #content>
			<div class="question">{{stateQuiz.currQuestion}}</div>

			<div class="answers-container">
				<div class="first-two-answers">
					<div class="answer" v-for="(answer, index) in getFirstTwoAnswers(stateQuiz.currAnswers)">
						<Button v-bind:label="answer" v-on:click="makeAnswer(index)" />
					</div>
				</div>
				<div class="last-two-answers">
					<div class="answer" v-for="(answer, index) in getLastTwoAnswers(stateQuiz.currAnswers)">
						<Button v-bind:label="answer" v-on:click="makeAnswer(index+2)" />
					</div>
				</div>
			</div>
		</template>
		<template #footer>
		</template>
	</Card>
	
	<Card v-if="state.showCreateOwnQuestion">
		<template #title>Create own Quiz</template>
	</Card>
</template>

<style scoped>
.p-card{
	width: 100%;
	max-width: 1000px;
	height: 800px;
	margin-top: 10vh;
}
:deep(.p-card-body) {
	display: flex;
	flex-direction: column;
	align-items: center;
}
:deep(.p-card-content) {
	width: 100%;
	height: 600px;
	display: flex;
	flex-direction: column;
	align-items: center;
}
:deep(.p-card-footer){
	width: 100%;
	min-height: 150px;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	align-items: center;
}
.choosing-modus-container {
	width: 100%;
	display: flex;
	justify-content: space-evenly;
	align-items: center;
}
.error-message {
	color: var(--red-500);
}
.answers-container {
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	margin-top: 10vh;
	gap: 1rem;
}
.first-two-answers, .last-two-answers {
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: space-evenly;
	flex-wrap: wrap;
	gap: 1rem;
}
.answer {
	width: 100%;
	min-width: 250px;
	max-width: 500px;
	flex: 1;
}
.answer>Button {
	width: 100%;
	height: 100%;
}
</style>
