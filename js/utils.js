/**
 * utils.js - Funciones utilitarias
 * Funciones auxiliares para escapar HTML, mostrar mensajes y compartir en redes sociales
 */

function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function showSuccess() {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = '✓ ¡Tarjeta musical creada con éxito!';
    document.querySelector('.container').insertBefore(successDiv, document.querySelector('.container').firstChild);
    setTimeout(() => successDiv.remove(), 3000);
}

function shareTwitter() {
    const cardUrl = document.getElementById('shareUrl').value;
    const text = `🎵 ¡Escucha mi música! ${cardData.songName} - ${cardData.artist}`;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(cardUrl)}`;
    window.open(twitterUrl, '_blank', 'width=600,height=400');
}

function shareFacebook() {
    const cardUrl = document.getElementById('shareUrl').value;
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(cardUrl)}`;
    window.open(facebookUrl, '_blank', 'width=600,height=400');
}

function shareWhatsApp() {
    const cardUrl = document.getElementById('shareUrl').value;
    const text = `🎵 ¡Escucha mi música! ${cardData.songName} - ${cardData.artist}\n${cardUrl}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
}

function copyShareLink() {
    const shareUrlInput = document.getElementById('shareUrl');
    shareUrlInput.select();
    shareUrlInput.setSelectionRange(0, 99999); // Para móviles
    
    navigator.clipboard.writeText(shareUrlInput.value).then(() => {
        const originalText = event.target.textContent;
        event.target.textContent = '✓ Copiado';
        setTimeout(() => {
            event.target.textContent = originalText;
        }, 2000);
    }).catch(err => {
        console.error('Error al copiar:', err);
        document.execCommand('copy'); // Fallback para navegadores antiguos
        alert('URL copiada al portapapeles');
    });
}
