<template>
    <aside :class="['sidebar', { 'sidebar-collapsed': isCollapsed }]">
        <div class="user-profile">
            <div class="avatar">ST</div>
            <div class="user-info" v-if="!isCollapsed">
                <h4>Oficial de Tránsito</h4>
                <span>ID: ST-2026</span>
            </div>
            <i class="ph ph-list menu-icon" @click="toggleSidebar"></i>
        </div>

        <div class="nav-section">
            <p class="nav-title" v-if="!isCollapsed">PRINCIPAL</p>
            <ul class="nav-list" id="main-nav">
                <li :class="['nav-item', { active: currentRoute === '/dashboard' }]" @click="goTo('/dashboard')">
                    <i class="ph ph-house"></i> <span v-if="!isCollapsed">Inicio</span>
                </li>
                <li :class="['nav-item', { active: currentRoute.includes('registrar-incidente') }]" @click="goTo('/registrar-incidente')">
                    <i class="ph ph-plus-square"></i> <span v-if="!isCollapsed">Registrar incidente</span>
                </li>
                <li :class="['nav-item', { active: currentRoute === '/buscar' }]" @click="goTo('/buscar')">
                    <i class="ph ph-magnifying-glass"></i> <span v-if="!isCollapsed">Buscar casos</span>
                </li>
                <li :class="['nav-item', { active: currentRoute === '/mapa' }]" @click="goTo('/mapa')">
                    <i class="ph ph-map-pin"></i> <span v-if="!isCollapsed">Ver mapa</span>
                </li>
            </ul>
        </div>

        <div class="nav-section">
            <p class="nav-title" v-if="!isCollapsed">SISTEMA</p>
            <ul class="nav-list">
                <li :class="['nav-item', { active: currentRoute === '/reportes' }]" @click="goTo('/reportes')">
                    <i class="ph ph-file-text"></i> <span v-if="!isCollapsed">Reportes</span>
                </li>
                <li :class="['nav-item', { active: currentRoute === '/historial' }]" @click="goTo('/historial')">
                    <i class="ph ph-clock-counter-clockwise"></i> <span v-if="!isCollapsed">Historial</span>
                </li>
                <li :class="['nav-item', { active: currentRoute === '/configuracion' }]" @click="goTo('/configuracion')">
                    <i class="ph ph-gear"></i> <span v-if="!isCollapsed">Configuración</span>
                </li>
                <li :class="['nav-item', { active: currentRoute === '/ayuda' }]" @click="goTo('/ayuda')">
                    <i class="ph ph-question"></i> <span v-if="!isCollapsed">Ayuda</span>
                </li>
            </ul>
        </div>

        <div class="logout" @click="handleLogout" :style="isCollapsed ? 'justify-content: center' : ''">
            <i class="ph ph-sign-out"></i> <span v-if="!isCollapsed">Salir de la cuenta</span>
        </div>
    </aside>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import axios from 'axios';

const router = useRouter();
const route = useRoute();
const isCollapsed = ref(false);

const currentRoute = computed(() => route.path);

const toggleSidebar = () => {
    isCollapsed.value = !isCollapsed.value;
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
.sidebar {
    transition: width 0.3s ease;
    overflow-x: hidden;
}
.sidebar-collapsed {
    width: 80px;
}
.sidebar-collapsed .nav-item {
    justify-content: center;
    padding: 12px 0;
}
.sidebar-collapsed .nav-item i {
    font-size: 24px;
}
</style>
