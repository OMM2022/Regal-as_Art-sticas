/*
    ╔═══════════════════════════════════════════════════════════════════╗
    ║                 REGALÍAS DIRECTAS - CONFIGURACIÓN                 ║
    ║                   © 2025 OMM2022 - All Rights Reserved            ║
    ╚═══════════════════════════════════════════════════════════════════╝
*/

console.log('🎵 Script cargado correctamente');

// ⚙️ CONFIGURACIÓN DEL DESARROLLADOR - TU MONETIZACIÓN
// Pega aquí tu código publicitario (Google AdSense, A-Ads, etc.)
const DEVELOPER_AD_CODE = `
    <!-- A-Ads Async Code -->
    <iframe data-aa='2392933' src='//ad.a-ads.com/2392933?size=320x50' style='width:320px; height:50px; border:0px; padding:0; overflow:hidden; background-color: transparent;'></iframe>
`;

// Cambia "false" a "true" si quieres ocultar la publicidad durante pruebas
const HIDE_DEVELOPER_AD = false;

// Variables globales
let currentAudio = null;
let cardData = null;
let viewCount = 0;

// Verificar que QRCode esté disponible
window.addEventListener('load', function() {
    if (typeof QRCode === 'undefined') {
        console.error('⚠️ Librería QRCode no se cargó correctamente');
        alert('Error: No se pudo cargar la librería de códigos QR. Por favor, recarga la página.');
    } else {
        console.log('✅ Librería QRCode cargada correctamente');
    }
});

// Cargar tema guardado
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
}
