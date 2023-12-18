import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import PrimeVue from 'primevue/config'
import Button from 'primevue/button'
import 'primeicons/primeicons.css'
import 'primevue/resources/themes/md-dark-indigo/theme.css'

const app = createApp(App)

app.use(PrimeVue)
app.use(router)

app.component('Button', Button)

app.mount('#app')
