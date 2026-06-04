<template>
    <div class="dashboard">
        
        <Sidebar />

        <main class="main-content">
            
            <TopHeader title="Registro de Incidente" subtitle="Gestión rápida de incidentes y monitoreo vial" />

            <div class="selection-view">
                
                <div class="center-header">
                    <div class="icon-circle">
                        <i class="ph ph-car"></i>
                    </div>
                    <h2>Seleccionar tipo de incidente</h2>
                    <p>Selecciona la categoría que mejor describa el incidente</p>
                </div>

                <div class="cards-grid">
                    <div 
                        class="option-card selectable-card" 
                        :class="{ 'selected': selectedType === 'victimas' }"
                        @click="selectType('victimas')"
                    >
                        <div class="card-icon-box">
                            <i class="ph ph-users-three"></i>
                        </div>
                        <div class="card-content">
                            <h3>Incidente con<br>victimas o fallecimiento</h3>
                            <div class="short-divider"></div>
                            <p>Incidentes que involucran<br>personas lesionadas o<br>fallecidas.</p>
                        </div>
                    </div>

                    <div 
                        class="option-card selectable-card" 
                        :class="{ 'selected': selectedType === 'materiales' }"
                        @click="selectType('materiales')"
                    >
                        <div class="card-icon-box">
                            <i class="ph ph-car-profile"></i>
                        </div>
                        <div class="card-content">
                            <h3>Incidente con<br>daños materiales</h3>
                            <div class="short-divider"></div>
                            <p>Incidentes que solo causan<br>daños materiales entre<br>vehículos.</p>
                        </div>
                    </div>
                </div>

                <div class="bottom-action-bar">
                    <div class="help-link">
                        <i class="ph ph-question"></i>
                        <span>¿No estás seguro?</span>
                    </div>
                    <div class="action-buttons">
                        <button class="btn btn-outline" @click="handleCancel">Cancelar</button>
                        <button class="btn btn-primary" :disabled="!selectedType" @click="handleContinue">Continuar</button>
                    </div>
                </div>

            </div>
        </main>
    </div>
</template>

<script setup>
import Sidebar from './Sidebar.vue';
import TopHeader from './TopHeader.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useIncidenteStore } from '../composables/useIncidenteStore.js';

const { state: incidenteState } = useIncidenteStore();

const router = useRouter();

// Estado reactivo para almacenar el tipo de incidente seleccionado
const selectedType = ref(incidenteState.tipo_accidente || null);

// Función para actualizar el tipo seleccionado
const selectType = (type) => {
    selectedType.value = type;
};

// Función para el botón Continuar
const handleContinue = () => {
    if (selectedType.value) {
        incidenteState.tipo_accidente = selectedType.value;
        console.log(`Procesando incidente de tipo: ${selectedType.value}`);
        router.push({ name: 'registrar-incidente-detalle', query: { tipo: selectedType.value } });
    }
};

// Función para el botón Cancelar
const handleCancel = () => {
    router.push({ name: 'dashboard' });
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
    .main-content {
        flex: 1;
        padding: 30px 40px;
        display: flex;
        flex-direction: column;
        overflow-y: auto;
    }

    /* Encabezado */
    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 40px;
        flex-shrink: 0;
    }

    .header-titles h1 { font-size: 24px; font-weight: 600; margin: 0 0 5px 0; }
    .header-titles p { color: var(--text-muted); font-size: 14px; margin: 0; }

    .header-actions { display: flex; gap: 15px; align-items: center; }

    .datetime-pill {
        display: flex;
        align-items: center;
        gap: 10px;
        background-color: var(--bg-card);
        padding: 10px 15px;
        border-radius: 8px;
        border: 1px solid var(--border-color);
    }
    .datetime-pill i { font-size: 20px; color: var(--text-muted); }
    .dt-text { display: flex; flex-direction: column; font-size: 12px;}
    .dt-text .date { font-weight: 600; }
    .dt-text .time { color: var(--text-muted); font-size: 11px;}

    .notification {
        background-color: var(--bg-card);
        width: 45px;
        height: 45px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid var(--border-color);
        position: relative;
        cursor: pointer;
    }
    .notification i { font-size: 20px; color: var(--text-muted); }
    .badge {
        position: absolute;
        top: -2px;
        right: -2px;
        background-color: var(--critical);
        color: white;
        font-size: 10px;
        width: 16px;
        height: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        font-weight: bold;
    }

    /* --- VISTA DE SELECCIÓN DE INCIDENTE --- */
    .selection-view {
        flex: 1;
        display: flex;
        flex-direction: column;
    }

    /* Cabecera central */
    .center-header {
        text-align: center;
        margin-bottom: 40px;
        margin-top: 20px;
    }

    .icon-circle {
        width: 60px;
        height: 60px;
        background-color: rgba(255, 255, 255, 0.05);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 20px auto;
        font-size: 28px;
        color: var(--text-muted);
    }

    .center-header h2 {
        font-size: 22px;
        font-weight: 600;
        margin: 0 0 8px 0;
    }

    .center-header p {
        color: var(--text-muted);
        font-size: 14px;
        margin: 0;
    }

    /* Tarjetas de Opciones */
    .cards-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 25px;
        max-width: 900px;
        margin: 0 auto;
    }

    .option-card {
        background-color: transparent;
        border: 1px solid var(--border-color);
        border-radius: 16px;
        padding: 30px;
        display: flex;
        align-items: center;
        gap: 25px;
        cursor: pointer;
        transition: all 0.3s ease;
    }

    .option-card:hover {
        border-color: #2b3954;
        background-color: rgba(255, 255, 255, 0.02);
    }

    /* Estado Activo (Seleccionado) */
    .option-card.selected {
        border-color: var(--accent-blue);
        background-color: rgba(37, 99, 235, 0.05);
    }

    .card-icon-box {
        width: 90px;
        height: 90px;
        background-color: var(--accent-blue);
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 45px;
        color: white;
        flex-shrink: 0;
    }

    .card-content h3 {
        font-size: 18px;
        font-weight: 600;
        margin: 0 0 15px 0;
        line-height: 1.3;
    }

    .short-divider {
        width: 30px;
        height: 2px;
        background-color: var(--border-color);
        margin-bottom: 15px;
    }
    
    .option-card.selected .short-divider {
        background-color: var(--accent-blue);
    }

    .card-content p {
        font-size: 13px;
        color: var(--text-muted);
        line-height: 1.5;
        margin: 0;
    }

    /* Barra de Acciones Inferior */
    .bottom-action-bar {
        margin-top: auto;
        padding-top: 30px;
        border-top: 1px solid var(--border-color);
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .help-link {
        display: flex;
        align-items: center;
        gap: 10px;
        color: var(--text-muted);
        font-size: 14px;
        cursor: pointer;
        transition: 0.2s;
    }

    .help-link i {
        font-size: 20px;
        color: var(--text-main);
    }

    .help-link:hover {
        color: var(--text-main);
    }

    .action-buttons {
        display: flex;
        gap: 15px;
    }

    .btn {
        padding: 12px 28px;
        border-radius: 8px;
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;
        transition: 0.2s;
    }

    .btn-outline {
        background-color: transparent;
        border: 1px solid var(--border-color);
        color: var(--text-main);
    }

    .btn-outline:hover {
        background-color: rgba(255, 255, 255, 0.05);
    }

    .btn-primary {
        background-color: var(--primary-blue);
        border: 1px solid var(--primary-blue);
        color: white;
    }

    .btn-primary:hover:not(:disabled) {
        background-color: var(--accent-blue);
    }

    /* Estado deshabilitado del botón continuar */
    .btn-primary:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    /* Responsividad */
    @media (max-width: 1024px) {
        .cards-grid { grid-template-columns: 1fr; }
        .option-card { padding: 20px; }
    }
</style>
