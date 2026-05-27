<template>
    <div class="dashboard">
<<<<<<< HEAD
        
        <!-- BARRA LATERAL (SIDEBAR) -->
        <aside class="sidebar">
            <div class="user-profile">
                <div class="avatar">LZ</div>
                <div class="user-info">
                    <h4>Luis Zelaya</h4>
                    <span>PANEL DE CONTROL PNC</span>
                </div>
                <i class="ph ph-list menu-icon"></i>
            </div>

            <div class="nav-section">
                <p class="nav-title">PRINCIPAL</p>
                <ul class="nav-list" id="main-nav">
                    <li class="nav-item" @click="goTo('/dashboard')"><i class="ph ph-house"></i> Inicio</li>
                    <li class="nav-item" @click="goTo('/registrar-incidente')"><i class="ph ph-plus-square"></i> Registrar incidente</li>
                    <li class="nav-item"><i class="ph ph-magnifying-glass"></i> Buscar casos</li>
                    <li class="nav-item active"><i class="ph ph-map-pin"></i> Ver mapa</li>
                </ul>
            </div>

            <div class="nav-section">
                <p class="nav-title">SISTEMA</p>
                <ul class="nav-list">
                    <li class="nav-item"><i class="ph ph-file-text"></i> Reportes</li>
                    <li class="nav-item"><i class="ph ph-clock-counter-clockwise"></i> Historial</li>
                    <li class="nav-item"><i class="ph ph-gear"></i> Configuración</li>
                    <li class="nav-item"><i class="ph ph-question"></i> Ayuda</li>
                </ul>
            </div>

            <div class="logout" @click="handleLogout">
                <i class="ph ph-sign-out"></i> Salir de la cuenta
            </div>
        </aside>

        <!-- CONTENIDO PRINCIPAL -->
        <main class="main-content">
            
            <header class="header">
                <div class="header-titles">
                    <h1>Mapa de Incidentes</h1>
                    <p>Monitoreo vial y distribución geográfica de colisiones en tiempo real</p>
                </div>
                <div class="header-actions">
                    <div class="datetime-pill">
                        <i class="ph ph-calendar-blank"></i>
                        <div class="dt-text">
                            <span class="date">12 Mayo 2026</span>
                            <span class="time">09:23 PM</span>
                        </div>
                    </div>
                    <div class="notification">
                        <i class="ph ph-bell"></i>
                        <span class="badge">2</span>
                    </div>
                </div>
            </header>

            <div class="map-layout">
                <!-- CONTENEDOR DEL MAPA -->
                <div class="map-container-card">
                    <div class="map-header">
                        <div class="map-title-group">
                            <i class="ph ph-globe-hemisphere-west"></i>
                            <div class="map-title-text">
                                <h3>Visualizador Geográfico</h3>
                                <p>Explora los incidentes reportados en tu zona de cobertura</p>
                            </div>
                        </div>

                        <!-- BUSCADOR -->
                        <div class="search-wrapper">
                            <i class="ph ph-magnifying-glass"></i>
                            <input 
                                type="text" 
                                class="search-input" 
                                placeholder="Buscar dirección, cantón o provincia" 
                                v-model="searchQuery" 
                                @keypress.enter="handleSearch"
                            >
                        </div>
                    </div>

                    <div class="leaflet-container-wrapper">
                        <!-- Pantalla de Error -->
                        <div v-if="mapError" class="map-error-overlay">
                            <i class="ph ph-warning-octagon"></i>
                            <p>{{ mapError }}</p>
                        </div>
                        
                        <!-- Pantalla de Carga -->
                        <div v-else-if="isLoadingMap" class="map-loading-overlay">
                            <div class="spinner"></div>
                            <p>Cargando mapa interactivo...</p>
                        </div>
                        
                        <!-- Elemento del mapa -->
                        <div id="general-incidents-map"></div>
                    </div>

                    <!-- LEYENDA DEL MAPA -->
                    <div class="map-legend">
                        <span class="legend-title">Leyenda de Criticidad:</span>
                        <div class="legend-items">
                            <div class="legend-item"><span class="legend-dot bg-low"></span><span>Bajo</span></div>
                            <div class="legend-item"><span class="legend-dot bg-medium"></span><span>Medio</span></div>
                            <div class="legend-item"><span class="legend-dot bg-high"></span><span>Alto</span></div>
                            <div class="legend-item"><span class="legend-dot bg-critical"></span><span>Crítico</span></div>
                        </div>
                    </div>
                </div>

                <!-- PANEL LATERAL DE DETALLES DEL INCIDENTE SELECCIONADO -->
                <div class="incident-detail-panel" :class="{ 'panel-visible': selectedIncident }">
                    <div v-if="selectedIncident" class="panel-content-wrapper">
                        <div class="panel-header">
                            <span class="incident-id">Caso #{{ selectedIncident.id }}</span>
                            <button class="close-panel-btn" @click="selectedIncident = null">
                                <i class="ph ph-x"></i>
                            </button>
                        </div>

                        <div class="severity-badge-container">
                            <span :class="['badge-severity', `sev-${selectedIncident.severity}`]">
                                {{ selectedIncident.severityText }}
                            </span>
                        </div>

                        <h3 class="incident-title">{{ selectedIncident.title }}</h3>
                        
                        <div class="incident-meta-info">
                            <div class="meta-row">
                                <i class="ph ph-calendar-blank"></i>
                                <span>{{ selectedIncident.date }} - {{ selectedIncident.time }}</span>
                            </div>
                            <div class="meta-row">
                                <i class="ph ph-map-pin"></i>
                                <span>{{ selectedIncident.address }}</span>
                            </div>
                        </div>

                        <div class="panel-divider"></div>

                        <div class="incident-description-section">
                            <h4>Descripción del Evento</h4>
                            <p>{{ selectedIncident.description }}</p>
                        </div>

                        <div class="panel-divider"></div>

                        <div class="incident-actions">
                            <button class="btn btn-primary btn-block" @click="goDetailedCase(selectedIncident.id)">
                                Ver Expediente Completo
                            </button>
                        </div>
                    </div>
                    
                    <div v-else class="panel-empty-state">
                        <i class="ph ph-info"></i>
                        <p>Selecciona un incidente en el mapa para ver sus detalles</p>
                    </div>
                </div>
=======
        <Sidebar />
        <main class="main-content">
            <TopHeader title="Ver Mapa" subtitle="Geolocalización de incidentes" />
            <div class="content-wrapper" style="margin-top: 30px; text-align: center; color: var(--text-muted);">
                <i class="ph ph-map-pin" style="font-size: 64px; margin-bottom: 20px;"></i>
                <h2>Mapa Global</h2>
                <p>Mapa interactivo en construcción...</p>
>>>>>>> origin/main
            </div>
        </main>
    </div>
</template>

<script setup>
<<<<<<< HEAD
import { onMounted, onUnmounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();

// Estados reactivos
const searchQuery = ref('');
const isLoadingMap = ref(true);
const mapError = ref(null);
const selectedIncident = ref(null);
let map = null;

// Lista de Incidentes Simulados (Mock Data) en San José, Costa Rica
const mockIncidents = ref([
    {
        id: "2026-0842",
        title: "Colisión Múltiple en Paseo Colón",
        type: "materiales",
        severity: "high",
        severityText: "Alto Riesgo",
        lat: 9.9324,
        lng: -84.0795,
        address: "Paseo Colón, frente al Hospital Nacional de Niños, San José",
        date: "27 Mayo 2026",
        time: "07:30 AM",
        description: "Choque en cadena de 3 vehículos livianos. Genera alta congestión vial en sentido oeste-este. Tránsito trabajando en la escena."
    },
    {
        id: "2026-0843",
        title: "Atropello Crítico Sabana Norte",
        type: "victimas",
        severity: "critical",
        severityText: "Crítico",
        lat: 9.9358,
        lng: -84.0982,
        address: "Sabana Norte, 200m oeste del ICE, San José",
        date: "27 Mayo 2026",
        time: "08:15 AM",
        description: "Motociclista colisiona a peatón cruzando vía principal. Peatón trasladado en condición delicada al Hospital San Juan de Dios."
    },
    {
        id: "2026-0844",
        title: "Obstrucción por Caída de Rama",
        type: "materiales",
        severity: "low",
        severityText: "Bajo Riesgo",
        lat: 9.9247,
        lng: -84.0841,
        address: "Barrio Don Bosco, calle 28 entre avenidas 8 y 10, San José",
        date: "27 Mayo 2026",
        time: "06:45 AM",
        description: "Caída de rama grande sobre la calzada bloqueando el carril derecho. Municipalidad notificada para su remoción."
    },
    {
        id: "2026-0845",
        title: "Colisión por Alcance Avenida 2",
        type: "materiales",
        severity: "medium",
        severityText: "Riesgo Medio",
        lat: 9.9312,
        lng: -84.0715,
        address: "Avenida Segunda, frente al Teatro Nacional, San José",
        date: "27 Mayo 2026",
        time: "08:00 AM",
        description: "Choque menor por alcance entre autobús urbano y vehículo particular. Únicamente daños materiales, flujo vehicular parcialmente afectado."
    }
]);

// Carga dinámica de Leaflet
const loadLeafletResources = () => {
    return new Promise((resolve, reject) => {
        if (window.L) {
            resolve();
            return;
        }

        const existingScript = document.querySelector('script[src*="leaflet.js"]');
        if (existingScript) {
            existingScript.addEventListener('load', () => resolve());
            existingScript.addEventListener('error', (e) => reject(e));
            return;
        }

        // Cargar CSS
        if (!document.querySelector('link[href*="leaflet.css"]')) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
            document.head.appendChild(link);
        }

        // Cargar JS
        const script = document.createElement('script');
        script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
        script.async = true;
        script.onload = () => resolve();
        script.onerror = (e) => reject(e);
        document.head.appendChild(script);
    });
};

// Generar marcador HTML personalizado y animado
const createCustomMarker = (severity) => {
    return window.L.divIcon({
        className: 'custom-map-marker',
        html: `<div class="marker-pulse bg-${severity}"></div><div class="marker-dot bg-${severity}"></div>`,
        iconSize: [20, 20],
        iconAnchor: [10, 10]
    });
};

// Inicialización del Mapa
const initMap = () => {
    if (!window.L) {
        mapError.value = "Leaflet no se cargó correctamente. Intenta recargar la página.";
        return;
    }

    try {
        const defaultCoords = [9.9281, -84.0907]; // San José Centro

        // Crear mapa y centrar en San José
        map = window.L.map('general-incidents-map').setView(defaultCoords, 14);

        // Capa Oscura (Dark Theme)
        window.L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            subdomains: 'abcd',
            maxZoom: 20
        }).addTo(map);

        // Agregar los incidentes ficticios al mapa
        mockIncidents.value.forEach(incident => {
            const markerIcon = createCustomMarker(incident.severity);
            const marker = window.L.marker([incident.lat, incident.lng], { icon: markerIcon }).addTo(map);

            // Crear popup informativo
            const popupContent = `
                <div class="map-popup-card">
                    <strong class="popup-title">${incident.title}</strong>
                    <div class="popup-meta">Caso: #${incident.id}</div>
                    <div class="popup-address">${incident.address}</div>
                    <div class="popup-time"><i class="ph ph-clock"></i> ${incident.time}</div>
                </div>
            `;

            marker.bindPopup(popupContent, {
                closeButton: true,
                offset: [0, -5]
            });

            // Al hacer clic, actualizar panel de detalles del incidente
            marker.on('click', () => {
                selectedIncident.value = incident;
            });
        });

        // Forzar actualización del layout
        setTimeout(() => {
            if (map) {
                map.invalidateSize();
            }
            isLoadingMap.value = false;
        }, 150);

    } catch (err) {
        console.error("Error al inicializar el mapa general:", err);
        mapError.value = "Error al inicializar el mapa. Verifica los recursos.";
        isLoadingMap.value = false;
    }
};

// Buscar ubicaciones
const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.value && map) {
        isLoadingMap.value = true;
        axios.get(`https://nominatim.openstreetmap.org/search`, {
            params: {
                q: searchQuery.value,
                format: 'json',
                addressdetails: 1,
                limit: 1
            }
        })
        .then(response => {
            if (response.data && response.data.length > 0) {
                const result = response.data[0];
                const lat = parseFloat(result.lat);
                const lon = parseFloat(result.lon);
                
                // Mover mapa e invalidar tamaño para asegurar pintado
                map.setView([lat, lon], 15);
                map.invalidateSize();
                console.log(`Búsqueda enfocada en: Lat ${lat}, Lng ${lon}`);
            } else {
                alert("No se encontró la dirección. Intenta con otros términos.");
            }
        })
        .catch(err => {
            console.error("Error al buscar dirección:", err);
            alert("Error al conectar con el servicio de búsqueda.");
        })
        .finally(() => {
            isLoadingMap.value = false;
        });
    }
};

// Navegar a expedientes o rutas
const goDetailedCase = (caseId) => {
    alert(`Redirigiendo a expediente del caso: ${caseId} (Funcionalidad backend próximamente)`);
};

// Ciclo de vida
onMounted(async () => {
    try {
        await loadLeafletResources();
        setTimeout(() => {
            initMap();
        }, 100);
    } catch (err) {
        console.error("No se pudo cargar Leaflet desde CDN:", err);
        mapError.value = "Error al descargar recursos del mapa. Revisa tu conexión.";
        isLoadingMap.value = false;
    }
});

onUnmounted(() => {
    if (map) {
        map.remove();
    }
});

// Navegación
const goTo = (path) => {
    router.push(path);
};

// Cierre de sesión
const handleLogout = async () => {
    try {
        await axios.post('/logout');
        window.location.href = '/login';
    } catch (error) {
        console.error('Error al cerrar sesión:', error);
        window.location.href = '/login';
    }
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
        
        /* Priorizar la paleta de severidad según el dashboard */
        --safe: #22c55e;
        --low: #4ade80;
        --medium: #f59e0b;
        --high: #ef4444;
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

    .dashboard * { margin: 0; padding: 0; box-sizing: border-box; }

    /* --- BARRA LATERAL --- */
    .sidebar { width: 260px; background-color: var(--bg-sidebar); border-right: 1px solid var(--border-color); display: flex; flex-direction: column; padding: 20px 0; flex-shrink: 0; }
    .user-profile { display: flex; align-items: center; padding: 0 20px 20px; border-bottom: 1px solid var(--border-color); gap: 12px; }
    .avatar { width: 40px; height: 40px; background-color: var(--primary-blue); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 14px; color: white; }
    .user-info h4 { font-size: 14px; font-weight: 600; }
    .user-info span { font-size: 10px; color: var(--text-muted); }
    .menu-icon { margin-left: auto; cursor: pointer; color: var(--text-muted); font-size: 20px;}

    .nav-section { margin-top: 25px; }
    .nav-title { font-size: 11px; color: var(--text-muted); padding: 0 20px; margin-bottom: 10px; letter-spacing: 1px; }
    .nav-list { list-style: none; }
    .nav-item { padding: 12px 20px; display: flex; align-items: center; gap: 12px; color: var(--text-muted); font-size: 14px; cursor: pointer; transition: 0.2s; }
    .nav-item i { font-size: 18px; }
    .nav-item:hover { color: var(--text-main); }
    .nav-item.active { background-color: rgba(37, 99, 235, 0.1); color: var(--text-main); border: 1px solid var(--primary-blue); border-radius: 8px; margin: 0 10px; padding: 12px 10px; }
    .logout { margin-top: auto; padding: 20px; color: var(--high); display: flex; align-items: center; gap: 10px; cursor: pointer; font-size: 14px; }

    /* --- CONTENIDO PRINCIPAL --- */
    .main-content { flex: 1; padding: 30px 40px; display: flex; flex-direction: column; overflow: hidden; }

    /* Encabezado */
    .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; flex-shrink: 0; }
    .header-titles h1 { font-size: 24px; font-weight: 600; margin-bottom: 5px; }
    .header-titles p { color: var(--text-muted); font-size: 14px; }
    .header-actions { display: flex; gap: 15px; align-items: center; }

    .datetime-pill { display: flex; align-items: center; gap: 10px; background-color: var(--bg-card); padding: 10px 15px; border-radius: 8px; border: 1px solid var(--border-color); }
    .datetime-pill i { font-size: 20px; color: var(--text-muted); }
    .dt-text { display: flex; flex-direction: column; font-size: 12px;}
    .dt-text .date { font-weight: 600; }
    .dt-text .time { color: var(--text-muted); font-size: 11px;}

    .notification { background-color: var(--bg-card); width: 45px; height: 45px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 1px solid var(--border-color); position: relative; cursor: pointer; }
    .notification i { font-size: 20px; color: var(--text-muted); }
    .badge { position: absolute; top: -2px; right: -2px; background-color: var(--high); color: white; font-size: 10px; width: 16px; height: 16px; display: flex; align-items: center; justify-content: center; border-radius: 50%; font-weight: bold; }

    /* Layout de Mapa y Panel Lateral */
    .map-layout { flex: 1; display: flex; gap: 25px; overflow: hidden; min-height: 0; }

    /* Tarjeta del Mapa */
    .map-container-card { flex: 1; border: 1px solid var(--border-color); border-radius: 16px; padding: 25px; background-color: var(--bg-card); display: flex; flex-direction: column; gap: 20px; min-height: 0; }
    
    .map-header { display: flex; justify-content: space-between; align-items: center; flex-shrink: 0; }
    .map-title-group { display: flex; align-items: center; gap: 15px; }
    .map-title-group i { font-size: 24px; color: var(--accent-blue); }
    .map-title-text h3 { font-size: 16px; font-weight: 600; }
    .map-title-text p { font-size: 12px; color: var(--text-muted); }

    /* Buscador */
    .search-wrapper { background-color: var(--bg-dark); border: 1px solid var(--border-color); border-radius: 12px; display: flex; align-items: center; padding: 0 15px; height: 42px; width: 320px; transition: 0.3s; }
    .search-wrapper:focus-within { border-color: var(--accent-blue); background-color: rgba(37, 99, 235, 0.03); }
    .search-wrapper i { font-size: 16px; color: var(--text-muted); margin-right: 12px; }
    .search-input { background: transparent; border: none; color: var(--text-main); font-size: 13px; width: 100%; height: 100%; outline: none; }
    .search-input::placeholder { color: var(--text-muted); }

    /* Contenedor Leaflet */
    .leaflet-container-wrapper { flex: 1; width: 100%; border-radius: 12px; overflow: hidden; border: 1px solid var(--border-color); position: relative; min-height: 0; }
    #general-incidents-map { width: 100%; height: 100%; z-index: 1; }

    /* Overlays de carga y error */
    .map-loading-overlay, .map-error-overlay {
        position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-color: var(--bg-card); display: flex;
        flex-direction: column; align-items: center; justify-content: center; gap: 15px; z-index: 10;
    }
    .map-error-overlay i { font-size: 40px; color: var(--high); }
    .map-error-overlay p { color: var(--text-muted); font-size: 14px; }
    
    .spinner {
        width: 40px; height: 40px; border: 4px solid rgba(255, 255, 255, 0.1); border-top-color: var(--accent-blue);
        border-radius: 50%; animation: spin 1s linear infinite;
    }
    @keyframes spin { to { transform: rotate(360deg); } }

    /* Leyenda */
    .map-legend { display: flex; align-items: center; gap: 15px; font-size: 12px; border-top: 1px solid var(--border-color); padding-top: 15px; flex-shrink: 0; }
    .legend-title { color: var(--text-muted); font-weight: 500; }
    .legend-items { display: flex; gap: 20px; }
    .legend-item { display: flex; align-items: center; gap: 8px; }
    .legend-dot { width: 10px; height: 10px; border-radius: 50%; }
    .bg-low { background-color: var(--low); }
    .bg-medium { background-color: var(--medium); }
    .bg-high { background-color: var(--high); }
    .bg-critical { background-color: var(--critical); }

    /* --- PANEL LATERAL DE DETALLES --- */
    .incident-detail-panel { width: 340px; border: 1px solid var(--border-color); border-radius: 16px; background-color: var(--bg-card); display: flex; flex-direction: column; padding: 25px; transition: transform 0.3s ease, opacity 0.3s ease; flex-shrink: 0; }
    
    .panel-empty-state { display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; text-align: center; color: var(--text-muted); gap: 15px; }
    .panel-empty-state i { font-size: 32px; color: var(--border-color); }
    .panel-empty-state p { font-size: 13px; line-height: 1.5; }

    .panel-content-wrapper { display: flex; flex-direction: column; height: 100%; animation: slideIn 0.3s ease-out; }
    
    .panel-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; }
    .incident-id { font-size: 12px; font-weight: 600; color: var(--accent-blue); letter-spacing: 0.5px; }
    .close-panel-btn { background: none; border: none; color: var(--text-muted); cursor: pointer; font-size: 18px; transition: 0.2s; }
    .close-panel-btn:hover { color: var(--text-main); }

    .severity-badge-container { margin-bottom: 15px; }
    .badge-severity { display: inline-block; padding: 6px 12px; border-radius: 20px; font-size: 11px; font-weight: 600; text-transform: uppercase; border: 1px solid transparent; }
    .sev-low { background-color: rgba(74, 222, 128, 0.1); color: var(--low); border-color: rgba(74, 222, 128, 0.2); }
    .sev-medium { background-color: rgba(245, 158, 11, 0.1); color: var(--medium); border-color: rgba(245, 158, 11, 0.2); }
    .sev-high { background-color: rgba(239, 68, 68, 0.1); color: var(--high); border-color: rgba(239, 68, 68, 0.2); }
    .sev-critical { background-color: rgba(220, 38, 38, 0.1); color: var(--critical); border-color: rgba(220, 38, 38, 0.2); }

    .incident-title { font-size: 18px; font-weight: 600; margin-bottom: 20px; line-height: 1.3; }

    .incident-meta-info { display: flex; flex-direction: column; gap: 12px; margin-bottom: 20px; }
    .meta-row { display: flex; align-items: flex-start; gap: 12px; font-size: 13px; color: var(--text-muted); }
    .meta-row i { font-size: 18px; color: var(--text-main); margin-top: 2px; }
    .meta-row span { line-height: 1.4; }

    .panel-divider { height: 1px; background-color: var(--border-color); margin: 20px 0; }

    .incident-description-section h4 { font-size: 13px; font-weight: 600; color: var(--text-muted); margin-bottom: 10px; text-transform: uppercase; letter-spacing: 0.5px; }
    .incident-description-section p { font-size: 13px; color: var(--text-main); line-height: 1.6; }

    .incident-actions { margin-top: auto; }
    .btn { padding: 12px 20px; border-radius: 8px; font-size: 13px; font-weight: 600; cursor: pointer; transition: 0.2s; text-align: center; }
    .btn-primary { background-color: var(--primary-blue); border: 1px solid var(--primary-blue); color: white; }
    .btn-primary:hover { background-color: var(--accent-blue); border-color: var(--accent-blue); }
    .btn-block { width: 100%; display: block; }

    @keyframes slideIn {
        from { opacity: 0; transform: translateX(15px); }
        to { opacity: 1; transform: translateX(0); }
    }

    /* --- ESTILOS DE LEAFLET INYECTADOS CON :DEEP --- */
    :deep(.leaflet-bar a) { background-color: var(--bg-card) !important; color: var(--text-main) !important; border-color: var(--border-color) !important; }
    :deep(.leaflet-bar a:hover) { background-color: var(--border-color) !important; }
    
    /* Popup oscuro premium */
    :deep(.leaflet-popup-content-wrapper) {
        background-color: var(--bg-card) !important;
        color: var(--text-main) !important;
        border: 1px solid var(--border-color) !important;
        border-radius: 12px !important;
        padding: 8px !important;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4) !important;
    }
    :deep(.leaflet-popup-tip) { background-color: var(--bg-card) !important; border: 1px solid var(--border-color) !important; }
    :deep(.leaflet-popup-close-button) { color: var(--text-muted) !important; font-size: 16px !important; padding: 8px 8px 0 0 !important; }

    /* Estructura del popup */
    :deep(.map-popup-card) { display: flex; flex-direction: column; gap: 5px; font-family: 'Segoe UI', sans-serif; padding-right: 15px; }
    :deep(.popup-title) { font-size: 13px; font-weight: 600; color: var(--text-main); }
    :deep(.popup-meta) { font-size: 10px; color: var(--accent-blue); font-weight: 600; }
    :deep(.popup-address) { font-size: 11px; color: var(--text-muted); line-height: 1.3; }
    :deep(.popup-time) { font-size: 11px; color: var(--low); font-weight: 500; display: flex; align-items: center; gap: 4px; }

    /* Marcador Animado */
    :deep(.custom-map-marker) { display: flex; align-items: center; justify-content: center; position: relative; width: 20px; height: 20px; }
    :deep(.marker-dot) { width: 10px; height: 10px; border-radius: 50%; border: 2px solid #ffffff; z-index: 2; box-shadow: 0 0 4px rgba(0, 0, 0, 0.5); }
    :deep(.marker-pulse) { position: absolute; width: 24px; height: 24px; border-radius: 50%; animation: markerPulse 1.8s infinite ease-out; opacity: 0; z-index: 1; }

    /* Marcadores colores */
    :deep(.bg-low) { background-color: var(--low); }
    :deep(.bg-medium) { background-color: var(--medium); }
    :deep(.bg-high) { background-color: var(--high); }
    :deep(.bg-critical) { background-color: var(--critical); }

    @keyframes markerPulse {
        0% { transform: scale(0.6); opacity: 0.8; }
        100% { transform: scale(2.4); opacity: 0; }
    }

    /* Responsividad */
    @media (max-width: 1024px) {
        .map-layout { flex-direction: column; }
        .incident-detail-panel { width: 100%; height: auto; max-height: 250px; }
        .search-wrapper { width: 200px; }
    }
</style>
=======
import Sidebar from './Sidebar.vue';
import TopHeader from './TopHeader.vue';
</script>
>>>>>>> origin/main
