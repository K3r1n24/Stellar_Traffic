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
                    <div class="step-dot active"></div>
                    <div class="step-dot active"></div> 
                </div>

                <div class="section-header">
                    <i class="ph ph-file-text"></i>
                    <div class="section-header-text">
                        <h3>Revisión y confirmación</h3>
                        <p>Verifica la información antes de finalizar</p>
                    </div>
                </div>

                <div class="summary-container">
                    <div class="summary-card">
                        <div class="summary-icon">
                            <i class="ph ph-calendar-blank"></i>
                        </div>
                        <div class="data-groups-wrapper">
                            <div class="data-group first-group">
                                <span class="label">Información básica</span>
                                <span class="value"
                                    >Fecha:
                                    {{
                                        incidenteState.fecha_incidente ||
                                        "No especificada"
                                    }}</span
                                >
                            </div>
                            <div class="data-group">
                                <span class="label">Tipo de incidente:</span>
                                <span class="value">{{
                                    incidenteState.tipo_accidente === "victimas"
                                        ? "Con víctimas"
                                        : "Daños materiales"
                                }}</span>
                            </div>
                            <div class="data-group">
                                <span class="label">Gravedad:</span>
                                <span class="value">{{
                                    incidenteState.gravedad || "No especificada"
                                }}</span>
                            </div>
                        </div>
                        <button
                            class="edit-btn"
                            @click="handleEdit('registrar-incidente-detalle')"
                        >
                            Editar
                        </button>
                    </div>

                    <div class="summary-card">
                        <div class="summary-icon">
                            <i class="ph ph-map-pin"></i>
                        </div>
                        <div class="data-groups-wrapper">
                            <div class="data-group first-group">
                                <span class="label">Ubicación</span>
                                <span class="value"
                                    >Dirección:
                                    {{
                                        incidenteState.direccion ||
                                        "No especificada"
                                    }}</span
                                >
                            </div>
                            <div class="data-group">
                                <span class="label">Distrito:</span>
                                <span class="value">{{
                                    incidenteState.municipio ||
                                    "No especificado"
                                }}</span>
                            </div>
                        </div>
                        <button
                            class="edit-btn"
                            @click="handleEdit('registrar-incidente-ubicacion')"
                        >
                            Editar
                        </button>
                    </div>

                    <div class="summary-card">
                        <div class="summary-icon">
                            <i class="ph ph-users"></i>
                        </div>
                        <div class="data-groups-wrapper">
                            <div class="data-group first-group">
                                <span class="label">Involucrados</span>
                                <span class="value"
                                    >Vehículos:
                                    {{ vehiculosCount }} Registrados</span
                                >
                            </div>
                            <div class="data-group">
                                <span class="label">Personas:</span>
                                <span class="value"
                                    >{{ personasCount }} Registradas</span
                                >
                            </div>
                        </div>
                        <button
                            class="edit-btn"
                            @click="
                                handleEdit('registrar-incidente-involucrados')
                            "
                        >
                            Editar
                        </button>
                    </div>

                    <div class="summary-card">
                        <div class="summary-icon">
                            <i class="ph ph-file-text"></i>
                        </div>
                        <div class="data-groups-wrapper">
                            <div class="data-group first-group">
                                <span class="label">Evidencia</span>
                                <span class="value"
                                    >Archivos:
                                    {{
                                        incidenteState.archivosCount || 0
                                    }}
                                    Adjuntos</span
                                >
                            </div>
                        </div>
                        <button
                            class="edit-btn"
                            @click="handleEdit('registrar-incidente-evidencia')"
                        >
                            Editar
                        </button>
                    </div>
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
                        @click="handleSubmit"
                    >
                        Finalizar
                    </button>
                </div>
            </div>
        </main>
    </div>
</template>

<script setup>
import Sidebar from "./Sidebar.vue";
import TopHeader from "./TopHeader.vue";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { useDatetime } from "../composables/useDatetime.js";
import { useIncidenteStore } from "../composables/useIncidenteStore.js";

const { currentDate, currentTime } = useDatetime();
const { state: incidenteState, reset: resetStore } = useIncidenteStore();

const router = useRouter();
const isSubmitting = ref(false);

// Contadores calculados
const vehiculosCount = computed(
    () => incidenteState.vehiculos.filter((v) => v.trim() !== "").length,
);
const personasCount = computed(
    () => incidenteState.personas.filter((p) => p.trim() !== "").length,
);

// --- NAVEGACIÓN ---
const handleBack = () => {
    router.push({ name: "registrar-incidente-evidencia" });
};

const handleEdit = (routeName) => {
    router.push({ name: routeName });
};

const handleSubmit = async () => {
    if (isSubmitting.value) return;
    isSubmitting.value = true;

    // Preparar payload para el backend
    const payload = {
        id_caso: incidenteState.id_caso,
        tipo_accidente: incidenteState.tipo_accidente,
        fecha_incidente: incidenteState.fecha_incidente,
        hora_aproximada: incidenteState.hora_aproximada,
        gravedad: incidenteState.gravedad,
        direccion: incidenteState.direccion,
        municipio: incidenteState.municipio,
        descripcion: incidenteState.declaracion,
        condicion_climatica: incidenteState.condicion_climatica,
        tipo_via: incidenteState.tipo_via,
        estado_pavimento: incidenteState.estado_pavimento,
        vehiculos: incidenteState.vehiculos.filter((v) => v.trim() !== ""),
        personas: incidenteState.personas.filter((p) => p.trim() !== ""),
    };

    try {
        const response = await axios.post("/accidentes", payload);
        console.log("Incidente registrado exitosamente:", response.data);

        localStorage.setItem("currentCaseId", incidenteState.id_caso);
        router.push({ name: "registrar-incidente-exito" });
    } catch (error) {
        console.error("Error al registrar el incidente:", error);

        // Fallback: si el backend no está disponible, continuar de todas formas (demo)
        if (error.response) {
            alert(
                `Error del servidor: ${error.response.data.message || "Error desconocido"}`,
            );
        } else {
            // Sin conexión al backend, modo demo
            console.warn("Backend no disponible. Continuando en modo demo...");
            localStorage.setItem("currentCaseId", incidenteState.id_caso);
            router.push({ name: "registrar-incidente-exito" });
        }
    } finally {
        isSubmitting.value = false;
    }
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

/* --- VISTA DE CONFIRMACIÓN --- */
.form-view {
    flex: 1;
    display: flex;
    flex-direction: column;
    max-width: 900px;
    margin: 0 auto;
    width: 100%;
}

/* Stepper - Paso Final */
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

/* Línea 100% completada */
.stepper-active-line {
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    height: 6px;
    background-color: var(--accent-blue);
    transform: translateY(-50%);
    border-radius: 3px;
    z-index: 2;
    transition: width 0.4s ease;
}

/* Todos los puntos activos */
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

/* Cabecera de Sección */
.section-header {
    display: flex;
    align-items: center;
    gap: 15px;
    margin-bottom: 30px;
    padding-left: 10px;
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
    margin: 2px 0 0 0;
}

/* Tarjetas de Resumen */
.summary-container {
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin-bottom: 40px;
}

.summary-card {
    background-color: transparent;
    border: 1px solid var(--border-color);
    border-radius: 12px;
    padding: 20px 30px;
    display: flex;
    align-items: center;
    transition: all 0.3s ease;
}

.summary-card:hover {
    border-color: var(--accent-blue);
    background-color: rgba(255, 255, 255, 0.02);
}

.summary-icon {
    font-size: 24px;
    color: var(--text-main);
    margin-right: 25px;
    width: 30px;
    display: flex;
    justify-content: center;
}

/* Grupos de datos dentro de la tarjeta */
.data-groups-wrapper {
    display: flex;
    flex: 1;
    align-items: center;
}

.data-group {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 0 20px;
}
/* Bordes verticales separadores (excepto el primero) */
.data-group:not(:first-child) {
    border-left: 1px solid var(--border-color);
}
.data-group.first-group {
    padding-left: 0;
}

.data-group span.label {
    font-size: 14px;
    color: var(--text-main);
    font-weight: 500;
}
.data-group span.value {
    font-size: 12px;
    color: var(--text-muted);
}

/* Botón de Editar */
.edit-btn {
    background: none;
    border: none;
    color: var(--accent-blue);
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    padding: 5px 10px;
    margin-left: 15px;
    transition: 0.2s;
}
.edit-btn:hover {
    text-decoration: underline;
    color: #60a5fa;
}

/* Barra de Acciones Inferior */
.bottom-action-bar {
    margin-top: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 20px;
    border-top: 1px solid var(--border-color);
    padding-top: 30px;
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
    .summary-card {
        flex-direction: column;
        align-items: flex-start;
        gap: 15px;
        position: relative;
    }
    .data-groups-wrapper {
        flex-direction: column;
        width: 100%;
        align-items: flex-start;
        gap: 10px;
    }
    .data-group {
        padding: 0 !important;
        border-left: none !important;
        width: 100%;
        border-bottom: 1px solid var(--border-color);
        padding-bottom: 10px !important;
    }
    .data-group:last-child {
        border-bottom: none;
        padding-bottom: 0 !important;
    }
    .edit-btn {
        position: absolute;
        top: 20px;
        right: 20px;
    }
}
</style>
