import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from './components/Dashboard.vue';
import RegistrarIncidente from './components/RegistrarIncidente.vue';
import RegistrarIncidenteDetalle from './components/RegistrarIncidenteDetalle.vue';

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
    },
    {
        path: '/registrar-incidente-detalle',
        name: 'registrar-incidente-detalle',
        component: RegistrarIncidenteDetalle
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
