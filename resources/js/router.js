import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from './components/Dashboard.vue';
import RegistrarIncidente from './components/RegistrarIncidente.vue';
import RegistrarIncidenteDetalle from './components/RegistrarIncidenteDetalle.vue';
import RegistrarIncidenteUbicacion from './components/RegistrarIncidenteUbicacion.vue';
import RegistrarIncidenteMapa from './components/RegistrarIncidenteMapa.vue';
import RegistrarIncidenteDeclaracion from './components/RegistrarIncidenteDeclaracion.vue';
import RegistrarIncidenteInvolucrados from './components/RegistrarIncidenteInvolucrados.vue';

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
    },
    {
        path: '/registrar-incidente-mapa',
        name: 'registrar-incidente-mapa',
        component: RegistrarIncidenteMapa
    },
    {
        path: '/registrar-incidente-declaracion',
        name: 'registrar-incidente-declaracion',
        component: RegistrarIncidenteDeclaracion
    },
    {
        path: '/registrar-incidente-involucrados',
        name: 'registrar-incidente-involucrados',
        component: RegistrarIncidenteInvolucrados
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
