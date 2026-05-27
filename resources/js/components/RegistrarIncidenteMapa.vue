<template>
    <div class="dashboard">
        
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
                    <li class="nav-item active"><i class="ph ph-plus-square"></i> Registrar incidente</li>
                    <li class="nav-item"><i class="ph ph-magnifying-glass"></i> Buscar casos</li>
                    <li class="nav-item"><i class="ph ph-map-pin"></i> Ver mapa</li>
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

        <main class="main-content">
            
            <header class="header">
                <div class="header-titles">
                    <h1>Registro de Incidente</h1>
                    <p>Gestión rápida de incidentes y monitoreo vial</p>
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

            <div class="map-view">
                
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

                <div class="map-card">
                    
                    <div class="map-header">
                        <div class="map-title-group">
                            <i class="ph ph-map-pin"></i>
                            <div class="map-title-text">
                                <h3>Selecciona en el mapa</h3>
                                <p>Elige la ubicación exacta del incidente</p>
                            </div>
                        </div>

                        <div class="search-wrapper">
                            <i class="ph ph-magnifying-glass"></i>
                            <input type="text" class="search-input" placeholder="Buscar dirección o lugar" v-model="searchQuery" @keypress.enter="handleSearch">
                        </div>
                    </div>

                    <div class="leaflet-container-wrapper">
                        <div id="incident-map"></div>
                    </div>

                </div>

                <div class="bottom-action-bar">
                    <button class="btn btn-outline" type="button" @click="handleBack">Atrás</button>
                    <button class="btn btn-primary" type="button" @click="handleNext">Continuar</button>
                </div>

            </div>
        </main>
    </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();

// Variables de estado
const searchQuery = ref('');
let map = null;
let currentMarker = null;

onMounted(() => {
    // Verificar si Leaflet cargó correctamente globalmente a través de window
    if (window.L) {
        // 1. Inicializar el mapa
        const initialCoords = [9.9281, -84.0907];
        map = window.L.map('incident-map').setView(initialCoords, 14);

        // 2. Cargar Capa Oscura (Dark Theme para coincidir con la UI)
        window.L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            subdomains: 'abcd',
            maxZoom: 20
        }).addTo(map);

        // 3. Funcionalidad de Marcador
        map.on('click', function(e) {
            const lat = e.latlng.lat;
            const lng = e.latlng.lng;

            if (currentMarker) {
                map.removeLayer(currentMarker);
            }

            currentMarker = window.L.marker([lat, lng]).addTo(map);
            console.log(`Ubicación seleccionada: Lat ${lat}, Lng ${lng}`);
        });
    } else {
        console.error("Leaflet.js no está cargado. Asegúrate de tener los CDN en welcome.blade.php");
    }
});

onUnmounted(() => {
    // Limpiar instancia del mapa cuando el componente sea destruido para evitar fugas de memoria
    if (map) {
        map.remove();
    }
});

// 4. Lógica Básica del Buscador
const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.value) {
        alert(`Buscando: ${searchQuery.value}. \n(Requiere integrar servicio de Geocoding para resultados reales)`);
    }
};

// Navegación
const handleBack = () => {
    // Volver al formulario de la calle/distrito
    router.push({ name: 'registrar-incidente-ubicacion' });
};

const handleNext = () => {
    if(currentMarker) {
        console.log("Coordenadas guardadas. Avanzando al siguiente paso...");
        // Cuando la vista del paso 3 esté lista, se activará esta redirección:
        // router.push({ name: 'registrar-incidente-paso-3' });
    } else {
        alert("Por favor, selecciona una ubicación en el mapa haciendo clic.");
    }
};

const goTo = (path) => {
    router.push(path);
};

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
    .logout { margin-top: auto; padding: 20px; color: var(--critical); display: flex; align-items: center; gap: 10px; cursor: pointer; font-size: 14px; }

    /* --- CONTENIDO PRINCIPAL --- */
    .main-content { flex: 1; padding: 30px 40px; display: flex; flex-direction: column; overflow-y: auto; }

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
    .badge { position: absolute; top: -2px; right: -2px; background-color: var(--critical); color: white; font-size: 10px; width: 16px; height: 16px; display: flex; align-items: center; justify-content: center; border-radius: 50%; font-weight: bold; }

    /* --- VISTA DEL MAPA --- */
    .map-view { flex: 1; display: flex; flex-direction: column; max-width: 1000px; margin: 0 auto; width: 100%; }

    /* Stepper - Paso 2 */
    .stepper-container { position: relative; margin: 30px 0 50px 0; display: flex; justify-content: space-between; align-items: center; width: 100%; padding: 0 10px; }
    .stepper-background-line { position: absolute; top: 50%; left: 0; width: 100%; height: 6px; background-color: #ffffff; transform: translateY(-50%); border-radius: 3px; z-index: 1; }
    .stepper-active-line { position: absolute; top: 50%; left: 0; width: 38%; height: 6px; background-color: var(--accent-blue); transform: translateY(-50%); border-radius: 3px; z-index: 2; transition: width 0.4s ease; }
    
    .step-dot { width: 24px; height: 24px; border-radius: 50%; background-color: #ffffff; z-index: 3; position: relative; transition: 0.4s ease; }
    .step-dot.active { background-color: var(--accent-blue); box-shadow: 0 0 12px var(--accent-blue); }
    .car-icon-floating { position: absolute; top: -45px; left: 50%; transform: translateX(-50%); width: 45px; height: 45px; background-color: rgba(255, 255, 255, 0.08); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 20px; color: var(--text-muted); }

    /* Contenedor Principal del Mapa */
    .map-card { border: 1px solid var(--accent-blue); border-radius: 16px; padding: 30px; background-color: transparent; margin-bottom: 30px; display: flex; flex-direction: column; gap: 20px;}
    
    .map-header { display: flex; justify-content: space-between; align-items: center; }
    .map-title-group { display: flex; align-items: center; gap: 15px; }
    .map-title-group i { font-size: 24px; color: var(--text-main); }
    .map-title-text h3 { font-size: 16px; font-weight: 500; }
    .map-title-text p { font-size: 12px; color: var(--text-muted); }

    /* Buscador integrado */
    .search-wrapper { background-color: transparent; border: 1px solid var(--border-color); border-radius: 12px; display: flex; align-items: center; padding: 0 20px; height: 45px; width: 350px; transition: 0.3s; }
    .search-wrapper:focus-within { border-color: var(--accent-blue); background-color: rgba(37, 99, 235, 0.05); }
    .search-wrapper i { font-size: 18px; color: var(--text-muted); margin-right: 15px; }
    .search-input { background: transparent; border: none; color: var(--text-main); font-size: 13px; width: 100%; height: 100%; outline: none; }
    .search-input::placeholder { color: var(--text-muted); }

    /* Contenedor Leaflet */
    .leaflet-container-wrapper { width: 100%; height: 450px; border-radius: 12px; overflow: hidden; border: 1px solid var(--border-color); position: relative; }
    #incident-map { width: 100%; height: 100%; z-index: 1; }
    
    /* Ajustes oscuros para controles Leaflet asegurados con :deep para saltar el scope */
    :deep(.leaflet-bar a) { background-color: var(--bg-card) !important; color: var(--text-main) !important; border-color: var(--border-color) !important; }
    :deep(.leaflet-bar a:hover) { background-color: var(--border-color) !important; }

    /* Barra de Acciones Inferior */
    .bottom-action-bar { margin-top: auto; display: flex; justify-content: space-between; align-items: center; padding-bottom: 20px; }
    .btn { padding: 14px 40px; border-radius: 10px; font-size: 14px; font-weight: 500; cursor: pointer; transition: 0.2s; }
    .btn-outline { background-color: transparent; border: 1px solid var(--border-color); color: var(--text-main); }
    .btn-outline:hover { background-color: rgba(255, 255, 255, 0.05); }
    .btn-primary { background-color: var(--primary-blue); border: 1px solid var(--primary-blue); color: white; }
    .btn-primary:hover { background-color: var(--accent-blue); }

    /* Responsividad */
    @media (max-width: 900px) {
        .map-header { flex-direction: column; align-items: flex-start; gap: 20px; }
        .search-wrapper { width: 100%; }
        .stepper-container { display: none; }
    }
</style>
