import { createRouter, createWebHistory } from 'vue-router';
import DashboardIncidentes from './components/DashboardIncidentes.vue';
import RegistrarIncidente from './components/RegistrarIncidente.vue';
import RegistrarIncidenteDetalle from './components/RegistrarIncidenteDetalle.vue';
import RegistrarIncidenteUbicacion from './components/RegistrarIncidenteUbicacion.vue';

const routes = [
    {
        path: '/dashboard',
        name: 'dashboard',
        component: DashboardIncidentes
    },
    {
        path: '/dashboard/registro',
        name: 'registro.incidente',
        component: RegistrarIncidente
    },
    {
        path: '/dashboard/registro/:tipo',
        name: 'registro.incidente.detalle',
        component: RegistrarIncidenteDetalle,
        props: true
    },
    {
        path: '/dashboard/registro/:tipo/ubicacion',
        name: 'registro.incidente.ubicacion',
        component: RegistrarIncidenteUbicacion,
        props: true
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
