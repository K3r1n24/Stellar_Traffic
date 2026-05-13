<template>
  <div class="min-h-screen bg-[#050f2f] text-white flex font-sans">
    <!-- Sidebar -->
    <aside class="w-[240px] bg-[#091738] border-r border-white/10 flex flex-col justify-between">
      <div>
        <div class="p-4 border-b border-white/10 flex items-center gap-3">
          <div class="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center font-bold text-lg">
            JP
          </div>
          <div>
            <h2 class="font-semibold">Juan Perez</h2>
            <p class="text-xs text-white/50 uppercase">
              Panel de Control PNC
            </p>
          </div>
        </div>
        <div class="p-3 space-y-6">
          <div v-for="section in sidebarItems" :key="section.section">
            <p class="text-[10px] tracking-widest text-white/40 mb-2">
              {{ section.section }}
            </p>
            <div class="space-y-1">
              <button
                v-for="item in section.items"
                :key="item"
                class="w-full text-left px-4 py-3 rounded-xl transition-all flex items-center justify-between"
                :class="item === 'Inicio'
                  ? 'bg-blue-900/70 text-white'
                  : 'hover:bg-white/5 text-white/80'"
              >
                <span>{{ item }}</span>
                <span
                  v-if="item === 'Alertas'"
                  class="bg-red-500 text-xs w-6 h-6 rounded-full flex items-center justify-center"
                >
                  2
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="p-4 border-t border-white/10 text-red-400 text-sm">
        → Salir de la cuenta
      </div>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 flex">
      <div class="flex-1 p-6 overflow-auto">
        <!-- Header -->
        <div class="flex items-center justify-between mb-8">
          <div class="flex items-center gap-4">
            <button class="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 transition">
              ←
            </button>
            <div>
              <h1 class="text-4xl font-bold">
                Bienvenido, ¿qué deseas hacer hoy?
              </h1>
              <p class="text-blue-400 mt-1">
                Miércoles, 29 de abril del 2026
              </p>
            </div>
          </div>
          <div class="relative">
            <button class="w-12 h-12 rounded-full bg-white/5 hover:bg-white/10">
              🔔
            </button>
            <div class="absolute -top-1 -right-1 bg-red-500 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">
              2
            </div>
          </div>
        </div>

        <!-- Dashboard Grid -->
        <div class="grid grid-cols-12 gap-6">
          <div class="col-span-9 space-y-6">
            <!-- Quick Actions -->
            <div>
              <p class="text-sm text-white/50 uppercase tracking-wider mb-3">
                Acciones rápidas
              </p>
              <div class="grid grid-cols-2 gap-4">
                <div
                  v-for="action in quickActions"
                  :key="action.title"
                  class="relative rounded-3xl bg-[#1b2d63] overflow-hidden p-6 min-h-[170px] border border-white/5 hover:scale-[1.01] transition cursor-pointer"
                  @click="action.action?.()"
                >
                  <div
                    :class="`absolute top-0 left-0 h-1 w-full bg-gradient-to-r ${action.color}`"
                  />
                  <div
                    v-if="action.badge"
                    class="absolute top-4 left-20 bg-red-500 text-xs w-8 h-8 rounded-full flex items-center justify-center font-bold"
                  >
                    {{ action.badge }}
                  </div>
                  <div class="text-5xl mb-6">{{ action.icon }}</div>
                  <h3 class="text-2xl font-semibold max-w-[180px] leading-tight">
                    {{ action.title }}
                  </h3>
                  <button class="absolute bottom-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20">
                    →
                  </button>
                </div>
              </div>
            </div>

            <!-- System Status -->
            <div class="rounded-3xl bg-[#1b2d63] p-6 border border-white/5">
              <p class="text-xs uppercase text-white/50 tracking-wider mb-5">
                Estado del sistema
              </p>
              <div class="grid grid-cols-5 gap-4 text-center">
                <div>
                  <div class="w-3 h-3 bg-green-500 rounded-full mx-auto mb-2" />
                  <p class="text-sm text-white/70">Seguro</p>
                  <h2 class="text-2xl font-bold mt-2">12</h2>
                </div>
                <div>
                  <div class="w-3 h-3 bg-green-400 rounded-full mx-auto mb-2" />
                  <p class="text-sm text-white/70">Bajo riesgo</p>
                  <h2 class="text-2xl font-bold mt-2">8</h2>
                </div>
                <div>
                  <div class="w-3 h-3 bg-yellow-400 rounded-full mx-auto mb-2" />
                  <p class="text-sm text-white/70">Medio</p>
                  <h2 class="text-2xl font-bold mt-2">4</h2>
                </div>
                <div>
                  <div class="w-3 h-3 bg-orange-500 rounded-full mx-auto mb-2" />
                  <p class="text-sm text-white/70">Alto</p>
                  <h2 class="text-2xl font-bold mt-2">2</h2>
                </div>
                <div>
                  <div class="w-3 h-3 bg-red-500 rounded-full mx-auto mb-2" />
                  <p class="text-sm text-white/70">Crítico</p>
                  <h2 class="text-2xl font-bold mt-2">1</h2>
                </div>
              </div>
            </div>

            <!-- Stats -->
            <div class="grid grid-cols-3 gap-4">
              <div class="rounded-3xl bg-[#1b2d63] p-6 border-t-4 border-blue-500">
                <p class="text-white/60 mb-2">Casos activos</p>
                <h2 class="text-5xl font-bold">27</h2>
                <p class="text-blue-400 mt-2">+3 hoy</p>
              </div>
              <div class="rounded-3xl bg-[#1b2d63] p-6 border-t-4 border-red-500">
                <p class="text-white/60 mb-2">Alertas activas</p>
                <h2 class="text-5xl font-bold">2</h2>
                <p class="text-red-400 mt-2">1 urgente</p>
              </div>
              <div class="rounded-3xl bg-[#1b2d63] p-6 border-t-4 border-green-500">
                <p class="text-white/60 mb-2">Resueltos hoy</p>
                <h2 class="text-5xl font-bold">9</h2>
                <p class="text-green-400 mt-2">+9 hoy</p>
              </div>
            </div>
          </div>

          <!-- Right Sidebar -->
          <div class="col-span-3">
            <div class="rounded-3xl bg-[#122456] p-5 h-full border border-white/5 flex flex-col">
              <h2 class="text-2xl font-semibold mb-5">
                Actividades Recientes
              </h2>
              <div class="space-y-4 flex-1 overflow-auto">
                <div
                  v-for="activity in recentActivities"
                  :key="activity.title"
                  class="bg-white/5 rounded-2xl p-4 flex items-start gap-3 border border-white/5"
                >
                  <div
                    :class="`w-2 self-stretch rounded-full ${activity.color}`"
                  />
                  <div>
                    <h3 class="font-medium">{{ activity.title }}</h3>
                    <p class="text-sm text-white/50 mt-1">
                      {{ activity.time }}
                    </p>
                  </div>
                </div>
              </div>
              <button class="mt-5 rounded-2xl border border-blue-500 text-blue-400 py-4 hover:bg-blue-500/10 transition">
                Ver todas las actividades →
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>


<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
const quickActions = [
  {
    title: 'Registrar Incidente',
    color: 'from-blue-500 to-blue-700',
    icon: '+',
    action: () => router.push({ name: 'registro.incidente' })
  },
  {
    title: 'Ver mapa',
    color: 'from-cyan-500 to-cyan-700',
    icon: '📍'
  },
  {
    title: 'Buscar casos',
    color: 'from-purple-500 to-purple-700',
    icon: '⌕'
  },
  {
    title: 'Alertas',
    color: 'from-red-500 to-red-700',
    icon: '🔔',
    badge: 2
  }
]

const recentActivities = [
  {
    title: 'Caso #4521 Actualizado',
    time: 'Hoy, 08:15 AM',
    color: 'bg-blue-500'
  },
  {
    title: 'Nuevo reporte zona3',
    time: 'Hoy, 07:42 AM',
    color: 'bg-yellow-500'
  },
  {
    title: 'Caso #4522 Creado',
    time: 'Ayer, 11:30 PM',
    color: 'bg-green-500'
  },
  {
    title: 'Alerta zona norte',
    time: 'Ayer, 09:14 PM',
    color: 'bg-red-500'
  },
  {
    title: 'Reporte semanal listo',
    time: 'Ayer, 08:00 AM',
    color: 'bg-cyan-500'
  },
  {
    title: 'Usuario agregado',
    time: 'Hace 2 días',
    color: 'bg-purple-500'
  }
]

const sidebarItems = [
  {
    section: 'PRINCIPAL',
    items: [
      'Inicio',
      'Registrar Incidente',
      'Buscar Casos',
      'Ver Mapa'
    ]
  },
  {
    section: 'SISTEMA',
    items: ['Historial', 'Alertas', 'Reportes']
  },
  {
    section: 'CONFIGURACIÓN',
    items: ['Configuración', 'Ayuda']
  }
]
</script>
