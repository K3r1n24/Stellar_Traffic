<template>
    <div class="dashboard">
        <Sidebar />

        <main class="main-content">
            <TopHeader
                title="Monitoreo Vial"
                subtitle="Geolocalización de incidentes y alertas en tiempo real"
            />

            <div class="map-container">
                <!-- Panel lateral de alertas activas -->
                <div class="map-sidebar-info" v-if="incidentes.length > 0">
                    <div class="info-header">
                        <i class="ph ph-warning-circle"></i>
                        <h3>Alertas Activas</h3>
                    </div>
                    <div class="incidents-list">
                        <div
                            v-for="incidente in incidentes"
                            :key="incidente.id_accidente"
                            class="incident-list-item"
                            :class="[
                                'severity-' +
                                    (incidente.gravedad || 'Medio').toLowerCase(),
                            ]"
                            @click="focusIncident(incidente)"
                        >
                            <div class="item-header">
                                <span class="case-id">{{
                                    incidente.id_caso || "N/A"
                                }}</span>
                                <span class="badge">{{
                                    incidente.gravedad || "Medio"
                                }}</span>
                            </div>
                            <span class="type-text">{{
                                incidente.tipo_accidente === "victimas"
                                    ? "Con víctimas"
                                    : "Daños materiales"
                            }}</span>
                            <p class="address-text">
                                {{ incidente.direccion || "Sin dirección" }}
                            </p>
                        </div>
                    </div>
                </div>

                <!-- Contenedor del mapa Leaflet -->
                <div class="map-wrapper-card">
                    <div v-if="mapError" class="map-error-overlay">
                        <i class="ph ph-warning-octagon"></i>
                        <p>{{ mapError }}</p>
                    </div>
                    <div v-else-if="isLoading" class="map-loading-overlay">
                        <div class="spinner"></div>
                        <p>Cargando mapa de monitoreo vial...</p>
                    </div>
                    <div id="global-map"></div>
                </div>
            </div>
        </main>
    </div>
</template>

<script setup>
import Sidebar from "./Sidebar.vue";
import TopHeader from "./TopHeader.vue";
import { onMounted, onUnmounted, ref } from "vue";
import axios from "axios";

// Estados reactivos
const incidentes = ref([]);
const isLoading = ref(true);
const mapError = ref(null);

let map = null;
let resizeObserver = null;
const markers = {}; // Almacenar marcadores por id_accidente para enfocarlos al hacer click

// Coordenadas predeterminadas centradas en San Miguel, El Salvador
const defaultCenter = [13.4789, -88.1772];

// Función para obtener coordenadas simuladas distribuidas en San Miguel (fallback si Nominatim falla)
const getRandomCoordsInSanMiguel = () => {
    const offsetLat = (Math.random() - 0.5) * 0.025;
    const offsetLng = (Math.random() - 0.5) * 0.025;
    return [defaultCenter[0] + offsetLat, defaultCenter[1] + offsetLng];
};

// Generar icono personalizado palpitante según la gravedad del accidente
const getMarkerIcon = (gravedad) => {
    let color = "#3b82f6"; // Azul por defecto (Bajo/Seguro)
    const g = (gravedad || "").toLowerCase();
    if (g === "crítico" || g === "critico") color = "#dc2626"; // Rojo crítico
    else if (g === "alto") color = "#ef4444"; // Naranja/Rojo alto
    else if (g === "medio") color = "#f59e0b"; // Amarillo medio
    else if (g === "bajo" || g === "seguro") color = "#22c55e"; // Verde bajo

    return window.L.divIcon({
        className: "custom-map-marker",
        html: `
            <div style="position: relative; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center;">
                <div style="position: absolute; width: 100%; height: 100%; border-radius: 50%; background-color: ${color}; opacity: 0.25; animation: marker-pulse 1.8s infinite ease-in-out;"></div>
                <div style="position: absolute; width: 12px; height: 12px; border-radius: 50%; background-color: ${color}; border: 2px solid #ffffff; box-shadow: 0 0 8px rgba(0,0,0,0.5);"></div>
            </div>
        `,
        iconSize: [24, 24],
        iconAnchor: [12, 12],
    });
};

// Enfocar e interactuar con el marcador del mapa cuando se hace click en la lista
const focusIncident = (incidente) => {
    const marker = markers[incidente.id_accidente];
    if (marker && map) {
        map.setView(marker.getLatLng(), 17);
        marker.openPopup();
    }
};

// Geocodificar direcciones de texto a coordenadas usando Nominatim de OpenStreetMap
const geocodeAddress = async (direccion, municipio) => {
    const query = `${direccion}, ${municipio}, El Salvador`;
    try {
        const response = await axios.get(
            "https://nominatim.openstreetmap.org/search",
            {
                params: {
                    q: query,
                    format: "json",
                    limit: 1,
                },
            }
        );
        if (response.data && response.data.length > 0) {
            return [
                parseFloat(response.data[0].lat),
                parseFloat(response.data[0].lon),
            ];
        }
    } catch (err) {
        console.warn(
            `Error al geocodificar dirección: ${direccion}. Usando fallback...`,
            err
        );
    }
    return null;
};

// Consultar incidentes de la BD y renderizarlos en el mapa Leaflet
const fetchAndRenderIncidentes = async () => {
    try {
        const response = await axios.get("/accidentes");
        incidentes.value = response.data;
        console.log("Incidentes cargados:", incidentes.value);

        if (!map) return;

        // Procesar incidentes en paralelo
        const promises = incidentes.value.map(async (incidente, idx) => {
            let coords = null;

            // Geocodificar solo los primeros 3 para no saturar ni ser bloqueados por la API pública de Nominatim
            if (idx < 3 && incidente.direccion) {
                coords = await geocodeAddress(
                    incidente.direccion,
                    incidente.municipio || "San Miguel"
                );
            }

            // Fallback de dispersión simulada alrededor de San Miguel si falla geocodificación o supera el límite
            if (!coords) {
                coords = getRandomCoordsInSanMiguel();
            }

            // Agregar marcador al mapa con popup informativo estilizado
            if (coords && window.L) {
                const marker = window.L.marker(coords, {
                    icon: getMarkerIcon(incidente.gravedad),
                }).addTo(map);

                const popupContent = `
                    <div style="color: #ffffff; font-family: 'Segoe UI', sans-serif; min-width: 220px; padding: 5px; background: transparent;">
                        <h4 style="margin: 0 0 8px 0; color: #3b82f6; font-size: 13px; border-bottom: 1px solid #1f293d; padding-bottom: 5px; font-weight: 600;">
                            Caso ID: ${incidente.id_caso || "N/A"}
                        </h4>
                        <div style="font-size: 11px; margin-bottom: 5px;">
                            <strong style="color: #8b95a5;">Tipo:</strong> 
                            <span style="color: #ffffff;">${incidente.tipo_accidente === "victimas" ? "Con víctimas" : "Daños materiales"}</span>
                        </div>
                        <div style="font-size: 11px; margin-bottom: 5px;">
                            <strong style="color: #8b95a5;">Gravedad:</strong> 
                            <span style="color: ${
                                incidente.gravedad === "Crítico"
                                    ? "#dc2626"
                                    : incidente.gravedad === "Alto"
                                      ? "#ef4444"
                                      : incidente.gravedad === "Medio"
                                        ? "#f59e0b"
                                        : "#22c55e"
                            }; font-weight: 600;">
                                ${incidente.gravedad || "No especificada"}
                            </span>
                        </div>
                        <div style="font-size: 11px; margin-bottom: 5px;">
                            <strong style="color: #8b95a5;">Fecha:</strong> 
                            <span style="color: #ffffff;">${incidente.fecha_incidente || "N/A"}</span>
                        </div>
                        <div style="font-size: 11px; margin-bottom: 5px;">
                            <strong style="color: #8b95a5;">Dirección:</strong> 
                            <span style="color: #ffffff; display: block; margin-top: 2px; line-height: 1.3;">${incidente.direccion || "N/A"}</span>
                        </div>
                        ${
                            incidente.descripcion
                                ? `
                        <div style="font-size: 10px; margin-top: 8px; background: #0f1524; padding: 8px; border-radius: 6px; border: 1px solid #1f293d; max-height: 70px; overflow-y: auto;">
                            <strong style="color: #8b95a5; display: block; margin-bottom: 2px;">Descripción:</strong>
                            <span style="color: #d1d5db; line-height: 1.3;">${incidente.descripcion}</span>
                        </div>
                        `
                                : ""
                        }
                    </div>
                `;

                marker.bindPopup(popupContent, {
                    className: "dark-theme-popup",
                    closeButton: false,
                });

                markers[incidente.id_accidente] = marker;
            }
        });

        await Promise.all(promises);
    } catch (err) {
        console.error("Error al renderizar incidentes en el mapa:", err);
    } finally {
        isLoading.value = false;
    }
};

// Inicializar el mapa
const initMap = () => {
    if (!window.L) {
        mapError.value = "Leaflet no cargó correctamente. Reintentando...";
        return;
    }

    try {
        map = window.L.map("global-map").setView(defaultCenter, 14);

        // Capa oscura de CartoDB a juego con el tema de la aplicación
        window.L.tileLayer(
            "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
            {
                attribution:
                    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                subdomains: "abcd",
                maxZoom: 20,
            }
        ).addTo(map);

        // ResizeObserver para recalcular el tamaño del mapa cuando la sidebar cambie de tamaño
        const mapElement = document.getElementById("global-map");
        if (mapElement && "ResizeObserver" in window) {
            resizeObserver = new ResizeObserver(() => {
                if (map) {
                    map.invalidateSize();
                }
            });
            resizeObserver.observe(mapElement);
        }

        // Obtener y pintar los marcadores
        fetchAndRenderIncidentes();
    } catch (err) {
        console.error("Error al inicializar el mapa Leaflet:", err);
        mapError.value = "Error al iniciar el mapa interactivo.";
        isLoading.value = false;
    }
};

onMounted(() => {
    // Retraso para garantizar que el DOM esté montado
    setTimeout(() => {
        initMap();
    }, 150);
});

onUnmounted(() => {
    if (resizeObserver) {
        resizeObserver.disconnect();
    }
    if (map) {
        map.remove();
    }
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

/* --- CONTENIDO PRINCIPAL --- */
.main-content {
    flex: 1;
    padding: 30px 40px;
    display: flex;
    flex-direction: column;
    overflow-y: hidden; /* Evitar scroll en el contenedor principal */
}

/* Contenedor del mapa y panel */
.map-container {
    flex: 1;
    display: flex;
    gap: 25px;
    margin-top: 25px;
    height: calc(100vh - 150px);
    overflow: hidden;
}

/* Barra lateral de alertas */
.map-sidebar-info {
    width: 320px;
    background-color: var(--bg-card);
    border: 1px solid var(--border-color);
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    flex-shrink: 0;
}

.info-header {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 20px;
    border-bottom: 1px solid var(--border-color);
}

.info-header i {
    font-size: 20px;
    color: var(--accent-blue);
}

.info-header h3 {
    font-size: 15px;
    font-weight: 600;
    margin: 0;
}

.incidents-list {
    flex: 1;
    overflow-y: auto;
    padding: 15px;
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.incident-list-item {
    background-color: rgba(255, 255, 255, 0.02);
    border: 1px solid var(--border-color);
    border-radius: 10px;
    padding: 15px;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.incident-list-item:hover {
    border-color: var(--accent-blue);
    background-color: rgba(37, 99, 235, 0.05);
    transform: translateY(-2px);
}

.item-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.case-id {
    font-size: 12px;
    font-weight: bold;
    color: var(--accent-blue);
}

.badge {
    font-size: 9px;
    font-weight: bold;
    text-transform: uppercase;
    padding: 3px 8px;
    border-radius: 4px;
}

.type-text {
    font-size: 12px;
    font-weight: 500;
}

.address-text {
    font-size: 11px;
    color: var(--text-muted);
    line-height: 1.4;
}

/* Colores según gravedad de alertas */
.severity-crítico .badge,
.severity-critico .badge {
    background-color: rgba(220, 38, 38, 0.15);
    color: #ef4444;
    border: 1px solid rgba(220, 38, 38, 0.3);
}
.severity-alto .badge {
    background-color: rgba(239, 68, 68, 0.15);
    color: #f87171;
    border: 1px solid rgba(239, 68, 68, 0.3);
}
.severity-medio .badge {
    background-color: rgba(245, 158, 11, 0.15);
    color: #fbbf24;
    border: 1px solid rgba(245, 158, 11, 0.3);
}
.severity-bajo .badge,
.severity-seguro .badge {
    background-color: rgba(34, 197, 94, 0.15);
    color: #4ade80;
    border: 1px solid rgba(34, 197, 94, 0.3);
}

/* Envoltorio Leaflet */
.map-wrapper-card {
    flex: 1;
    border-radius: 16px;
    overflow: hidden;
    border: 1px solid var(--border-color);
    position: relative;
    height: 100%;
}

#global-map {
    width: 100%;
    height: 100%;
    z-index: 1;
}

/* Controles Leaflet oscuros */
:deep(.leaflet-bar a) {
    background-color: var(--bg-card) !important;
    color: var(--text-main) !important;
    border-color: var(--border-color) !important;
}

:deep(.leaflet-bar a:hover) {
    background-color: var(--border-color) !important;
}

/* Popups Leaflet oscuros */
:deep(.dark-theme-popup .leaflet-popup-content-wrapper) {
    background-color: var(--bg-card) !important;
    color: var(--text-main) !important;
    border: 1px solid var(--accent-blue) !important;
    border-radius: 12px !important;
    padding: 8px !important;
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.7) !important;
}

:deep(.dark-theme-popup .leaflet-popup-tip) {
    background: var(--bg-card) !important;
    border-left: 1px solid var(--accent-blue) !important;
    border-bottom: 1px solid var(--accent-blue) !important;
}

/* Pulso del marcador en CSS */
@keyframes marker-pulse {
    0% {
        transform: scale(0.6);
        opacity: 0.6;
    }
    100% {
        transform: scale(1.6);
        opacity: 0;
    }
}

/* Overlays */
.map-loading-overlay,
.map-error-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: var(--bg-dark);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 15px;
    z-index: 10;
}

.map-error-overlay i {
    font-size: 40px;
    color: var(--critical);
}

.map-error-overlay p {
    color: var(--text-muted);
    font-size: 14px;
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

/* Responsividad */
@media (max-width: 900px) {
    .map-container {
        flex-direction: column-reverse;
    }
    .map-sidebar-info {
        width: 100%;
        height: 250px;
    }
}
</style>
