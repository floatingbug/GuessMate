import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SignInView from "../views/SignInView.vue";
import SignUpView from "../views/SignUpView.vue";
import AddQuizView from "../views/AddQuizView.vue";
import CompletedQuizzesView from "../views/CompletedQuizzesView.vue";
import GuessAnswersView from "../views/GuessAnswersView.vue";

const router = createRouter({
    history: createWebHistory("/"),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/sign-in',
            name: 'signIn',
            component: SignInView
        },
        {
            path: '/sign-up',
            name: 'signUp',
            component: SignUpView
        },
		{
			path: "/add-quiz",
			name: "addQuiz",
			component: AddQuizView
		},
		{
			path: "/completed-quizzes",
			name: "completedQuizzes",
			component: CompletedQuizzesView
		},
		{
			path: "/guess-answers",
			name: "GuessAnswers",
			component: () => import('../views/GuessAnswersView.vue'),
		},
    ]
});

export default router
