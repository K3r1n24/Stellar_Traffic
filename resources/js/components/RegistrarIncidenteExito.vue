<template>
    <div class="dashboard">
        <Sidebar />

        <main class="main-content">
            <TopHeader
                title="¡Registro Exitoso!"
                subtitle="El caso ha sido procesado"
            />

            <div class="success-view">
                <div class="success-card">
                    <div class="success-icon-wrapper">
                        <i class="ph-fill ph-seal-check"></i>
                    </div>

                    <h2>Registro exitoso</h2>
                    <p>El incidente ha sido registrado exitosamente</p>

                    <div class="report-id-section">
                        <span class="report-label">ID DEL REPORTE</span>
                        <span class="report-value">{{ reportId }}</span>
                    </div>

                    <div class="card-actions">
                        <button class="btn btn-outline" @click="viewReport">
                            Ver reporte completo
                        </button>
                        <button class="btn btn-outline" @click="goHome">
                            Volver al inicio
                        </button>
                    </div>
                </div>

                <div class="bottom-action-area">
                    <button class="btn btn-primary" @click="newIncident">
                        <i class="ph ph-plus-square"></i> Registrar nuevo
                        incidente
                    </button>
                </div>
            </div>
        </main>
    </div>
</template>

<script setup>
import Sidebar from "./Sidebar.vue";
import TopHeader from "./TopHeader.vue";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { useDatetime } from "../composables/useDatetime.js";
import { useIncidenteStore } from "../composables/useIncidenteStore.js";

const { currentDate, currentTime } = useDatetime();
const { reset: resetStore } = useIncidenteStore();

const router = useRouter();

// Estado reactivo para el ID del reporte
const reportId = ref("ACC-2026-4045");

onMounted(() => {
    // Rescatar el ID generado en pasos anteriores
    const storedCaseId = localStorage.getItem("currentCaseId");
    if (storedCaseId) {
        reportId.value = storedCaseId;
    }
});

// --- Lógica de Botones ---
const viewReport = () => {
    console.log(
        `Abriendo vista de detalles para el reporte: ${reportId.value}`,
    );
    localStorage.removeItem("currentCaseId");
    resetStore();
    router.push({ path: "/historial", query: { caso: reportId.value } });
};

const goHome = () => {
    console.log("Navegando al Dashboard principal...");
    localStorage.removeItem("currentCaseId");
    resetStore();
    router.push({ name: "dashboard" });
};

const newIncident = () => {
    console.log("Reiniciando el flujo de registro...");
    localStorage.removeItem("currentCaseId");
    resetStore();
    router.push({ name: "registrar-incidente" });
};

// --- Navegación General ---
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
    --bg-card: #0a1d47;
    --border-color: #1d2c52;
    --text-main: #ffffff;
    --text-muted: #8aabbb;

    --primary-blue: #2563eb;
    --accent-blue: #336bfa;
    --safe: #00e676;
    --critical: #ff1744;

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

/* --- VISTA DE ÉXITO --- */
.success-view {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    max-width: 1000px;
    margin: 0 auto;
    padding-top: 20px;
}

/* Tarjeta Central */
.success-card {
    width: 100%;
    background-color: transparent;
    border: 1px solid var(--accent-blue);
    border-radius: 16px;
    padding: 60px 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
}

/* Icono Verde Animado */
.success-icon-wrapper {
    margin-bottom: 25px;
    animation: popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
}
.success-icon-wrapper i {
    font-size: 90px;
    color: var(--safe);
}

@keyframes popIn {
    0% {
        transform: scale(0);
        opacity: 0;
    }
    100% {
        transform: scale(1);
        opacity: 1;
    }
}

.success-card h2 {
    font-size: 24px;
    font-weight: 600;
    margin: 0 0 10px 0;
}
.success-card p {
    font-size: 14px;
    color: var(--text-muted);
    margin: 0;
}

/* Sección del ID del Reporte */
.report-id-section {
    width: 60%;
    margin: 40px 0;
    padding: 30px 0;
    border-top: 1px solid var(--border-color);
    border-bottom: 1px solid var(--border-color);
}
.report-label {
    font-size: 11px;
    color: var(--text-muted);
    letter-spacing: 1px;
    margin-bottom: 10px;
    display: block;
}
.report-value {
    font-size: 28px;
    font-weight: 700;
    color: var(--accent-blue);
}

/* Botones dentro de la tarjeta */
.card-actions {
    display: flex;
    gap: 20px;
    justify-content: center;
}
.btn {
    padding: 14px 30px;
    border-radius: 10px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: 0.2s;
    display: flex;
    align-items: center;
    gap: 8px;
}
.btn-outline {
    background-color: transparent;
    border: 1px solid var(--border-color);
    color: var(--text-main);
}
.btn-outline:hover {
    background-color: rgba(255, 255, 255, 0.05);
    border-color: #3b4c6b;
}

/* Botón Inferior Principal */
.bottom-action-area {
    margin-top: 40px;
    margin-bottom: 20px;
}
.btn-primary {
    background-color: var(--primary-blue);
    border: 1px solid var(--primary-blue);
    color: white;
    padding: 14px 40px;
}
.btn-primary:hover {
    background-color: var(--accent-blue);
}

/* Responsividad */
@media (max-width: 768px) {
    .report-id-section {
        width: 100%;
    }
    .card-actions {
        flex-direction: column;
        width: 100%;
    }
    .card-actions .btn {
        width: 100%;
        justify-content: center;
    }
}
</style>
