<template>
<<<<<<< HEAD
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
import { reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();

// Estado reactivo para los datos del formulario de ubicación
const formData = reactive({
    direccion: '',
    distrito: ''
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
    console.log("Formulario válido. Avanzando al Paso 3...", formData);
    router.push({ name: 'registrar-incidente-declaracion' });
};

// Volver al paso anterior
const handleBack = () => {
    router.push({ name: 'registrar-incidente-detalle' });
};

// Navegación genérica del menú lateral
const goTo = (path) => {
    router.push(path);
};

// Función de logout
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

    .dashboard * {
        box-sizing: border-box;
    }

    /* --- BARRA LATERAL --- */
    .sidebar { width: 260px; background-color: var(--bg-sidebar); border-right: 1px solid var(--border-color); display: flex; flex-direction: column; padding: 20px 0; flex-shrink: 0; }
    .user-profile { display: flex; align-items: center; padding: 0 20px 20px; border-bottom: 1px solid var(--border-color); gap: 12px; }
    .avatar { width: 40px; height: 40px; background-color: var(--primary-blue); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 14px; color: white;}
    .user-info h4 { font-size: 14px; font-weight: 600; margin: 0; }
    .user-info span { font-size: 10px; color: var(--text-muted); }
    .menu-icon { margin-left: auto; cursor: pointer; color: var(--text-muted); font-size: 20px;}

    .nav-section { margin-top: 25px; }
    .nav-title { font-size: 11px; color: var(--text-muted); padding: 0 20px; margin-bottom: 10px; letter-spacing: 1px; }
    .nav-list { list-style: none; margin: 0; padding: 0;}
    .nav-item { padding: 12px 20px; display: flex; align-items: center; gap: 12px; color: var(--text-muted); font-size: 14px; cursor: pointer; transition: 0.2s; }
    .nav-item i { font-size: 18px; }
    .nav-item:hover { color: var(--text-main); }
    .nav-item.active { background-color: rgba(37, 99, 235, 0.1); color: var(--text-main); border: 1px solid var(--primary-blue); border-radius: 8px; margin: 0 10px; padding: 12px 10px; }
    .logout { margin-top: auto; padding: 20px; color: var(--critical); display: flex; align-items: center; gap: 10px; cursor: pointer; font-size: 14px; }

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
=======
  <div class="location-page">
    <!-- Top label outside the main block if needed, but the image shows it at the very top left -->
    <div class="top-label">Registro de accidente paso 3</div>

    <div class="main-card">
      <div class="bg-patterns">
        <!-- Abstract patterns could go here (CSS lines/dots) -->
        <div class="dots-pattern"></div>
        <div class="waves-pattern"></div>
      </div>

      <div class="card-content">
        <div class="breadcrumb">
          <span class="breadcrumb-icon">
             <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
          </span>
          <span class="bc-text">Dashboard</span> <span class="bc-separator">/</span> 
          <span class="bc-text">Registro</span> <span class="bc-separator">/</span> 
          <span class="bc-text bc-active">Ubicacion</span>
        </div>

        <h1 class="page-title">Ubicacion del incidente</h1>

        <div class="content-grid">
          <div class="form-section">
            
            <div class="form-group">
              <label class="input-label">
                <span class="label-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                </span>
                Direccion
              </label>
              <input type="text" class="custom-input" v-model="state.direccion" placeholder="1 av norte calle grimal, usulutan usulutan" />
              <span class="helper-text">Ingrese la direccion exacta</span>
            </div>

            <div class="form-group">
              <label class="input-label">
                <span class="label-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"/></svg>
                </span>
                Municipio
              </label>
              <div class="input-with-icon">
                <input type="text" class="custom-input" v-model="state.municipio" placeholder="Selecciona la provincia" />
                <span class="input-append-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                </span>
              </div>
            </div>

            <!-- Glassmorphism Map Selector -->
            <div class="map-selector" @click="openMap">
              <div class="map-selector-content">
                <div class="map-icon-wrapper">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"></polygon>
                    <line x1="9" y1="3" x2="9" y2="18"></line>
                    <line x1="15" y1="6" x2="15" y2="21"></line>
                    <circle cx="15" cy="8" r="3" fill="#ffffff" stroke="none"></circle>
                    <path d="M15 11c0 0-3-3-3-3s3-3 3-3 3 3 3 3-3 3-3 3z" fill="#ffffff" stroke="none"></path>
                  </svg>
                </div>
                <h3>Seleccionar en mapa</h3>
                <p>Haga click aqui para abrir el mapa</p>
              </div>
            </div>

          </div>

          <!-- Graphic Section (Glowing Map Pin) -->
          <div class="graphic-section">
            <div class="pin-container">
              <div class="pin-glow"></div>
              <svg class="pin-svg" viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="pinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#4e6cff" />
                    <stop offset="100%" stop-color="#7a14ff" />
                  </linearGradient>
                  <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="8" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                  <box-shadow id="innerShadow" x="0" y="0" blur="10" color="rgba(0,0,0,0.5)" inset="true" />
                </defs>
                <path class="pin-path" d="M50 5 C25 5 5 25 5 50 C5 80 50 115 50 115 C50 115 95 80 95 50 C95 25 75 5 50 5 Z M50 65 C41.7 65 35 58.3 35 50 C35 41.7 41.7 35 50 35 C58.3 35 65 41.7 65 50 C65 58.3 58.3 65 50 65 Z" fill="url(#pinGrad)" filter="url(#glow)"/>
                <circle cx="50" cy="50" r="15" fill="#080c1e" />
              </svg>
              <!-- Ripple effects behind the pin -->
              <div class="ripple ripple-1"></div>
              <div class="ripple ripple-2"></div>
              <div class="ripple ripple-3"></div>
            </div>
          </div>
        </div>

        <div class="form-actions">
          <button class="btn btn-back" @click="goBack">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
            Volver atras
          </button>
          <button class="btn btn-next" @click="goNext">
            Siguiente
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </button>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'
import { useIncidenteStore } from '../composables/useIncidenteStore'
import axios from 'axios'

const router = useRouter()
const route = useRoute()
const { state } = useIncidenteStore()

function goBack() {
  const tipo = route.params.tipo || 'victimas';
  router.push({ name: 'registro.incidente.detalle', params: { tipo } })
}

async function goNext() {
  try {
    const response = await axios.post('/accidentes', state);
    if (response.data) {
      alert('Incidente registrado con éxito');
      router.push({ name: 'dashboard' });
    }
  } catch (error) {
    console.error(error);
    alert('Error al registrar el incidente: Verifica los datos requeridos');
  }
}

function openMap() {
  console.log("Abrir modal de mapa")
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap');

.location-page {
  min-height: 100vh;
  background-color: #555b6e; /* Un color de fondo para resaltar la tarjeta si fuera pequeña, pero haremos que ocupe todo */
  display: flex;
  flex-direction: column;
  font-family: 'Inter', sans-serif;
}

.top-label {
  padding: 10px 20px;
  color: #8f9bb3;
  font-size: 14px;
  background-color: #1a1e36; /* Background of the very outer space if any */
}

.main-card {
  flex-grow: 1;
  background: radial-gradient(circle at 70% 50%, #0c1438 0%, #050817 100%);
  position: relative;
  overflow: hidden;
  color: #ffffff;
  display: flex;
  flex-direction: column;
}

.bg-patterns {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 0;
}

.dots-pattern {
  position: absolute;
  top: 0;
  right: 0;
  width: 400px;
  height: 300px;
  background-image: radial-gradient(rgba(255, 255, 255, 0.1) 2px, transparent 2px);
  background-size: 24px 24px;
  mask-image: linear-gradient(to bottom left, rgba(0,0,0,1), transparent);
  -webkit-mask-image: linear-gradient(to bottom left, rgba(0,0,0,1), transparent);
}

.card-content {
  position: relative;
  z-index: 1;
  padding: 40px 80px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.breadcrumb {
  display: flex;
  align-items: center;
  font-size: 15px;
  color: #8c9bba;
  margin-bottom: 24px;
}

.breadcrumb-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  background-color: #151b3b;
  border-radius: 50%;
  margin-right: 12px;
  color: #3b4c8a;
}

.bc-text {
  margin: 0 8px;
}

.bc-text.bc-active {
  color: #ffffff;
}

.bc-separator {
  color: #4a5a8a;
}

.page-title {
  font-size: 54px;
  font-weight: 500;
  margin: 0 0 48px 0;
  letter-spacing: -1px;
}

.content-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  flex-grow: 1;
}

.form-section {
  display: flex;
  flex-direction: column;
  gap: 32px;
  max-width: 600px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.input-label {
  display: flex;
  align-items: center;
  font-size: 16px;
  color: #ffffff;
  margin-bottom: 12px;
}

.label-icon {
  margin-right: 10px;
  display: flex;
  align-items: center;
  color: #3f51b5; /* Blue icon color */
  pointer-events: none;
}

.custom-input {
  background-color: #0d122b;
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 16px 20px;
  color: #ffffff;
  font-size: 16px;
  width: 100%;
  box-sizing: border-box;
  font-family: 'Inter', sans-serif;
  outline: none;
  box-shadow: inset 0 2px 4px rgba(0,0,0,0.2);
}

.custom-input:focus {
  border-color: #4e6cff;
}

.helper-text {
  font-size: 13px;
  color: #5d6b8e;
  margin-top: 8px;
  padding-left: 4px;
}

.input-with-icon {
  position: relative;
  display: flex;
  align-items: center;
}

.input-append-icon {
  position: absolute;
  right: 16px;
  color: #5d6b8e;
  pointer-events: none;
}

/* Map Selector Glassmorphism */
.map-selector {
  margin-top: 20px;
  background: rgba(26, 33, 68, 0.4);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 30px;
  padding: 40px;
  text-align: center;
  cursor: pointer;
  transition: transform 0.2s, background 0.2s;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  width: 120%; /* extends a bit into the right column */
  position: relative;
  z-index: 10;
}

.map-selector:hover {
  transform: translateY(-2px);
  background: rgba(35, 43, 85, 0.5);
}

.map-icon-wrapper {
  margin-bottom: 16px;
  display: inline-flex;
}

.map-selector h3 {
  margin: 0 0 8px 0;
  font-size: 22px;
  font-weight: 500;
  color: #ffffff;
}

.map-selector p {
  margin: 0;
  font-size: 16px;
  color: #8c9bba;
}

/* Graphic Section */
.graphic-section {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.pin-container {
  position: relative;
  width: 300px;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.pin-svg {
  width: 150px;
  height: 180px;
  z-index: 10;
  position: relative;
  filter: drop-shadow(0 20px 30px rgba(60, 0, 255, 0.6));
}

.ripple {
  position: absolute;
  border-radius: 50%;
  border: 1px solid rgba(78, 108, 255, 0.2);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: rippleAnim 4s linear infinite;
  pointer-events: none;
}

.ripple-1 { width: 200px; height: 200px; animation-delay: 0s; }
.ripple-2 { width: 350px; height: 350px; animation-delay: 1.33s; }
.ripple-3 { width: 500px; height: 500px; animation-delay: 2.66s; }

@keyframes rippleAnim {
  0% { transform: translate(-50%, -50%) scale(0.8); opacity: 1; }
  100% { transform: translate(-50%, -50%) scale(2); opacity: 0; }
}

/* Footer Actions */
.form-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 40px;
  padding-top: 20px;
}

.btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 28px;
  border-radius: 24px;
  font-size: 15px;
  font-weight: 500;
  border: none;
  cursor: pointer;
  color: #ffffff;
  transition: opacity 0.2s, transform 0.1s;
}

.btn:active {
  transform: scale(0.98);
}

.btn-back {
  background-color: #6a748f; /* Grayish background */
}

.btn-next {
  background: linear-gradient(90deg, #420db5, #1f067d);
  box-shadow: 0 4px 15px rgba(66, 13, 181, 0.3);
}

@media (max-width: 1024px) {
  .content-grid {
    grid-template-columns: 1fr;
  }
  .map-selector {
    width: 100%;
  }
  .card-content {
    padding: 30px 40px;
  }
  .graphic-section {
    display: none; /* Hide graphic on smaller screens */
  }
  .page-title {
    font-size: 40px;
  }
}

@media (max-width: 768px) {
  .card-content {
    padding: 20px;
  }
  .page-title {
    font-size: 32px;
  }
}
>>>>>>> main
</style>
