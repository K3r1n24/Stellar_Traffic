import './bootstrap';
import * as bootstrap from 'bootstrap';
import { createApp } from 'vue';
import router from './router';

// Componentes
import AppMain from './components/App.vue';
import DashboardIncidentes from './components/DashboardIncidentes.vue';
import RegistrarIncidente from './components/RegistrarIncidente.vue';
import LoginForm from './components/LoginForm.vue';
import RegisterForm from './components/RegisterForm.vue';
import ForgotPasswordForm from './components/ForgotPasswordForm.vue';
import ResetPasswordForm from './components/ResetPasswordForm.vue';

const app = createApp({});

app.component('app-main', AppMain);
app.component('dashboard-incidentes', DashboardIncidentes);
app.component('registrar-incidente', RegistrarIncidente);
app.component('login-form', LoginForm);
app.component('register-form', RegisterForm);
app.component('forgot-password-form', ForgotPasswordForm);
app.component('reset-password-form', ResetPasswordForm);

app.use(router);
app.mount('#app');
