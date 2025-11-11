/**
 * ads.js - Sistema de anuncios y monetización
 * Gestión de modales de anuncios y sistema de visualizaciones
 */

// Mostrar modal de anuncios después de 3 segundos en la vista de tarjeta
function showAdModalAfterDelay() {
    if (document.getElementById('cardResult').classList.contains('hidden')) {
        return; // No mostrar si no hay tarjeta visible
    }
    
    setTimeout(() => {
        if (!document.getElementById('cardResult').classList.contains('hidden')) {
            openAdModal();
        }
    }, 3000);
}

// Mostrar modal global de anuncios al cargar la página
function showGlobalAdModal() {
    setTimeout(() => {
        openGlobalAdModal();
    }, 5000);
}

// Inicializar sistema de anuncios
function initAdsSystem() {
    // Verificar si debe mostrarse el modal global
    const urlParams = new URLSearchParams(window.location.search);
    const isCardView = urlParams.has('view') || urlParams.has('s');
    
    if (!isCardView) {
        // Solo mostrar modal global si no es vista de tarjeta
        showGlobalAdModal();
    }
}

// Inyectar código de anuncio del desarrollador
function injectDeveloperAd() {
    if (HIDE_DEVELOPER_AD) return '';
    
    return `
        <div class="developer-ad">
            <div class="developer-ad-content">
                ${DEVELOPER_AD_CODE}
            </div>
        </div>`;
}
