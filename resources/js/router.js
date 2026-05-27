import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from './components/Dashboard.vue';
import RegistrarIncidente from './components/RegistrarIncidente.vue';

const routes = [
    {
        path: '/dashboard',
        name: 'dashboard',
        component: Dashboard
    },
    {
        path: '/registrar-incidente',
        name: 'registrar-incidente',
        component: RegistrarIncidente
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
