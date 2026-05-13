import { reactive } from 'vue';

const generateIdCaso = () => {
    return 'AUTO-' + new Date().getFullYear() + '-' + Math.floor(1000 + Math.random() * 9000);
};

const state = reactive({
    tipo_accidente: 'victimas',
    fecha_incidente: new Date().toISOString().split('T')[0],
    hora_aproximada: new Date().toTimeString().split(' ')[0].substring(0, 5),
    id_caso: generateIdCaso(),
    gravedad: '',
    direccion: '',
    municipio: ''
});

export function useIncidenteStore() {
    return { state, reset: () => {
        state.tipo_accidente = 'victimas';
        state.fecha_incidente = new Date().toISOString().split('T')[0];
        state.hora_aproximada = new Date().toTimeString().split(' ')[0].substring(0, 5);
        state.id_caso = generateIdCaso();
        state.gravedad = '';
        state.direccion = '';
        state.municipio = '';
    } };
}
