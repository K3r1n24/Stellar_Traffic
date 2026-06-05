<template>
    <div class="dashboard">
        <Sidebar />

        <main class="main-content">
            <TopHeader
                title="Registro de Incidente"
                subtitle="Gestión rápida de incidentes y monitoreo vial"
            />

            <div class="form-view">
                <div class="stepper-container">
                    <div class="car-icon-floating">
                        <i class="ph ph-car"></i>
                    </div>
                    <div class="stepper-background-line"></div>
                    <div class="stepper-active-line"></div>

                    <div class="step-dot active"></div>
                    <div class="step-dot active"></div>
                    <div class="step-dot active"></div>
                    <div class="step-dot active"></div>
                    <div class="step-dot"></div>
                </div>

                <div class="details-card">
                    <div class="section-header">
                        <i class="ph ph-file-text"></i>
                        <div class="section-header-text">
                            <h3>Detalles del incidente</h3>
                            <p>
                                Proporciona información adicional sobre lo
                                ocurrido.
                            </p>
                        </div>
                    </div>

                    <form
                        id="involved-form"
                        style="display: flex; flex-direction: column; gap: 35px"
                        @submit.prevent
                    >
                        <div class="dynamic-list-container">
                            <div class="list-header-row">
                                <span class="list-title">Vehículos</span>
                                <span class="add-btn" @click="addVehicle"
                                    >Agregar vehículo +</span
                                >
                            </div>
                            <div class="list-inputs" id="vehicles-list">
                                <input
                                    v-for="(vehiculo, index) in vehiculos"
                                    :key="'vehiculo-' + index"
                                    type="text"
                                    class="outline-input"
                                    :class="{ 'new-input': index >= 2 }"
                                    placeholder="Marca/Año/Matricula"
                                    v-model="vehiculos[index]"
                                />
                            </div>
                        </div>

                        <div class="dynamic-list-container">
                            <div class="list-header-row">
                                <span class="list-title">Personas</span>
                                <span class="add-btn" @click="addPerson"
                                    >Agregar persona +</span
                                >
                            </div>
                            <div class="list-inputs" id="persons-list">
                                <input
                                    v-for="(persona, index) in personas"
                                    :key="'persona-' + index"
                                    type="text"
                                    class="outline-input"
                                    :class="{ 'new-input': index >= 2 }"
                                    placeholder="Nombre/Licencia/Condición"
                                    v-model="personas[index]"
                                />
                            </div>
                        </div>
                    </form>
                </div>

                <div class="bottom-action-bar">
                    <button
                        class="btn btn-outline"
                        type="button"
                        @click="handleBack"
                    >
                        Atrás
                    </button>
                    <button
                        class="btn btn-primary"
                        type="button"
                        @click="handleNext"
                    >
                        Continuar
                    </button>
                </div>
            </div>
        </main>
    </div>
</template>

<script setup>
import Sidebar from "./Sidebar.vue";
import TopHeader from "./TopHeader.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { useDatetime } from "../composables/useDatetime.js";
import { useIncidenteStore } from "../composables/useIncidenteStore.js";

const { currentDate, currentTime } = useDatetime();
const { state: incidenteState } = useIncidenteStore();

const router = useRouter();

// Arrays reactivos inicializados desde el store
const vehiculos = ref([...incidenteState.vehiculos]);
const personas = ref([...incidenteState.personas]);

// Funciones para agregar campos dinámicamente
const addVehicle = () => {
    vehiculos.value.push("");
};

const addPerson = () => {
    personas.value.push("");
};

const saveToStore = () => {
    incidenteState.vehiculos = [...vehiculos.value];
    incidenteState.personas = [...personas.value];
};

// Navegación
const handleBack = () => {
    saveToStore();
    router.push({ name: "registrar-incidente-declaracion" });
};

const handleNext = () => {
    saveToStore();

    // Recolectar datos limpiando campos vacíos
    const data = {
        vehiculos: vehiculos.value.filter((v) => v.trim() !== ""),
        personas: personas.value.filter((p) => p.trim() !== ""),
    };

    console.log("Datos de involucrados guardados en store:", data);

    router.push({ name: "registrar-incidente-evidencia" });
};

const goTo = (path) => {
    router.push(path);
};

const handleLogout = async () => {
    try {
        await axios.post("/logout");
        window.location.href = "/login";
    } catch (error) {
        console.error("Error al cerrar sesión:", error);
        window.location.href = "/login";
    }
};
</script>

<style scoped>
.dashboard {
    --bg-dark: #061129;
    --bg-sidebar: #081738;
    --bg-card: #0A1D47;
    --border-color: #1D2C52;
    --text-main: #ffffff;
    --text-muted: #8AABBB;

    --primary-blue: #2563eb;
    --accent-blue: #336BFA;
    --critical: #FF1744;

    background-color: var(--bg-dark);
    color: var(--text-main);
    height: 100vh;
    display: flex;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.dashboard * {
    box-sizing: border-box;
}

/* --- BARRA LATERAL --- */
.sidebar {
    width: 260px;
    background-color: var(--bg-sidebar);
    border-right: 1px solid var(--border-color);
    display: flex;
    flex-direction: column;
    padding: 20px 0;
    flex-shrink: 0;
}
.user-profile {
    display: flex;
    align-items: center;
    padding: 0 20px 20px;
    border-bottom: 1px solid var(--border-color);
    gap: 12px;
}
.avatar {
    width: 40px;
    height: 40px;
    background-color: var(--primary-blue);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 14px;
    color: white;
}
.user-info h4 {
    font-size: 14px;
    font-weight: 600;
    margin: 0;
}
.user-info span {
    font-size: 10px;
    color: var(--text-muted);
}
.menu-icon {
    margin-left: auto;
    cursor: pointer;
    color: var(--text-muted);
    font-size: 20px;
}

.nav-section {
    margin-top: 25px;
}
.nav-title {
    font-size: 11px;
    color: var(--text-muted);
    padding: 0 20px;
    margin-bottom: 10px;
    letter-spacing: 1px;
}
.nav-list {
    list-style: none;
    margin: 0;
    padding: 0;
}
.nav-item {
    padding: 12px 20px;
    display: flex;
    align-items: center;
    gap: 12px;
    color: var(--text-muted);
    font-size: 14px;
    cursor: pointer;
    transition: 0.2s;
}
.nav-item i {
    font-size: 18px;
}
.nav-item:hover {
    color: var(--text-main);
}
.nav-item.active {
    background-color: rgba(37, 99, 235, 0.1);
    color: var(--text-main);
    border: 1px solid var(--primary-blue);
    border-radius: 8px;
    margin: 0 10px;
    padding: 12px 10px;
}
.logout {
    margin-top: auto;
    padding: 20px;
    color: var(--critical);
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    font-size: 14px;
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
    margin-bottom: 20px;
    flex-shrink: 0;
}
.header-titles h1 {
    font-size: 24px;
    font-weight: 600;
    margin: 0 0 5px 0;
}
.header-titles p {
    color: var(--text-muted);
    font-size: 14px;
    margin: 0;
}
.header-actions {
    display: flex;
    gap: 15px;
    align-items: center;
}

.datetime-pill {
    display: flex;
    align-items: center;
    gap: 10px;
    background-color: var(--bg-card);
    padding: 10px 15px;
    border-radius: 8px;
    border: 1px solid var(--border-color);
}
.datetime-pill i {
    font-size: 20px;
    color: var(--text-muted);
}
.dt-text {
    display: flex;
    flex-direction: column;
    font-size: 12px;
}
.dt-text .date {
    font-weight: 600;
}
.dt-text .time {
    color: var(--text-muted);
    font-size: 11px;
}

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
.notification i {
    font-size: 20px;
    color: var(--text-muted);
}
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

/* --- VISTA DEL FORMULARIO --- */
.form-view {
    flex: 1;
    display: flex;
    flex-direction: column;
    max-width: 900px;
    margin: 0 auto;
    width: 100%;
}

/* Stepper - Paso 4 */
.stepper-container {
    position: relative;
    margin: 30px 0 50px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 0 10px;
}
.stepper-background-line {
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    height: 6px;
    background-color: #ffffff;
    transform: translateY(-50%);
    border-radius: 3px;
    z-index: 1;
}

/* Línea activa cubriendo hasta el cuarto punto (aprox 75%) */
.stepper-active-line {
    position: absolute;
    top: 50%;
    left: 0;
    width: 75%;
    height: 6px;
    background-color: var(--accent-blue);
    transform: translateY(-50%);
    border-radius: 3px;
    z-index: 2;
    transition: width 0.4s ease;
}

.step-dot {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background-color: #ffffff;
    z-index: 3;
    position: relative;
    transition: 0.4s ease;
}
.step-dot.active {
    background-color: var(--accent-blue);
    box-shadow: 0 0 12px var(--accent-blue);
}
.car-icon-floating {
    position: absolute;
    top: -45px;
    left: 50%;
    transform: translateX(-50%);
    width: 45px;
    height: 45px;
    background-color: rgba(255, 255, 255, 0.08);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    color: var(--text-muted);
    z-index: 4;
}

/* Contenedor Principal */
.details-card {
    border: 1px solid var(--accent-blue);
    border-radius: 16px;
    padding: 40px 50px;
    background-color: transparent;
    margin-bottom: 30px;
    display: flex;
    flex-direction: column;
    gap: 30px;
}

.section-header {
    display: flex;
    align-items: center;
    gap: 15px;
}
.section-header i {
    font-size: 24px;
    color: var(--text-main);
}
.section-header-text h3 {
    font-size: 16px;
    font-weight: 500;
    margin: 0;
}
.section-header-text p {
    font-size: 12px;
    color: var(--text-muted);
    margin: 0;
}

/* Listas Dinámicas (Vehículos y Personas) */
.dynamic-list-container {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.list-header-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 5px;
}
.list-title {
    font-size: 14px;
    color: var(--text-main);
}
.add-btn {
    font-size: 13px;
    color: var(--accent-blue);
    cursor: pointer;
    font-weight: 500;
    transition: color 0.2s;
}
.add-btn:hover {
    color: #60a5fa;
    text-decoration: underline;
}

/* Inputs de lista */
.list-inputs {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.outline-input {
    background-color: rgba(255, 255, 255, 0.02);
    border: 1px solid var(--border-color);
    border-radius: 12px;
    padding: 0 20px;
    height: 55px;
    width: 100%;
    color: var(--text-main);
    font-size: 14px;
    outline: none;
    transition: all 0.3s ease;
}
.outline-input::placeholder {
    color: var(--text-muted);
}
.outline-input:focus {
    border-color: var(--accent-blue);
    background-color: rgba(37, 99, 235, 0.05);
}

/* Animación para nuevos inputs */
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(-10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
.new-input {
    animation: fadeIn 0.3s ease-out;
}

/* Barra de Acciones Inferior */
.bottom-action-bar {
    margin-top: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 20px;
}
.btn {
    padding: 14px 40px;
    border-radius: 10px;
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
.btn-primary:hover {
    background-color: var(--accent-blue);
}

/* Responsividad */
@media (max-width: 900px) {
    .stepper-container {
        display: none;
    }
    .details-card {
        padding: 30px 20px;
    }
}
</style>
