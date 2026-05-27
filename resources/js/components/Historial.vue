<template>
    <div class="dashboard">
        <Sidebar />
        <main class="main-content">
            <TopHeader title="Historial" subtitle="Registro de auditoría del sistema" />
            <div class="content-wrapper" style="margin-top: 30px; text-align: center; color: var(--text-muted);">
                <i class="ph ph-clock-counter-clockwise" style="font-size: 64px; margin-bottom: 20px;"></i>
                <h2>Historial de Actividad</h2>
                <p>Módulo de historial en construcción...</p>
            </div>
        </main>
    </div>
</template>

<script setup>
import Sidebar from './Sidebar.vue';
import TopHeader from './TopHeader.vue';
</script>
