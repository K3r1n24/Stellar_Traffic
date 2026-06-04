<template>
    <div class="dashboard">
        
        <Sidebar />

        <main class="main-content">
            
            <TopHeader title="Registro de Incidente" subtitle="Gestión rápida de incidentes y monitoreo vial" />

            <div class="form-view">
                
                <div class="stepper-container">
                    <div class="car-icon-floating"><i class="ph ph-car"></i></div>
                    <div class="stepper-background-line"></div>
                    <div class="stepper-active-line"></div>
                    
                    <div class="step-dot active"></div>
                    <div class="step-dot active"></div> 
                    <div class="step-dot"></div>
                    <div class="step-dot"></div>
                    <div class="step-dot"></div>
                </div>

                <div class="form-card">
                    
                    <div class="section-header">
                        <i class="ph ph-map-pin"></i>
                        <h3>Ubicación del incidente</h3>
                    </div>

                    <form id="location-form" @submit.prevent="handleSubmit">
                        <div class="form-grid">
                            <div class="form-group">
                                <label>Dirección</label>
                                <div class="input-wrapper">
                                    <i class="ph ph-map-pin leading-icon"></i>
                                    <input type="text" placeholder="Selecciona la dirección" class="input-control" required v-model="formData.direccion">
                                </div>
                            </div>

                            <div class="form-group">
                                <label>Distrito</label>
                                <div class="input-wrapper">
                                    <i class="ph ph-buildings leading-icon"></i>
                                    <input type="text" placeholder="Selecciona el distrito" class="input-control" required v-model="formData.distrito">
                                </div>
                            </div>

                            <div class="map-selector-card" @click="openMap">
                                <i class="ph ph-map-trifold"></i>
                                <h4>Seleccionar en mapa</h4>
                                <p>Haga click aquí para abrir el mapa</p>
                            </div>
                        </div>
                    </form>
                </div>

                <div class="bottom-action-bar">
                    <button class="btn btn-outline" type="button" @click="handleBack">Atrás</button>
                    <button class="btn btn-primary" type="button" @click="triggerSubmit">Continuar</button>
                </div>

            </div>
        </main>
    </div>
</template>

<script setup>
import Sidebar from './Sidebar.vue';
import TopHeader from './TopHeader.vue';
import { reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useIncidenteStore } from '../composables/useIncidenteStore.js';

const { state: incidenteState } = useIncidenteStore();
const router = useRouter();

// Estado reactivo para los datos del formulario de ubicación
const formData = reactive({
    direccion: incidenteState.direccion || '',
    distrito: incidenteState.municipio || ''
});

onMounted(() => {
    // Si hay una dirección y distrito seleccionados en el mapa, los cargamos
    const direccionGuardada = localStorage.getItem('incidente_direccion');
    const distritoGuardado = localStorage.getItem('incidente_distrito');
    
    if (direccionGuardada) {
        formData.direccion = direccionGuardada;
    }
    if (distritoGuardado) {
        formData.distrito = distritoGuardado;
    }
});

// Simulación de apertura de mapa
const openMap = () => {
    // Guardar los datos actuales al store antes de navegar
    incidenteState.direccion = formData.direccion;
    incidenteState.municipio = formData.distrito;
    router.push({ name: 'registrar-incidente-mapa' });
};

// Función para disparar la validación nativa de HTML5
const triggerSubmit = () => {
    const form = document.getElementById('location-form');
    if (form.reportValidity()) {
        handleSubmit();
    }
};

const handleSubmit = () => {
    // Guardar en el store compartido
    incidenteState.direccion = formData.direccion;
    incidenteState.municipio = formData.distrito;
    
    console.log("Ubicación guardada en store. Avanzando al Paso 3...", formData);
    router.push({ name: 'registrar-incidente-declaracion' });
};

// Volver al paso anterior
const handleBack = () => {
    router.push({ name: 'registrar-incidente-detalle' });
};
</script>

<style scoped>
    .dashboard {
        --bg-dark: #0f1524;
        --bg-sidebar: #0b101e;
        --bg-card: #131a2c;
        --border-color: #1f293d;
        --text-main: #ffffff;
        --text-muted: #8b95a5;
        
        --primary-blue: #2563eb;
        --accent-blue: #3b82f6;
        --critical: #dc2626;

        background-color: var(--bg-dark);
        color: var(--text-main);
        height: 100vh;
        display: flex;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    .dashboard * {
        box-sizing: border-box;
    }

    /* --- CONTENIDO PRINCIPAL --- */
    .main-content { flex: 1; padding: 30px 40px; display: flex; flex-direction: column; overflow-y: auto; }

    /* Encabezado */
    .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 40px; flex-shrink: 0; }
    .header-titles h1 { font-size: 24px; font-weight: 600; margin: 0 0 5px 0; }
    .header-titles p { color: var(--text-muted); font-size: 14px; margin: 0;}
    .header-actions { display: flex; gap: 15px; align-items: center; }

    .datetime-pill { display: flex; align-items: center; gap: 10px; background-color: var(--bg-card); padding: 10px 15px; border-radius: 8px; border: 1px solid var(--border-color); }
    .datetime-pill i { font-size: 20px; color: var(--text-muted); }
    .dt-text { display: flex; flex-direction: column; font-size: 12px;}
    .dt-text .date { font-weight: 600; }
    .dt-text .time { color: var(--text-muted); font-size: 11px;}

    .notification { background-color: var(--bg-card); width: 45px; height: 45px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 1px solid var(--border-color); position: relative; cursor: pointer; }
    .notification i { font-size: 20px; color: var(--text-muted); }
    .badge { position: absolute; top: -2px; right: -2px; background-color: var(--critical); color: white; font-size: 10px; width: 16px; height: 16px; display: flex; align-items: center; justify-content: center; border-radius: 50%; font-weight: bold; }

    /* --- VISTA DEL FORMULARIO --- */
    .form-view { flex: 1; display: flex; flex-direction: column; max-width: 900px; margin: 0 auto; width: 100%; }

    /* Indicador de Progreso (Stepper) - PASO 2 */
    .stepper-container { position: relative; margin: 40px 0 60px 0; display: flex; justify-content: space-between; align-items: center; width: 100%; padding: 0 10px; }
    .stepper-background-line { position: absolute; top: 50%; left: 0; width: 100%; height: 6px; background-color: #ffffff; transform: translateY(-50%); border-radius: 3px; z-index: 1; }
    
    /* Modificado para avanzar al paso 2 (aprox 38% del ancho) */
    .stepper-active-line { position: absolute; top: 50%; left: 0; width: 38%; height: 6px; background-color: var(--accent-blue); transform: translateY(-50%); border-radius: 3px; z-index: 2; transition: width 0.4s ease; }
    
    .step-dot { width: 24px; height: 24px; border-radius: 50%; background-color: #ffffff; z-index: 3; position: relative; transition: 0.4s ease; }
    .step-dot.active { background-color: var(--accent-blue); box-shadow: 0 0 12px var(--accent-blue); }
    
    .car-icon-floating { position: absolute; top: -45px; left: 50%; transform: translateX(-50%); width: 45px; height: 45px; background-color: rgba(255, 255, 255, 0.08); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 20px; color: var(--text-muted); }

    /* Contenedor del Formulario */
    .form-card { border: 1px solid var(--accent-blue); border-radius: 16px; padding: 40px 50px; background-color: transparent; margin-bottom: 40px; }
    
    .section-header { display: flex; align-items: center; gap: 15px; margin-bottom: 30px; }
    .section-header i { font-size: 24px; color: var(--text-main); }
    .section-header h3 { font-size: 16px; font-weight: 500; margin: 0; }

    .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 30px; margin-bottom: 30px;}
    .form-group { display: flex; flex-direction: column; gap: 10px; }
    .form-group label { font-size: 13px; color: var(--text-muted); }

    .input-wrapper { background-color: transparent; border: 1px solid var(--border-color); border-radius: 12px; display: flex; align-items: center; padding: 0 20px; height: 55px; transition: 0.3s; }
    .input-wrapper:focus-within { border-color: var(--accent-blue); background-color: rgba(37, 99, 235, 0.05); }
    .input-wrapper i.leading-icon { font-size: 20px; color: var(--text-main); margin-right: 15px; }
    .input-control { background: transparent; border: none; color: var(--text-main); font-size: 14px; width: 100%; height: 100%; outline: none; }
    .input-control::placeholder { color: var(--text-muted); }

    /* Botón gigante de mapa */
    .map-selector-card { grid-column: span 2; background-color: rgba(255, 255, 255, 0.02); border: 1px solid var(--border-color); border-radius: 12px; padding: 40px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 15px; cursor: pointer; transition: all 0.3s ease; }
    .map-selector-card:hover { border-color: var(--accent-blue); background-color: rgba(37, 99, 235, 0.05); }
    .map-selector-card i { font-size: 32px; color: var(--text-main); }
    .map-selector-card h4 { font-size: 18px; font-weight: 600; margin: 0;}
    .map-selector-card p { font-size: 13px; color: var(--text-muted); margin: 0;}

    /* Barra de Acciones Inferior */
    .bottom-action-bar { margin-top: auto; display: flex; justify-content: space-between; align-items: center; }
    .btn { padding: 14px 40px; border-radius: 10px; font-size: 14px; font-weight: 500; cursor: pointer; transition: 0.2s; }
    .btn-outline { background-color: transparent; border: 1px solid var(--border-color); color: var(--text-main); }
    .btn-outline:hover { background-color: rgba(255, 255, 255, 0.05); }
    .btn-primary { background-color: var(--primary-blue); border: 1px solid var(--primary-blue); color: white; }
    .btn-primary:hover { background-color: var(--accent-blue); }

    /* Responsividad */
    @media (max-width: 768px) {
        .form-grid { grid-template-columns: 1fr; }
        .map-selector-card { grid-column: span 1; padding: 30px 20px;}
        .form-card { padding: 30px 20px; }
        .stepper-container { display: none; }
    }
</style>
