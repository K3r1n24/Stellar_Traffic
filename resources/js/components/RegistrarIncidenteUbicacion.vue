<template>
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
</style>
