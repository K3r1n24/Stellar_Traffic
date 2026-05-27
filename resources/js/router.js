import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from './components/Dashboard.vue';
import RegistrarIncidente from './components/RegistrarIncidente.vue';
import RegistrarIncidenteDetalle from './components/RegistrarIncidenteDetalle.vue';
import RegistrarIncidenteUbicacion from './components/RegistrarIncidenteUbicacion.vue';

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
    },
    {
        path: '/registrar-incidente-ubicacion',
        name: 'registrar-incidente-ubicacion',
        component: RegistrarIncidenteUbicacion
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
