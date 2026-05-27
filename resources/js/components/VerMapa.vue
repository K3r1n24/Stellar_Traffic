<template>
    <div class="dashboard">
        <Sidebar />
        <main class="main-content">
            <TopHeader title="Ver Mapa" subtitle="Geolocalización de incidentes" />
            <div class="content-wrapper" style="margin-top: 30px; text-align: center; color: var(--text-muted);">
                <i class="ph ph-map-pin" style="font-size: 64px; margin-bottom: 20px;"></i>
                <h2>Mapa Global</h2>
                <p>Mapa interactivo en construcción...</p>
            </div>
        </main>
    </div>
</template>

<script setup>
import Sidebar from './Sidebar.vue';
import TopHeader from './TopHeader.vue';
</script>
