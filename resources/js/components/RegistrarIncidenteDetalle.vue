<template>
  <div class="incident-form-page">
    <div class="form-container">
      <h1 class="title">Registrar Incidente</h1>
      
      <div class="progress-bar-container">
        <div class="progress-bar">
          <div class="node start-node"></div>
          <div class="line active-line"></div>
          <div class="node middle-node"></div>
          <div class="line inactive-line"></div>
          <div class="node end-node"></div>
        </div>
      </div>

      <div class="form-content">
        <div class="form-group">
          <label class="label">Fecha del incidente</label>
          <div class="input-container transparent">
            <span class="input-icon material-icons" aria-hidden="true">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
            </span>
            <input type="date" class="form-input" v-model="state.fecha_incidente" />
            <span class="chevron">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </span>
          </div>
        </div>

        <div class="form-group">
          <label class="label">Hora aproximada</label>
          <div class="input-container">
            <span class="input-icon material-icons" aria-hidden="true">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
            </span>
            <input type="time" class="form-input" v-model="state.hora_aproximada" />
            <span class="chevron">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </span>
          </div>
          <span class="helper-text">Formato 24 horas</span>
        </div>

        <div class="form-group">
          <label class="label">ID de caso</label>
          <div class="input-container">
            <input type="text" class="form-input" v-model="state.id_caso" readonly style="padding-left: 8px;" />
          </div>
          <span class="helper-text">Generado automaticamente</span>
        </div>

        <div class="form-group">
          <label class="label">Gravedad</label>
          <div class="input-container">
            <select class="form-input" v-model="state.gravedad" style="padding-left: 8px; appearance: none; background: transparent; color: #ffffff; border: none; outline: none;">
              <option value="" disabled style="color: #000;">Seleccionar</option>
              <option value="leve" style="color: #000;">Leve</option>
              <option value="moderada" style="color: #000;">Moderada</option>
              <option value="grave" style="color: #000;">Grave</option>
            </select>
            <span class="chevron">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </span>
          </div>
        </div>
      </div>

      <div class="form-actions">
        <button class="btn btn-back" @click="goBack">Atras</button>
        <button class="btn btn-next" @click="goNext">Siguiente</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'
import { useIncidenteStore } from '../composables/useIncidenteStore'

const router = useRouter()
const route = useRoute()
const { state } = useIncidenteStore()

function goBack() {
  router.push({ name: 'registro.incidente' })
}

function goNext() {
  const tipo = route.params.tipo || 'victimas'
  router.push({ name: 'registro.incidente.ubicacion', params: { tipo } })
}
</script>

<style scoped>
:global(body) {
  margin: 0;
  font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

.incident-form-page {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #1a2a5a; /* Outer background color matching image */
  padding: 20px;
}

.form-container {
  background-color: #060a1e; /* Deep dark blue */
  width: 100%;
  max-width: 680px;
  border-radius: 48px;
  padding: 48px 64px;
  color: #ffffff;
  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.4);
}

.title {
  text-align: center;
  font-size: 32px;
  font-weight: 400;
  margin-bottom: 32px;
  margin-top: 0;
  letter-spacing: 0.5px;
}

.progress-bar-container {
  display: flex;
  justify-content: center;
  margin-bottom: 56px;
}

.progress-bar {
  display: flex;
  align-items: center;
  width: 220px;
  margin: 0 auto;
}

.node {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  flex-shrink: 0;
}

.start-node {
  background-color: #b700ff;
  box-shadow: 0 0 12px rgba(183, 0, 255, 0.4);
}

.middle-node {
  background-color: #2b1c78; /* Dark purple/blue node */
}

.end-node {
  background-color: transparent;
  border: 1.5px solid #d0d0d0;
  box-sizing: border-box;
}

.line {
  flex-grow: 1;
}

.active-line {
  height: 6px;
  background: linear-gradient(90deg, #b700ff, #2b1c78);
  margin: 0 -2px; /* Overlap nodes slightly */
  z-index: 0;
}

.inactive-line {
  background-color: #d0d0d0;
  height: 1.5px;
  margin: 0 -2px;
  z-index: 0;
}

.node {
  z-index: 1;
}

.form-content {
  display: flex;
  flex-direction: column;
  gap: 28px;
  padding: 0 40px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.label {
  display: block;
  font-size: 14px;
  color: #7d88aa;
  margin-bottom: 12px;
}

.input-container {
  display: flex;
  align-items: center;
  background-color: #202746; /* Filled input background */
  border-radius: 16px;
  padding: 16px 20px;
}

.input-container.transparent {
  background-color: transparent;
  padding: 8px 20px 8px 0;
}

.input-icon {
  margin-right: 16px;
  color: #637096;
  display: flex;
  align-items: center;
  pointer-events: none;
}

.form-input {
  flex-grow: 1;
  background: transparent;
  border: none;
  font-size: 18px;
  outline: none;
  font-family: inherit;
  color: #ffffff;
  color-scheme: dark;
  position: relative;
  cursor: pointer;
}

.form-input:read-only {
  cursor: default;
}

.form-input[type="date"]::-webkit-calendar-picker-indicator,
.form-input[type="time"]::-webkit-calendar-picker-indicator {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: auto;
  height: auto;
  color: transparent;
  background: transparent;
  opacity: 0;
  cursor: pointer;
}

.placeholder-text {
  color: #637096; /* Darker grey for placeholder text */
}

.chevron {
  margin-left: 16px;
  color: #d0d0d0;
  display: flex;
  align-items: center;
  pointer-events: none;
}

.helper-text {
  font-size: 12px;
  color: #535d81;
  margin-top: 8px;
  display: block;
}

.form-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 56px;
  padding: 0 40px;
}

.btn {
  padding: 16px 40px;
  border-radius: 24px;
  border: none;
  font-size: 16px;
  font-weight: 400;
  cursor: pointer;
  color: #ffffff;
  min-width: 140px;
  font-family: inherit;
  transition: opacity 0.2s;
}

.btn:hover {
  opacity: 0.9;
}

.btn-back {
  background-color: #1e2444; /* Dark button background */
}

.btn-next {
  background: linear-gradient(90deg, #5b10d4, #a00be5); /* Purple gradient button */
  box-shadow: 0 4px 15px rgba(160, 11, 229, 0.2);
}

@media (max-width: 768px) {
  .form-container {
    padding: 32px 24px;
  }
  .form-content {
    padding: 0;
  }
  .form-actions {
    padding: 0;
  }
}
</style>
