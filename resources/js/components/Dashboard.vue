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
                    <li class="nav-item" :class="{ active: activeNav === 'Inicio' }" @click="activeNav = 'Inicio'"><i class="ph ph-house"></i> Inicio</li>
                    <li class="nav-item" :class="{ active: activeNav === 'Registrar incidente' }" @click="activeNav = 'Registrar incidente'"><i class="ph ph-plus-square"></i> Registrar incidente</li>
                    <li class="nav-item" :class="{ active: activeNav === 'Buscar casos' }" @click="activeNav = 'Buscar casos'"><i class="ph ph-magnifying-glass"></i> Buscar casos</li>
                    <li class="nav-item" :class="{ active: activeNav === 'Ver mapa' }" @click="activeNav = 'Ver mapa'"><i class="ph ph-map-pin"></i> Ver mapa</li>
                </ul>
            </div>

            <div class="nav-section">
                <p class="nav-title">SISTEMA</p>
                <ul class="nav-list">
                    <li class="nav-item" :class="{ active: activeNav === 'Reportes' }" @click="activeNav = 'Reportes'"><i class="ph ph-file-text"></i> Reportes</li>
                    <li class="nav-item" :class="{ active: activeNav === 'Historial' }" @click="activeNav = 'Historial'"><i class="ph ph-clock-counter-clockwise"></i> Historial</li>
                    <li class="nav-item" :class="{ active: activeNav === 'Configuración' }" @click="activeNav = 'Configuración'"><i class="ph ph-gear"></i> Configuración</li>
                    <li class="nav-item" :class="{ active: activeNav === 'Ayuda' }" @click="activeNav = 'Ayuda'"><i class="ph ph-question"></i> Ayuda</li>
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

            <section class="content-section">
                <h3 class="section-title">ACCESO RÁPIDO</h3>
                <div class="quick-access-grid">
                    <div class="card card-action" :class="{ 'active-card': activeCard === 'Registrar incidente' }" @click="activeCard = 'Registrar incidente'">
                        <div class="icon-box icon-blue"><i class="ph ph-plus"></i></div>
                        <div class="card-text">
                            <h4>Registrar incidente</h4>
                            <p>Reporta un nuevo incidente</p>
                        </div>
                        <i class="ph ph-caret-right arrow"></i>
                    </div>
                    <div class="card card-action" :class="{ 'active-card': activeCard === 'Ver mapa' }" @click="activeCard = 'Ver mapa'">
                        <div class="icon-box icon-blue"><i class="ph ph-map-pin"></i></div>
                        <div class="card-text">
                            <h4>Ver mapa</h4>
                            <p>visualiza incidentes</p>
                        </div>
                        <i class="ph ph-caret-right arrow"></i>
                    </div>
                    <div class="card card-action" :class="{ 'active-card': activeCard === 'Buscar casos' }" @click="activeCard = 'Buscar casos'">
                        <div class="icon-box icon-blue"><i class="ph ph-magnifying-glass"></i></div>
                        <div class="card-text">
                            <h4>Buscar casos</h4>
                            <p>Consulta incidentes</p>
                        </div>
                        <i class="ph ph-caret-right arrow"></i>
                    </div>
                    <div class="card card-action" :class="{ 'active-card': activeCard === 'Reportes' }" @click="activeCard = 'Reportes'">
                        <div class="icon-box icon-blue"><i class="ph ph-file-text"></i></div>
                        <div class="card-text">
                            <h4>Reportes</h4>
                            <p>Visualiza reportes</p>
                        </div>
                        <i class="ph ph-caret-right arrow"></i>
                    </div>
                </div>
            </section>

            <section class="content-section">
                <div class="status-panel card">
                    <h3 class="section-title">ESTADO DEL SISTEMA</h3>
                    <div class="status-items">
                        <div class="status-item"><div class="dot bg-safe"></div><div class="s-info"><span>Seguro</span><strong class="t-safe">12</strong></div></div>
                        <div class="status-item"><div class="dot bg-low"></div><div class="s-info"><span>Bajo riesgo</span><strong class="t-low">8</strong></div></div>
                        <div class="status-item"><div class="dot bg-medium"></div><div class="s-info"><span>Medio</span><strong class="t-medium">4</strong></div></div>
                        <div class="status-item"><div class="dot bg-high"></div><div class="s-info"><span>Alto</span><strong class="t-high">2</strong></div></div>
                        <div class="status-item"><div class="dot bg-critical"></div><div class="s-info"><span>Crítico</span><strong class="t-critical">1</strong></div></div>
                    </div>
                </div>
            </section>

            <section class="content-section">
                <div class="metrics-grid">
                    <div class="card metric-card">
                        <div class="m-icon icon-blue"><i class="ph ph-calendar-blank"></i></div>
                        <div class="m-data">
                            <span>Casos activos</span>
                            <h2>27</h2>
                            <small class="t-blue">+3 hoy</small>
                        </div>
                    </div>
                    <div class="card metric-card">
                        <div class="m-icon icon-red"><i class="ph ph-warning"></i></div>
                        <div class="m-data">
                            <span>Alertas activas</span>
                            <h2>2</h2>
                            <small class="t-red">↑ urgente</small>
                        </div>
                    </div>
                    <div class="card metric-card">
                        <div class="m-icon icon-green"><i class="ph ph-check-circle"></i></div>
                        <div class="m-data">
                            <span>Resueltos hoy</span>
                            <h2>9</h2>
                            <small class="t-green">+9 hoy</small>
                        </div>
                    </div>
                </div>
            </section>

        </main>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

// Estado para el elemento activo de navegación (inicia en 'Registrar incidente')
const activeNav = ref('Registrar incidente');

// Estado para la tarjeta activa de acceso rápido
const activeCard = ref('Registrar incidente');

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
        
        --primary-blue: #1d4ed8;
        --accent-blue: #3b82f6;
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
        /* Restablecer estilos base dentro del componente para que no dependa de selectores globales de etiqueta */
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    .dashboard * {
        box-sizing: border-box;
    }

    /* --- BARRA LATERAL (SIDEBAR) --- */
    .sidebar {
        width: 260px;
        background-color: var(--bg-sidebar);
        border-right: 1px solid var(--border-color);
        display: flex;
        flex-direction: column;
        padding: 20px 0;
    }

    .user-profile {
        display: flex;
        align-items: center;
        padding: 0 20px 20px;
        border-bottom: 1px solid var(--border-color);
        gap: 12px;
    }

    .avatar {
        width: 40px;
        height: 40px;
        background-color: var(--primary-blue);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        font-size: 14px;
    }

    .user-info h4 { font-size: 14px; font-weight: 600; margin: 0;}
    .user-info span { font-size: 10px; color: var(--text-muted); }
    .menu-icon { margin-left: auto; cursor: pointer; color: var(--text-muted); font-size: 20px;}

    .nav-section { margin-top: 25px; }
    .nav-title {
        font-size: 11px;
        color: var(--text-muted);
        padding: 0 20px;
        margin-bottom: 10px;
        letter-spacing: 1px;
    }

    .nav-list { list-style: none; margin: 0; padding: 0;}
    .nav-item {
        padding: 12px 20px;
        display: flex;
        align-items: center;
        gap: 12px;
        color: var(--text-muted);
        font-size: 14px;
        cursor: pointer;
        transition: 0.2s;
    }

    .nav-item i { font-size: 18px; }
    .nav-item:hover { color: var(--text-main); }
    .nav-item.active {
        background-color: #1e293b;
        color: var(--text-main);
        border-left: 3px solid var(--primary-blue);
    }

    .logout {
        margin-top: auto;
        padding: 20px;
        color: var(--high);
        display: flex;
        align-items: center;
        gap: 10px;
        cursor: pointer;
        font-size: 14px;
    }

    /* --- CONTENIDO PRINCIPAL --- */
    .main-content {
        flex: 1;
        padding: 30px 40px;
        overflow-y: auto;
    }

    /* Encabezado */
    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 40px;
    }

    .header-titles h1 { font-size: 24px; font-weight: 600; margin: 0 0 5px 0; }
    .header-titles p { color: var(--text-muted); font-size: 14px; margin: 0;}

    .header-actions { display: flex; gap: 15px; align-items: center; }

    .datetime-pill {
        display: flex;
        align-items: center;
        gap: 10px;
        background-color: var(--bg-card);
        padding: 10px 15px;
        border-radius: 8px;
        border: 1px solid var(--border-color);
    }
    .datetime-pill i { font-size: 20px; color: var(--text-muted); }
    .dt-text { display: flex; flex-direction: column; font-size: 12px;}
    .dt-text .date { font-weight: 600; }
    .dt-text .time { color: var(--text-muted); font-size: 11px;}

    .notification {
        background-color: var(--bg-card);
        width: 45px;
        height: 45px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid var(--border-color);
        position: relative;
        cursor: pointer;
    }
    .notification i { font-size: 20px; color: var(--text-muted); }
    .badge {
        position: absolute;
        top: -2px;
        right: -2px;
        background-color: var(--critical);
        color: white;
        font-size: 10px;
        width: 16px;
        height: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        font-weight: bold;
    }

    /* Secciones */
    .content-section { margin-bottom: 30px; }
    .section-title {
        font-size: 12px;
        color: var(--text-muted);
        margin-bottom: 15px;
        letter-spacing: 1px;
    }

    .card {
        background-color: var(--bg-card);
        border: 1px solid var(--border-color);
        border-radius: 12px;
        padding: 20px;
    }

    /* Acceso Rápido */
    .quick-access-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 20px;
    }

    .card-action {
        display: flex;
        flex-direction: column;
        cursor: pointer;
        transition: 0.3s;
        position: relative;
    }
    .card-action:hover, .card-action.active-card {
        border-color: var(--accent-blue);
        background-color: rgba(37, 99, 235, 0.05);
    }

    .icon-box {
        width: 40px;
        height: 40px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;
        margin-bottom: 25px;
    }
    .icon-blue { background-color: var(--primary-blue); color: white; }

    .card-text h4 { font-size: 14px; margin: 0 0 5px 0; }
    .card-text p { font-size: 11px; color: var(--text-muted); margin: 0; }
    .arrow {
        position: absolute;
        right: 20px;
        top: 50%;
        transform: translateY(-50%);
        color: var(--text-muted);
    }

    /* Estado del Sistema */
    .status-panel { padding: 25px; }
    .status-items {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-top: 10px;
    }
    .status-item { display: flex; align-items: center; gap: 15px; }
    .dot { width: 30px; height: 30px; border-radius: 50%; }
    .bg-safe { background-color: var(--safe); }
    .bg-low { background-color: var(--low); }
    .bg-medium { background-color: var(--medium); }
    .bg-high { background-color: var(--high); }
    .bg-critical { background-color: var(--critical); }

    .s-info { display: flex; flex-direction: column; gap: 5px; }
    .s-info span { font-size: 12px; color: var(--text-muted); }
    .s-info strong { font-size: 14px; }

    /* Colores de texto */
    .t-safe { color: var(--safe); }
    .t-low { color: var(--low); }
    .t-medium { color: var(--medium); }
    .t-high { color: var(--high); }
    .t-critical { color: var(--critical); }
    .t-blue { color: var(--accent-blue); }
    .t-red { color: var(--high); }
    .t-green { color: var(--safe); }

    /* Métricas */
    .metrics-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 20px;
    }
    .metric-card {
        display: flex;
        align-items: center;
        gap: 20px;
        padding: 30px;
    }
    .m-icon {
        width: 60px;
        height: 60px;
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 32px;
    }
    .icon-red { color: var(--high); background-color: rgba(239, 68, 68, 0.1); }
    .icon-green { color: var(--safe); background-color: rgba(34, 197, 94, 0.1); }
    .icon-blue { color: var(--accent-blue); background-color: rgba(59, 130, 246, 0.1); }

    .m-data { display: flex; flex-direction: column; align-items: center; width: 100%;}
    .m-data span { font-size: 12px; color: var(--text-muted); margin-bottom: 5px;}
    .m-data h2 { font-size: 32px; font-weight: bold; margin: 0 0 5px 0;}
    .m-data small { font-size: 12px; }

    /* Responsividad básica */
    @media (max-width: 1024px) {
        .quick-access-grid { grid-template-columns: repeat(2, 1fr); }
        .status-items { flex-wrap: wrap; gap: 20px; justify-content: center; }
    }
</style>
