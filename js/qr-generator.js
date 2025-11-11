/**
 * qr-generator.js - Generación de códigos QR y descarga de imágenes
 * Funciones para crear códigos QR y descargar la tarjeta como imagen
 */

function generateQR() {
    const qrcodeContainer = document.getElementById('qrcode');
    qrcodeContainer.innerHTML = ''; // Limpiar QR anterior
    
    // Obtener la URL generada de la tarjeta
    const cardUrl = generateCardUrl();
    
    if (typeof QRCode === 'undefined') {
        qrcodeContainer.innerHTML = '<p style="color: red;">Error: Biblioteca QRCode no cargada. Por favor, recarga la página.</p>';
        return;
    }
    
    new QRCode(qrcodeContainer, {
        text: cardUrl,
        width: 256,
        height: 256,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
    });
    
    console.log('✅ Código QR generado exitosamente');
}

function downloadCardImage() {
    const cardElement = document.querySelector('.music-card');
    
    if (!cardElement) {
        alert('No hay ninguna tarjeta para descargar. Por favor, genera una tarjeta primero.');
        return;
    }
    
    if (typeof html2canvas === 'undefined') {
        alert('Error: Biblioteca html2canvas no cargada. Por favor, recarga la página.');
        return;
    }
    
    // Ocultar temporalmente los botones de la tarjeta
    const actionsDiv = cardElement.querySelector('.actions');
    const socialShareDiv = cardElement.querySelector('.social-share');
    const developerAdDiv = cardElement.querySelector('.developer-ad');
    const viewCounterDiv = cardElement.querySelector('.view-counter');
    
    const originalDisplayActions = actionsDiv ? actionsDiv.style.display : '';
    const originalDisplaySocial = socialShareDiv ? socialShareDiv.style.display : '';
    const originalDisplayAd = developerAdDiv ? developerAdDiv.style.display : '';
    const originalDisplayCounter = viewCounterDiv ? viewCounterDiv.style.display : '';
    
    if (actionsDiv) actionsDiv.style.display = 'none';
    if (socialShareDiv) socialShareDiv.style.display = 'none';
    if (developerAdDiv) developerAdDiv.style.display = 'none';
    if (viewCounterDiv) viewCounterDiv.style.display = 'none';
    
    // Crear un placeholder para imágenes que no cargan
    const images = cardElement.querySelectorAll('img');
    const imagePromises = Array.from(images).map(img => {
        return new Promise((resolve) => {
            if (img.complete) {
                resolve();
            } else {
                img.onload = resolve;
                img.onerror = () => {
                    // Si la imagen falla, usar un placeholder
                    img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect width="200" height="200" fill="%23ddd"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="14" fill="%23999"%3EImagen no disponible%3C/text%3E%3C/svg%3E';
                    resolve();
                };
            }
        });
    });
    
    Promise.all(imagePromises).then(() => {
        html2canvas(cardElement, {
            backgroundColor: null,
            scale: 2,
            logging: false,
            useCORS: true,
            allowTaint: true
        }).then(canvas => {
            // Restaurar la visualización de los elementos ocultos
            if (actionsDiv) actionsDiv.style.display = originalDisplayActions;
            if (socialShareDiv) socialShareDiv.style.display = originalDisplaySocial;
            if (developerAdDiv) developerAdDiv.style.display = originalDisplayAd;
            if (viewCounterDiv) viewCounterDiv.style.display = originalDisplayCounter;
            
            // Convertir el canvas a imagen y descargar
            const link = document.createElement('a');
            link.download = `${cardData.songName || 'tarjeta-musical'}.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();
        }).catch(error => {
            // Restaurar en caso de error
            if (actionsDiv) actionsDiv.style.display = originalDisplayActions;
            if (socialShareDiv) socialShareDiv.style.display = originalDisplaySocial;
            if (developerAdDiv) developerAdDiv.style.display = originalDisplayAd;
            if (viewCounterDiv) viewCounterDiv.style.display = originalDisplayCounter;
            
            console.error('Error al generar la imagen:', error);
            alert('Hubo un error al generar la imagen. Por favor, intenta nuevamente.');
        });
    });
}
