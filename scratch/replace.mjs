import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const componentsDir = path.join(__dirname, '../resources/js/components');
const files = fs.readdirSync(componentsDir).filter(f => f.endsWith('.vue') && f !== 'Sidebar.vue' && f !== 'TopHeader.vue' && f !== 'App.vue' && f !== 'LoginForm.vue' && f !== 'RegisterForm.vue' && f !== 'BuscarCasos.vue' && f !== 'Historial.vue' && f !== 'Reportes.vue' && f !== 'VerMapa.vue');

files.forEach(file => {
    const filePath = path.join(componentsDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    let modified = false;

    // Replace Sidebar
    const sidebarRegex = /<aside class="sidebar">[\s\S]*?<\/aside>/i;
    if (sidebarRegex.test(content)) {
        content = content.replace(sidebarRegex, '<Sidebar />');
        modified = true;
    }

    // Replace Header
    const headerRegex = /<header class="header">[\s\S]*?<\/header>/i;
    if (headerRegex.test(content)) {
        // Determine title based on file
        let title = "Registro de Incidente";
        let subtitle = "Gestión rápida de incidentes y monitoreo vial";
        if (file === 'Dashboard.vue') {
            title = "Panel Principal";
            subtitle = "Resumen de actividad y estado vial actual";
        } else if (file === 'RegistrarIncidenteExito.vue') {
            title = "¡Registro Exitoso!";
            subtitle = "El caso ha sido procesado";
        }
        
        content = content.replace(headerRegex, `<TopHeader title="${title}" subtitle="${subtitle}" />`);
        modified = true;
    }

    // Add imports
    const scriptRegex = /<script setup>/i;
    if (scriptRegex.test(content) && !content.includes("import Sidebar")) {
        content = content.replace(scriptRegex, `<script setup>\nimport Sidebar from './Sidebar.vue';\nimport TopHeader from './TopHeader.vue';`);
        modified = true;
    }
    
    if (modified) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated ${file}`);
    }
});
