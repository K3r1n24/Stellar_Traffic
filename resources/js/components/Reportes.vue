<template>
    <div class="dashboard">
        <Sidebar />
        <main class="main-content">
            <TopHeader title="Reportes" subtitle="Generación de informes estadísticos" />
            <div class="content-wrapper" style="margin-top: 30px; text-align: center; color: var(--text-muted);">
                <i class="ph ph-file-text" style="font-size: 64px; margin-bottom: 20px;"></i>
                <h2>Reportes</h2>
                <p>Módulo de reportes en construcción...</p>
            </div>
        </main>
    </div>
</template>

<script setup>
import Sidebar from './Sidebar.vue';
import TopHeader from './TopHeader.vue';
</script>
