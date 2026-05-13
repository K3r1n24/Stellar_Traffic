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

const app = createApp({});

app.component('app-main', AppMain);
app.component('dashboard-incidentes', DashboardIncidentes);
app.component('registrar-incidente', RegistrarIncidente);
app.component('login-form', LoginForm);
app.component('register-form', RegisterForm);

app.use(router);
app.mount('#app');
