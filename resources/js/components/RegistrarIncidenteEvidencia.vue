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
                    <div class="step-dot active"></div>
                    <div class="step-dot active"></div>
                    <div class="step-dot active"></div>
                    <div class="step-dot"></div> 
                </div>

                <div class="evidence-grid">
                    
                    <div class="card-panel">
                        <div class="panel-header">
                            <i class="ph ph-file-text"></i>
                            <div class="panel-header-text">
                                <h3>Subir evidencia</h3>
                                <p>Seleccionar desde tu dispositivo</p>
                            </div>
                        </div>

                        <div 
                            class="dropzone" 
                            :class="{ 'dragover': isDragover }"
                            @click="triggerFileInput"
                            @dragenter.prevent="onDragEnter"
                            @dragover.prevent="onDragOver"
                            @dragleave.prevent="onDragLeave"
                            @drop.prevent="onDrop"
                        >
                            <i class="ph ph-cloud-arrow-up"></i>
                            <button class="btn-upload">Seleccionar archivo</button>
                            <input 
                                type="file" 
                                ref="fileInput"
                                @change="onFileChange"
                                multiple 
                                accept=".jpg,.png,.pdf,.mp4,.doc,.docx,.xls,.xlsx" 
                                style="display: none;"
                            >
                        </div>

                        <p class="formats-text">Formatos permitidos: JPG,PNG,PDF,MP4,DOC,XLS.</p>
                        
                        <div class="info-alert">
                            <i class="ph ph-info"></i>
                            <span>Asegúrate de que los archivos sean legibles</span>
                        </div>
                    </div>

                    <div class="card-panel">
                        <div class="panel-header-flex">
                            <div class="panel-header" style="margin-bottom: 0;">
                                <i class="ph ph-file-text"></i>
                                <h3>Archivos adjuntos ({{ uploadedFiles.length }})</h3>
                            </div>
                            
                            <div class="search-files">
                                <i class="ph ph-magnifying-glass"></i>
                                <input type="text" v-model="searchQuery" placeholder="Buscar archivos...">
                            </div>
                        </div>

                        <div class="files-list-container">
                            <p v-if="filteredFiles.length === 0" style="font-size:12px; color:var(--text-muted); text-align:center; padding:20px;">
                                No se encontraron archivos.
                            </p>
                            
                            <div v-for="(file, index) in filteredFiles" :key="index" class="file-item">
                                <div class="file-icon-box">
                                    <i class="ph" :class="getIconClass(file)"></i>
                                </div>
                                <div class="file-info">
                                    <h4>{{ file.name }}</h4>
                                    <p>{{ file.size }} - {{ file.date }}</p>
                                </div>
                                <i class="ph ph-dots-three-vertical file-options"></i>
                            </div>
                        </div>
                    </div>

                </div>

                <div class="bottom-action-bar">
                    <button class="btn btn-outline" type="button" @click="handleBack">Atrás</button>
                    <button class="btn btn-primary" type="button" @click="handleNext">Continuar</button>
                </div>

            </div>
        </main>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();

// --- ESTADO REACTIVO ---
const uploadedFiles = ref([
    { name: "Foto_escena_01.jpg", size: "2.4MB", date: "15 abr 2026, 10:30 AM", type: "image" },
    { name: "Foto_escena_02.jpg", size: "2.4MB", date: "15 abr 2026, 10:30 AM", type: "image" },
    { name: "Croquis_accidente.pdf", size: "2.7MB", date: "15 abr 2026, 10:30 AM", type: "pdf" },
    { name: "Notas_adicionales.docx", size: "2.8MB", date: "15 abr 2026, 10:30 AM", type: "doc" },
    { name: "Observaciones_importantes.pdf", size: "2.9MB", date: "15 abr 2026, 10:30 AM", type: "pdf" }
]);

const searchQuery = ref('');
const isDragover = ref(false);
const fileInput = ref(null);

// --- PROPIEDAD COMPUTADA PARA FILTRADO ---
const filteredFiles = computed(() => {
    if (!searchQuery.value) return uploadedFiles.value;
    const lowerQuery = searchQuery.value.toLowerCase();
    return uploadedFiles.value.filter(file => file.name.toLowerCase().includes(lowerQuery));
});

// --- LÓGICA DE UI (Iconos) ---
const getIconClass = (file) => {
    if (file.type.includes('image') || file.name.endsWith('.jpg') || file.name.endsWith('.png')) return 'ph-image';
    if (file.type.includes('pdf') || file.name.endsWith('.pdf')) return 'ph-file-pdf';
    if (file.type.includes('video') || file.name.endsWith('.mp4')) return 'ph-video';
    return 'ph-file-text';
};

// --- DRAG & DROP Y UPLOAD DE ARCHIVOS ---
const triggerFileInput = () => {
    if (fileInput.value) {
        fileInput.value.click();
    }
};

const onDragEnter = () => { isDragover.value = true; };
const onDragOver = () => { isDragover.value = true; };
const onDragLeave = () => { isDragover.value = false; };
const onDrop = (e) => {
    isDragover.value = false;
    handleFiles(e.dataTransfer.files);
};

const onFileChange = (e) => {
    handleFiles(e.target.files);
    e.target.value = ''; // Limpiar input para permitir seleccionar el mismo archivo de nuevo si es necesario
};

const handleFiles = (files) => {
    Array.from(files).forEach(file => {
        // Formatear tamaño a MB o KB
        let sizeStr = "";
        if (file.size > 1024 * 1024) {
            sizeStr = (file.size / (1024 * 1024)).toFixed(1) + "MB";
        } else {
            sizeStr = (file.size / 1024).toFixed(1) + "KB";
        }

        // Formatear fecha
        const now = new Date();
        const options = { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true };
        const dateStr = now.toLocaleDateString('es-ES', options).replace(',', '');

        // Crear objeto de archivo
        const newFileObj = {
            name: file.name,
            size: sizeStr,
            date: dateStr,
            type: file.type || "file"
        };

        // Insertar al inicio de la lista
        uploadedFiles.value.unshift(newFileObj);
    });

    // Limpiar búsqueda si el usuario sube un archivo nuevo mientras buscaba
    searchQuery.value = '';
};

// --- NAVEGACIÓN ---
const handleBack = () => {
    router.push({ name: 'registrar-incidente-involucrados' });
};

const handleNext = () => {
    console.log(`Finalizando. Total de evidencias subidas: ${uploadedFiles.value.length}`);
    alert('¡Registro de incidente completado con éxito!');
    // Aquí podrías enviar todo el payload al backend (PostgreSQL) usando Axios
    // y luego redirigir:
    // router.push({ name: 'dashboard' });
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
        --dropzone-bg: rgba(255, 255, 255, 0.02);
        --dropzone-hover: rgba(37, 99, 235, 0.05);

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
    .avatar { width: 40px; height: 40px; background-color: var(--primary-blue); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 14px; color: white; }
    .user-info h4 { font-size: 14px; font-weight: 600; margin: 0; }
    .user-info span { font-size: 10px; color: var(--text-muted); }
    .menu-icon { margin-left: auto; cursor: pointer; color: var(--text-muted); font-size: 20px;}

    .nav-section { margin-top: 25px; }
    .nav-title { font-size: 11px; color: var(--text-muted); padding: 0 20px; margin-bottom: 10px; letter-spacing: 1px; }
    .nav-list { list-style: none; margin: 0; padding: 0; }
    .nav-item { padding: 12px 20px; display: flex; align-items: center; gap: 12px; color: var(--text-muted); font-size: 14px; cursor: pointer; transition: 0.2s; }
    .nav-item i { font-size: 18px; }
    .nav-item:hover { color: var(--text-main); }
    .nav-item.active { background-color: rgba(37, 99, 235, 0.1); color: var(--text-main); border: 1px solid var(--primary-blue); border-radius: 8px; margin: 0 10px; padding: 12px 10px; }
    .logout { margin-top: auto; padding: 20px; color: var(--critical); display: flex; align-items: center; gap: 10px; cursor: pointer; font-size: 14px; }

    /* --- CONTENIDO PRINCIPAL --- */
    .main-content { flex: 1; padding: 30px 40px; display: flex; flex-direction: column; overflow-y: auto; }

    /* Encabezado */
    .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; flex-shrink: 0; }
    .header-titles h1 { font-size: 24px; font-weight: 600; margin: 0 0 5px 0; }
    .header-titles p { color: var(--text-muted); font-size: 14px; margin: 0; }
    .header-actions { display: flex; gap: 15px; align-items: center; }

    .datetime-pill { display: flex; align-items: center; gap: 10px; background-color: var(--bg-card); padding: 10px 15px; border-radius: 8px; border: 1px solid var(--border-color); }
    .datetime-pill i { font-size: 20px; color: var(--text-muted); }
    .dt-text { display: flex; flex-direction: column; font-size: 12px;}
    .dt-text .date { font-weight: 600; }
    .dt-text .time { color: var(--text-muted); font-size: 11px;}

    .notification { background-color: var(--bg-card); width: 45px; height: 45px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 1px solid var(--border-color); position: relative; cursor: pointer; }
    .notification i { font-size: 20px; color: var(--text-muted); }
    .badge { position: absolute; top: -2px; right: -2px; background-color: var(--critical); color: white; font-size: 10px; width: 16px; height: 16px; display: flex; align-items: center; justify-content: center; border-radius: 50%; font-weight: bold; }

    /* --- VISTA DE EVIDENCIA --- */
    .form-view { flex: 1; display: flex; flex-direction: column; max-width: 1000px; margin: 0 auto; width: 100%; }

    /* Stepper - Paso 5 */
    .stepper-container { position: relative; margin: 30px 0 50px 0; display: flex; justify-content: space-between; align-items: center; width: 100%; padding: 0 10px; }
    .stepper-background-line { position: absolute; top: 50%; left: 0; width: 100%; height: 6px; background-color: #ffffff; transform: translateY(-50%); border-radius: 3px; z-index: 1; }
    
    /* Línea activa conectando casi todos los puntos */
    .stepper-active-line { position: absolute; top: 50%; left: 0; width: 83%; height: 6px; background-color: var(--accent-blue); transform: translateY(-50%); border-radius: 3px; z-index: 2; transition: width 0.4s ease; }
    
    .step-dot { width: 24px; height: 24px; border-radius: 50%; background-color: #ffffff; z-index: 3; position: relative; transition: 0.4s ease; }
    .step-dot.active { background-color: var(--accent-blue); box-shadow: 0 0 12px var(--accent-blue); }
    .car-icon-floating { position: absolute; top: -45px; left: 50%; transform: translateX(-50%); width: 45px; height: 45px; background-color: rgba(255, 255, 255, 0.08); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 20px; color: var(--text-muted); z-index: 4; }

    /* Grid de Evidencia */
    .evidence-grid { display: grid; grid-template-columns: 1fr 1.3fr; gap: 30px; margin-bottom: 30px; align-items: stretch; }

    /* Tarjeta Genérica */
    .card-panel { border: 1px solid var(--accent-blue); border-radius: 16px; padding: 35px; background-color: transparent; display: flex; flex-direction: column; }
    
    .panel-header { display: flex; align-items: center; gap: 15px; margin-bottom: 25px; }
    .panel-header i { font-size: 20px; color: var(--text-main); }
    .panel-header-text h3 { font-size: 15px; font-weight: 500; margin: 0; }
    .panel-header-text p { font-size: 12px; color: var(--text-muted); margin: 2px 0 0 0; }

    /* Panel Izquierdo: Carga de Archivos */
    .dropzone { 
        flex: 1;
        border: 2px dashed var(--border-color); 
        border-radius: 12px; 
        background-color: var(--dropzone-bg);
        display: flex; 
        flex-direction: column; 
        align-items: center; 
        justify-content: center; 
        gap: 20px;
        padding: 40px 20px;
        cursor: pointer;
        transition: all 0.3s ease;
        margin-bottom: 20px;
    }
    .dropzone:hover, .dropzone.dragover {
        border-color: var(--accent-blue);
        background-color: var(--dropzone-hover);
    }
    .dropzone i { font-size: 48px; color: var(--text-main); }
    
    .btn-upload {
        background-color: var(--primary-blue);
        color: white;
        border: none;
        padding: 12px 24px;
        border-radius: 8px;
        font-size: 13px;
        font-weight: 500;
        cursor: pointer;
        transition: 0.2s;
        pointer-events: none; /* Let the dropzone handle the click */
    }

    .formats-text { font-size: 11px; color: var(--text-muted); text-align: center; margin-bottom: 15px;}
    
    .info-alert {
        display: flex;
        align-items: center;
        gap: 10px;
        border: 1px solid var(--border-color);
        border-radius: 8px;
        padding: 12px 15px;
        background-color: rgba(255, 255, 255, 0.02);
    }
    .info-alert i { font-size: 16px; color: var(--text-muted); }
    .info-alert span { font-size: 11px; color: var(--text-muted); }

    /* Panel Derecho: Lista de Archivos */
    .panel-header-flex { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;}
    
    .search-files {
        display: flex;
        align-items: center;
        background-color: transparent;
        border: 1px solid var(--border-color);
        border-radius: 20px;
        padding: 8px 15px;
        gap: 10px;
        width: 200px;
    }
    .search-files i { color: var(--text-muted); font-size: 14px; }
    .search-files input { background: transparent; border: none; color: var(--text-main); outline: none; font-size: 12px; width: 100%;}
    .search-files input::placeholder { color: var(--text-muted); }

    .files-list-container {
        flex: 1;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        padding-right: 5px;
        max-height: 350px;
    }

    /* Custom Scrollbar */
    .files-list-container::-webkit-scrollbar { width: 4px; }
    .files-list-container::-webkit-scrollbar-thumb { background: var(--border-color); border-radius: 4px; }

    .file-item {
        display: flex;
        align-items: center;
        padding: 15px 0;
        border-bottom: 1px solid var(--border-color);
        gap: 15px;
    }
    .file-item:last-child { border-bottom: none; }

    .file-icon-box {
        width: 40px;
        height: 40px;
        background-color: rgba(255, 255, 255, 0.05);
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;
        color: var(--text-main);
        flex-shrink: 0;
    }

    .file-info { flex: 1; overflow: hidden; }
    .file-info h4 { font-size: 13px; font-weight: 500; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin-bottom: 4px; margin-top: 0;}
    .file-info p { font-size: 11px; color: var(--text-muted); margin: 0; }

    .file-options {
        color: var(--text-main);
        font-size: 20px;
        cursor: pointer;
        padding: 5px;
        transition: 0.2s;
    }
    .file-options:hover { color: var(--accent-blue); }

    /* Barra de Acciones Inferior */
    .bottom-action-bar { margin-top: auto; display: flex; justify-content: space-between; align-items: center; padding-bottom: 20px; }
    .btn { padding: 14px 40px; border-radius: 10px; font-size: 14px; font-weight: 500; cursor: pointer; transition: 0.2s; }
    .btn-outline { background-color: transparent; border: 1px solid var(--border-color); color: var(--text-main); }
    .btn-outline:hover { background-color: rgba(255, 255, 255, 0.05); }
    .btn-primary { background-color: var(--primary-blue); border: 1px solid var(--primary-blue); color: white; }
    .btn-primary:hover { background-color: var(--accent-blue); }

    /* Responsividad */
    @media (max-width: 950px) {
        .stepper-container { display: none; }
        .evidence-grid { grid-template-columns: 1fr; }
        .panel-header-flex { flex-direction: column; align-items: flex-start; gap: 15px; }
        .search-files { width: 100%; }
    }
</style>
