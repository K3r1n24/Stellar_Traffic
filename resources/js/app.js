import './bootstrap';
import { createApp } from 'vue';
import RegisterForm from './components/RegisterForm.vue';
import LoginForm from './components/LoginForm.vue';

const app = createApp({});

app.component('register-form', RegisterForm);
app.component('login-form', LoginForm);

app.mount('#app');
