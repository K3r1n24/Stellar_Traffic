import { createRouter, createWebHistory } from 'vue-router';
import DashboardIncidentes from './components/DashboardIncidentes.vue';
import RegistrarIncidente from './components/RegistrarIncidente.vue';

const routes = [
    {
        path: '/',
        name: 'dashboard',
        component: DashboardIncidentes
    },
    {
        path: '/registro',
        name: 'registro.incidente',
        component: RegistrarIncidente
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
