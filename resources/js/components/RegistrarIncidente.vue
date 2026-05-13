<template>
  <div class="accident-page">
    <aside class="sidebar" aria-label="Navegación principal">
      <div class="brand">
        <div class="brand__logo" aria-hidden="true">
          <img
            src="https://dummyimage.com/64x64/1f2d5a/ffffff.png&text=S"
            alt=""
          />
        </div>
        <span class="brand__name">Stellar Traffic</span>
      </div>

      <nav class="side-nav">
        <button class="side-nav__item" type="button">
          <span class="side-nav__icon" aria-hidden="true">🗺️</span>
          <span>Mapa</span>
        </button>
        <button class="side-nav__item" type="button">
          <span class="side-nav__icon" aria-hidden="true">📄</span>
          <span>Reportes</span>
        </button>
        <button class="side-nav__item" type="button">
          <span class="side-nav__icon" aria-hidden="true">ℹ️</span>
          <span>Acerca de</span>
        </button>
        <button class="side-nav__item" type="button">
          <span class="side-nav__icon" aria-hidden="true">👤</span>
          <span>Perfil</span>
        </button>
        <button class="side-nav__item" type="button" aria-label="Configuración">
          <span class="side-nav__icon" aria-hidden="true">⚙️</span>
          <span class="sr-only">Configuración</span>
        </button>
      </nav>

      <button class="logout" type="button">
        <span aria-hidden="true">↩</span>
        <span>Cerrar sesión</span>
      </button>
    </aside>

    <main class="content">
      <header class="topbar">
        <div></div>
        <div class="topbar__actions">
          <button class="icon-btn" type="button" aria-label="Notificaciones">
            <span aria-hidden="true">🔔</span>
          </button>
          <button class="icon-btn" type="button" aria-label="Perfil">
            <span aria-hidden="true">👤</span>
          </button>
        </div>
      </header>

      <section class="panel" aria-labelledby="panel-title">
        <div class="panel__header">
          <h1 id="panel-title">Seleccionar tipo de accidente</h1>
          <p>Categoria principal del incidencia</p>
        </div>

        <div class="choices" role="radiogroup" aria-label="Tipo de accidente">
          <button
            v-for="option in options"
            :key="option.id"
            class="choice-card"
            :class="{ 'is-selected': selectedId === option.id }"
            type="button"
            @click="selectedId = option.id"
            :aria-pressed="selectedId === option.id"
          >
            <div class="choice-card__art" :class="option.artClass" aria-hidden="true">
              <span class="choice-card__emoji">{{ option.emoji }}</span>
            </div>

            <div class="choice-card__body">
              <p class="choice-card__title" v-html="option.title"></p>
            </div>

            <div class="choice-card__check" :class="{ 'is-selected': selectedId === option.id }" aria-hidden="true">
              <span v-if="selectedId === option.id">✓</span>
            </div>
          </button>
        </div>

        <footer class="panel__footer">
          <button class="btn btn--secondary" type="button" @click="cancelar">
            Cancelar
          </button>
          <button class="btn btn--primary" type="button" @click="continuar">
            Continuar
          </button>
        </footer>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useIncidenteStore } from '../composables/useIncidenteStore'

const router = useRouter()
const { state, reset } = useIncidenteStore()

const options = [
  {
    id: 'victimas',
    emoji: '👥',
    title: 'Accidente con<br>víctimas, fallecimiento',
    artClass: 'art--victimas'
  },
  {
    id: 'vehiculo',
    emoji: '🚗',
    title: 'Accidente material<br>choque de vehículo',
    artClass: 'art--vehiculo'
  }
]

const selectedId = ref('victimas')

onMounted(() => {
  reset() // Reset the form if they start over
  selectedId.value = state.tipo_accidente
})

function cancelar() {
  router.push({ name: 'dashboard' })
}

function continuar() {
  state.tipo_accidente = selectedId.value
  router.push({ name: 'registro.incidente.detalle', params: { tipo: selectedId.value } })
}
</script>

<style scoped>
/* ...todo el CSS original sin cambios... */
:global(*) {
  box-sizing: border-box;
}
:global(body) {
  margin: 0;
  font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  background: #07112b;
  color: #eef2ff;
}
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
.accident-page {
  min-height: 100vh;
  display: grid;
  grid-template-columns: 236px 1fr;
  background:
    radial-gradient(circle at top center, rgba(62, 74, 143, 0.16), transparent 38%),
    linear-gradient(180deg, #050d22 0%, #08112a 100%);
}
.sidebar {
  background: linear-gradient(180deg, #0d1736 0%, #0b1430 100%);
  border-right: 1px solid rgba(255, 255, 255, 0.04);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 18px 14px;
  min-height: 100vh;
}
.brand {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 4px 2px 22px;
}
.brand__logo img {
  width: 46px;
  height: 46px;
  border-radius: 999px;
  display: block;
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.08);
}
.brand__name {
  font-size: 1.35rem;
  font-weight: 600;
  letter-spacing: -0.02em;
}
.side-nav {
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding: 38px 0 0;
}
.side-nav__item,
.logout,
.icon-btn,
.btn,
.choice-card {
  -webkit-tap-highlight-color: transparent;
  border: 0;
  cursor: pointer;
}
.side-nav__item {
  background: transparent;
  color: #f4f7ff;
  display: flex;
  align-items: center;
  gap: 18px;
  font-size: 1.2rem;
  text-align: left;
  padding: 10px 8px;
  border-radius: 14px;
  transition: background 180ms ease, transform 180ms ease;
}
.side-nav__item:hover {
  background: rgba(255, 255, 255, 0.04);
  transform: translateX(2px);
}
.side-nav__icon {
  width: 26px;
  display: inline-flex;
  justify-content: center;
  font-size: 1.35rem;
}
.logout {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  align-self: flex-start;
  color: #ffffff;
  background: transparent;
  font-size: 1rem;
  opacity: 0.92;
  padding: 12px 8px;
}
.content {
  padding: 18px 22px 22px;
  display: flex;
  flex-direction: column;
  min-width: 0;
}
.topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 54px;
}
.topbar__actions {
  display: flex;
  gap: 18px;
  align-items: center;
}
.icon-btn {
  width: 48px;
  height: 48px;
  border-radius: 999px;
  color: #fff;
  font-size: 1.9rem;
  background: transparent;
  display: grid;
  place-items: center;
}
.panel {
  flex: 1;
  margin: 8px auto 0;
  width: min(100%, 1040px);
  background: linear-gradient(180deg, #1a2854 0%, #1b2958 100%);
  border-radius: 28px;
  padding: 22px 24px 28px;
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.04),
    0 16px 42px rgba(0, 0, 0, 0.28);
}
.panel__header {
  text-align: center;
  padding: 0 12px 28px;
}
.panel__header h1 {
  margin: 0;
  font-size: clamp(2rem, 3.2vw, 3.1rem);
  line-height: 1.05;
  letter-spacing: -0.04em;
  font-weight: 800;
  color: #f8faff;
}
.panel__header p {
  margin: 18px 0 0;
  font-size: clamp(1.1rem, 1.8vw, 1.6rem);
  color: rgba(225, 231, 255, 0.48);
  font-weight: 600;
}
.choices {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 22px;
  padding: 4px 120px 0;
}
.choice-card {
  position: relative;
  min-height: 446px;
  border-radius: 34px;
  padding: 56px 34px 28px;
  background: #39456d;
  color: #eef2ff;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.03);
  transition: transform 180ms ease, filter 180ms ease, background 180ms ease;
}
.choice-card:hover {
  transform: translateY(-2px);
}
.choice-card.is-selected {
  background: linear-gradient(180deg, #3a34a1 0%, #2c2a88 100%);
}
.choice-card__art {
  width: 156px;
  height: 156px;
  margin: 0 auto 52px;
  border-radius: 18px;
  display: grid;
  place-items: center;
  position: relative;
  overflow: hidden;
}
.choice-card__art::before,
.choice-card__art::after {
  content: '';
  position: absolute;
  inset: 0;
  opacity: 0.14;
}
.art--victimas {
  background: linear-gradient(180deg, #7aa0f1 0%, #678ad9 100%);
}
.art--victimas::before {
  background:
    radial-gradient(circle at 36% 33%, #fff 0 13%, transparent 14%),
    radial-gradient(circle at 66% 40%, #fff 0 10%, transparent 11%),
    radial-gradient(circle at 47% 74%, #fff 0 18%, transparent 19%);
}
.art--vehiculo {
  background: linear-gradient(180deg, #242dc0 0%, #141a80 100%);
}
.art--vehiculo::before {
  background:
    linear-gradient(#fff, #fff) 24% 62% / 52% 6% no-repeat,
    linear-gradient(#fff, #fff) 28% 40% / 44% 12% no-repeat,
    radial-gradient(circle at 30% 76%, #fff 0 8%, transparent 9%),
    radial-gradient(circle at 70% 76%, #fff 0 8%, transparent 9%);
}
.choice-card__emoji {
  font-size: 4rem;
  line-height: 1;
  filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.22));
}
.choice-card__title {
  margin: 0;
  text-align: center;
  font-size: 1.45rem;
  line-height: 1.1;
  color: rgba(244, 247, 255, 0.82);
  font-weight: 500;
}
.choice-card__check {
  width: 44px;
  height: 44px;
  margin: 40px auto 0;
  border-radius: 6px;
  border: 3px solid rgba(255, 255, 255, 0.78);
  display: grid;
  place-items: center;
  color: #26349b;
  font-size: 1.35rem;
  font-weight: 900;
  background: transparent;
}
.choice-card__check.is-selected {
  border-color: #3531ff;
  background: #3540ff;
  color: #16216f;
}
.panel__footer {
  display: flex;
  justify-content: center;
  gap: 64px;
  margin-top: 48px;
}
.btn {
  min-width: 186px;
  height: 88px;
  border-radius: 24px;
  font-size: 1.95rem;
  font-weight: 500;
  letter-spacing: -0.02em;
  transition: transform 180ms ease, filter 180ms ease, background 180ms ease;
}
.btn:hover {
  transform: translateY(-1px);
}
.btn--secondary {
  background: #556083;
  color: #ffffff;
}
.btn--primary {
  background: linear-gradient(135deg, #2f13ff 0%, #5b21d4 100%);
  color: #f7f8ff;
}
@media (max-width: 1180px) {
  .accident-page {
    grid-template-columns: 210px 1fr;
  }
  .choices {
    padding-inline: 36px;
  }
}
@media (max-width: 920px) {
  .accident-page {
    grid-template-columns: 1fr;
  }
  .sidebar {
    min-height: auto;
    padding-bottom: 12px;
  }
  .side-nav {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 10px;
    padding-top: 18px;
  }
  .logout {
    margin-top: 14px;
  }
  .choices {
    padding-inline: 0;
  }
}
@media (max-width: 720px) {
  .content {
    padding: 14px;
  }
  .panel {
    padding: 18px 16px 22px;
    border-radius: 24px;
  }
  .choices {
    grid-template-columns: 1fr;
  }
  .choice-card {
    min-height: 380px;
    padding: 40px 22px 24px;
  }
  .choice-card__art {
    margin-bottom: 34px;
  }
  .panel__footer {
    gap: 14px;
    flex-direction: column;
  }
  .btn {
    width: 100%;
    min-width: 0;
    height: 68px;
    font-size: 1.4rem;
    border-radius: 18px;
  }
  .topbar {
    margin-bottom: 6px;
  }
}
</style>
