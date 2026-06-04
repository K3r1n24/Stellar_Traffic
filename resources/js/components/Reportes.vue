<template>
    <div class="dashboard">
        <Sidebar />

        <main class="main-content">
            <TopHeader
                title="Informes Estadísticos"
                subtitle="Análisis de datos históricos y distribución de incidentes"
            />

            <!-- Botones de Acción -->
            <div class="actions-bar" v-if="accidentes.length > 0">
                <button class="btn btn-primary" @click="exportReport">
                    <i class="ph ph-printer"></i> Imprimir Reporte
                </button>
            </div>

            <!-- Cargando -->
            <div v-if="isLoading" class="loading-state">
                <div class="spinner"></div>
                <p>Procesando estadísticas de la base de datos...</p>
            </div>

            <!-- Contenedor de Reportes con datos -->
            <div v-else-if="accidentes.length > 0" class="report-grid">
                <!-- Tarjeta 1: Distribución por Gravedad -->
                <div class="report-card">
                    <div class="card-title-header">
                        <i class="ph ph-chart-bar"></i>
                        <h4>Distribución de Gravedad</h4>
                    </div>
                    <div class="stat-items-group">
                        <div
                            class="stat-progress-item"
                            v-for="item in gravedadStats"
                            :key="item.name"
                        >
                            <div class="item-info">
                                <span class="item-name">{{ item.name }}</span>
                                <span class="item-count"
                                    >{{ item.count }} ({{
                                        item.percentage
                                    }}%)</span
                                >
                            </div>
                            <div class="progress-bar-container">
                                <div
                                    class="progress-bar-fill"
                                    :class="item.class"
                                    :style="{ width: item.percentage + '%' }"
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Tarjeta 2: Tipos de Accidentes -->
                <div class="report-card">
                    <div class="card-title-header">
                        <i class="ph ph-chart-pie"></i>
                        <h4>Tipos de Incidentes</h4>
                    </div>
                    <div class="types-distribution">
                        <div class="comparison-bar-wrapper">
                            <div class="bar-legend">
                                <span class="legend-dot bg-victimas"></span>
                                <span
                                    >Con víctimas:
                                    {{ typeStats.victimas.percentage }}%</span
                                >
                            </div>
                            <div class="bar-legend">
                                <span class="legend-dot bg-materiales"></span>
                                <span
                                    >Daños materiales:
                                    {{ typeStats.materiales.percentage }}%</span
                                >
                            </div>
                            <div class="dual-progress-bar">
                                <div
                                    class="fill-victimas"
                                    :style="{
                                        width:
                                            typeStats.victimas.percentage + '%',
                                    }"
                                ></div>
                                <div
                                    class="fill-materiales"
                                    :style="{
                                        width:
                                            typeStats.materiales.percentage +
                                            '%',
                                    }"
                                ></div>
                            </div>
                        </div>
                        <div class="grid-2-cols" style="margin-top: 25px">
                            <div class="mini-data-box text-warning">
                                <h5>Víctimas</h5>
                                <h3>{{ typeStats.victimas.count }}</h3>
                            </div>
                            <div class="mini-data-box text-info">
                                <h5>Daños Mat.</h5>
                                <h3>{{ typeStats.materiales.count }}</h3>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Tarjeta 3: Top Zonas/Municipios con Mayor Incidencia -->
                <div class="report-card">
                    <div class="card-title-header">
                        <i class="ph ph-map-pin"></i>
                        <h4>Top Distritos / Municipios</h4>
                    </div>
                    <div
                        class="stat-items-group"
                        v-if="municipioStats.length > 0"
                    >
                        <div
                            class="stat-progress-item"
                            v-for="(item, idx) in municipioStats"
                            :key="item.name"
                        >
                            <div class="item-info">
                                <span class="item-name"
                                    ><strong style="color: var(--accent-blue)"
                                        >#{{ idx + 1 }}</strong
                                    >
                                    {{ item.name }}</span
                                >
                                <span class="item-count"
                                    >{{ item.count }} reportes</span
                                >
                            </div>
                            <div class="progress-bar-container">
                                <div
                                    class="progress-bar-fill bg-blue"
                                    :style="{ width: item.percentage + '%' }"
                                ></div>
                            </div>
                        </div>
                    </div>
                    <div v-else class="no-data-mini">Sin datos de distritos</div>
                </div>

                <!-- Tarjeta 4: Resumen de Condiciones Ambientales / Vía -->
                <div class="report-card">
                    <div class="card-title-header">
                        <i class="ph ph-cloud-sun"></i>
                        <h4>Condiciones de la Vía</h4>
                    </div>
                    <div class="grid-2-cols" style="gap: 20px">
                        <div class="stat-sub-section">
                            <h5>Condición Climática</h5>
                            <ul class="simple-stat-list">
                                <li
                                    v-for="item in climaStats"
                                    :key="item.name"
                                >
                                    <span>{{
                                        item.name || "No especificado"
                                    }}</span>
                                    <strong>{{ item.count }}</strong>
                                </li>
                            </ul>
                        </div>
                        <div class="stat-sub-section">
                            <h5>Tipo de Calzada</h5>
                            <ul class="simple-stat-list">
                                <li v-for="item in viaStats" :key="item.name">
                                    <span>{{
                                        item.name || "No especificado"
                                    }}</span>
                                    <strong>{{ item.count }}</strong>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Sin datos -->
            <div v-else class="empty-state">
                <i class="ph ph-file-text"></i>
                <h2>No hay suficientes datos</h2>
                <p>
                    Registra incidentes primero para poder generar informes
                    estadísticos.
                </p>
            </div>
        </main>
    </div>
</template>

<script setup>
import Sidebar from "./Sidebar.vue";
import TopHeader from "./TopHeader.vue";
import { ref, computed, onMounted } from "vue";
import axios from "axios";

// Estados reactivos
const accidentes = ref([]);
const isLoading = ref(true);

// Consultar accidentes de la base de datos
const fetchAccidentes = async () => {
    try {
        const response = await axios.get("/accidentes");
        accidentes.value = response.data;
    } catch (err) {
        console.error("Error al cargar datos de reportes:", err);
    } finally {
        isLoading.value = false;
    }
};

// 1. Estadísticas de gravedad
const gravedadStats = computed(() => {
    const counts = { Crítico: 0, Alto: 0, Medio: 0, Bajo: 0 };
    accidentes.value.forEach((a) => {
        const g = a.gravedad || "Medio";
        if (counts[g] !== undefined) {
            counts[g]++;
        } else {
            counts["Medio"]++;
        }
    });

    const total = accidentes.value.length || 1;
    return [
        {
            name: "Crítico",
            count: counts["Crítico"],
            percentage: Math.round((counts["Crítico"] / total) * 100),
            class: "bg-critical",
        },
        {
            name: "Alto",
            count: counts["Alto"],
            percentage: Math.round((counts["Alto"] / total) * 100),
            class: "bg-alto",
        },
        {
            name: "Medio",
            count: counts["Medio"],
            percentage: Math.round((counts["Medio"] / total) * 100),
            class: "bg-medio",
        },
        {
            name: "Bajo / Seguro",
            count: counts["Bajo"],
            percentage: Math.round((counts["Bajo"] / total) * 100),
            class: "bg-bajo",
        },
    ];
});

// 2. Estadísticas de tipo de accidente
const typeStats = computed(() => {
    let victimas = 0;
    let materiales = 0;
    accidentes.value.forEach((a) => {
        if (a.tipo_accidente === "victimas") victimas++;
        else materiales++;
    });

    const total = accidentes.value.length || 1;
    return {
        victimas: {
            count: victimas,
            percentage: Math.round((victimas / total) * 100),
        },
        materiales: {
            count: materiales,
            percentage: Math.round((materiales / total) * 100),
        },
    };
});

// 3. Top municipios / distritos (ranking)
const municipioStats = computed(() => {
    const counts = {};
    accidentes.value.forEach((a) => {
        if (a.municipio) {
            counts[a.municipio] = (counts[a.municipio] || 0) + 1;
        }
    });

    // Ordenar y tomar los top 3
    const sorted = Object.entries(counts)
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 3);

    // Encontrar el valor más alto para representar el 100% de la barra de progreso
    const maxVal = sorted.length > 0 ? sorted[0].count : 1;

    return sorted.map((item) => ({
        ...item,
        percentage: Math.round((item.count / maxVal) * 100),
    }));
});

// 4. Estadísticas del clima (top 3)
const climaStats = computed(() => {
    const counts = {};
    accidentes.value.forEach((a) => {
        const c = a.condicion_climatica || "Despejado";
        counts[c] = (counts[c] || 0) + 1;
    });
    return Object.entries(counts)
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 3);
});

// 5. Estadísticas de tipo de vía (top 3)
const viaStats = computed(() => {
    const counts = {};
    accidentes.value.forEach((a) => {
        const v = a.tipo_via || "Calle urbana";
        counts[v] = (counts[v] || 0) + 1;
    });
    return Object.entries(counts)
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 3);
});

// Lanzar cuadro de diálogo de impresión nativo del navegador
const exportReport = () => {
    window.print();
};

onMounted(() => {
    fetchAccidentes();
});
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
    --safe: #22c55e;
    --warning: #f59e0b;
    --critical: #dc2626;

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

.main-content {
    flex: 1;
    padding: 30px 40px;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
}

/* Barra de acciones */
.actions-bar {
    display: flex;
    justify-content: flex-end;
    margin-top: 25px;
    margin-bottom: 10px;
}

.btn {
    padding: 12px 25px;
    border-radius: 10px;
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    transition: 0.2s;
    display: flex;
    align-items: center;
    gap: 10px;
}

.btn-primary {
    background-color: var(--primary-blue);
    border: 1px solid var(--primary-blue);
    color: white;
}

.btn-primary:hover {
    background-color: var(--accent-blue);
}

/* Spinner */
.loading-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 100px 0;
    gap: 15px;
    color: var(--text-muted);
}

.spinner {
    width: 40px;
    height: 40px;
    border: 4px solid rgba(255, 255, 255, 0.1);
    border-top-color: var(--accent-blue);
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}

/* Cuadrícula de reportes */
.report-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 25px;
    margin-top: 20px;
    margin-bottom: 40px;
}

.report-card {
    background-color: var(--bg-card);
    border: 1px solid var(--border-color);
    border-radius: 16px;
    padding: 30px;
    display: flex;
    flex-direction: column;
    gap: 25px;
}

.card-title-header {
    display: flex;
    align-items: center;
    gap: 12px;
    border-bottom: 1px solid var(--border-color);
    padding-bottom: 15px;
}

.card-title-header i {
    font-size: 22px;
    color: var(--accent-blue);
}

.card-title-header h4 {
    font-size: 15px;
    font-weight: 600;
    margin: 0;
}

/* Elementos de barra de progreso */
.stat-items-group {
    display: flex;
    flex-direction: column;
    gap: 18px;
}

.stat-progress-item {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.item-info {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
}

.item-name {
    color: var(--text-main);
    font-weight: 500;
}

.item-count {
    color: var(--text-muted);
}

.progress-bar-container {
    width: 100%;
    height: 8px;
    background-color: rgba(255, 255, 255, 0.05);
    border-radius: 4px;
    overflow: hidden;
}

.progress-bar-fill {
    height: 100%;
    border-radius: 4px;
    transition: width 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.bg-critical {
    background-color: var(--critical);
}
.bg-alto {
    background-color: #ef4444;
}
.bg-medio {
    background-color: var(--warning);
}
.bg-bajo {
    background-color: var(--safe);
}
.bg-blue {
    background-color: var(--accent-blue);
}

/* Distribución por tipo de incidentes */
.types-distribution {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.comparison-bar-wrapper {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.bar-legend {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 13px;
}

.legend-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
}

.bg-victimas {
    background-color: var(--warning);
}
.bg-materiales {
    background-color: var(--accent-blue);
}

.dual-progress-bar {
    width: 100%;
    height: 12px;
    background-color: rgba(255, 255, 255, 0.05);
    border-radius: 6px;
    overflow: hidden;
    display: flex;
}

.fill-victimas {
    height: 100%;
    background-color: var(--warning);
    transition: width 0.8s ease;
}

.fill-materiales {
    height: 100%;
    background-color: var(--accent-blue);
    transition: width 0.8s ease;
}

.grid-2-cols {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 15px;
}

.mini-data-box {
    background-color: rgba(0, 0, 0, 0.15);
    border: 1px solid var(--border-color);
    border-radius: 12px;
    padding: 15px;
    text-align: center;
}

.mini-data-box h5 {
    font-size: 11px;
    color: var(--text-muted);
    text-transform: uppercase;
    margin: 0 0 5px 0;
}

.mini-data-box h3 {
    font-size: 24px;
    font-weight: bold;
    margin: 0;
}

.mini-data-box.text-warning h3 {
    color: var(--warning);
}
.mini-data-box.text-info h3 {
    color: var(--accent-blue);
}

/* Subsección de tablas simples */
.stat-sub-section {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.stat-sub-section h5 {
    font-size: 12px;
    color: var(--text-muted);
    text-transform: uppercase;
    margin: 0;
    border-bottom: 1px solid var(--border-color);
    padding-bottom: 8px;
}

.simple-stat-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.simple-stat-list li {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
}

.simple-stat-list li span {
    color: var(--text-muted);
}

.simple-stat-list li strong {
    color: var(--text-main);
}

.no-data-mini {
    text-align: center;
    color: var(--text-muted);
    font-size: 13px;
    padding: 20px 0;
}

/* Estado vacío */
.empty-state {
    text-align: center;
    padding: 100px 0;
    color: var(--text-muted);
}

.empty-state i {
    font-size: 64px;
    margin-bottom: 20px;
    color: var(--border-color);
}

.empty-state h2 {
    font-size: 20px;
    font-weight: 600;
    color: var(--text-main);
    margin: 0 0 8px 0;
}

.empty-state p {
    font-size: 13px;
    margin: 0;
}

/* --- ESTILOS DE IMPRESIÓN (window.print) --- */
@media print {
    .sidebar,
    .actions-bar,
    header,
    .header-actions,
    .main-content > :first-child {
        display: none !important;
    }
    .main-content {
        padding: 0 !important;
        background-color: white !important;
        color: black !important;
    }
    .report-card {
        background-color: white !important;
        border: 1px solid #ccc !important;
        color: black !important;
        page-break-inside: avoid;
        box-shadow: none !important;
    }
    .card-title-header h4 {
        color: black !important;
    }
    .mini-data-box {
        background-color: #f5f5f5 !important;
        border: 1px solid #ccc !important;
        color: black !important;
    }
    .dashboard {
        background-color: white !important;
        color: black !important;
    }
    .progress-bar-container,
    .dual-progress-bar {
        background-color: #e0e0e0 !important;
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
    }
    .progress-bar-fill,
    .fill-victimas,
    .fill-materiales {
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
    }
}

/* Responsividad */
@media (max-width: 1024px) {
    .report-grid {
        grid-template-columns: 1fr;
    }
}
</style>
