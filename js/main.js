/**
 * main.js - Lógica principal de la aplicación
 * Manejo del formulario, generación de tarjetas y URLs
 */

// Variable global para almacenar los datos de la tarjeta
let cardData = null;

function generateCard() {
    const preview = document.getElementById('musicCardPreview');
    
    // Generar reproductores para cada URL de audio
    let audioPlayersHTML = '';
    if (cardData.audioUrls && cardData.audioUrls.length > 0) {
        audioPlayersHTML = cardData.audioUrls.map((url, index) => {
            return generateAudioPlayer(url);
        }).join('');
    }
    
    // Foto de perfil (si existe)
    const profileImageHTML = cardData.profileImage ? `
        <div style="text-align: center; margin-bottom: 20px;">
            <img src="${escapeHtml(cardData.profileImage)}" 
                 alt="Foto de perfil" 
                 style="width: 120px; height: 120px; border-radius: 50%; object-fit: cover; border: 4px solid rgba(255,255,255,0.3); box-shadow: 0 4px 15px rgba(0,0,0,0.2);"
                 onerror="this.style.display='none'">
        </div>
    ` : '';
    
    // Redes sociales (solo mostrar las que tengan URL)
    const socialLinks = [];
    
    if (cardData.facebook) {
        socialLinks.push(`<a href="${escapeHtml(cardData.facebook)}" target="_blank" rel="noopener noreferrer" style="color: white; text-decoration: none; padding: 8px 15px; background: linear-gradient(135deg, #1877f2 0%, #0c63d4 100%); border-radius: 8px; display: inline-flex; align-items: center; gap: 6px; font-size: 14px; transition: transform 0.2s;" onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='translateY(0)'">📘 Meta</a>`);
    }
    
    if (cardData.twitter) {
        socialLinks.push(`<a href="${escapeHtml(cardData.twitter)}" target="_blank" rel="noopener noreferrer" style="color: white; text-decoration: none; padding: 8px 15px; background: linear-gradient(135deg, #000000 0%, #333333 100%); border-radius: 8px; display: inline-flex; align-items: center; gap: 6px; font-size: 14px; transition: transform 0.2s;" onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='translateY(0)'">✖️ X</a>`);
    }
    
    if (cardData.instagram) {
        socialLinks.push(`<a href="${escapeHtml(cardData.instagram)}" target="_blank" rel="noopener noreferrer" style="color: white; text-decoration: none; padding: 8px 15px; background: linear-gradient(135deg, #833ab4 0%, #fd1d1d 50%, #fcb045 100%); border-radius: 8px; display: inline-flex; align-items: center; gap: 6px; font-size: 14px; transition: transform 0.2s;" onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='translateY(0)'">📸 Instagram</a>`);
    }
    
    if (cardData.tiktok) {
        socialLinks.push(`<a href="${escapeHtml(cardData.tiktok)}" target="_blank" rel="noopener noreferrer" style="color: white; text-decoration: none; padding: 8px 15px; background: linear-gradient(135deg, #000000 0%, #ee1d52 100%); border-radius: 8px; display: inline-flex; align-items: center; gap: 6px; font-size: 14px; transition: transform 0.2s;" onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='translateY(0)'">🎵 TikTok</a>`);
    }
    
    if (cardData.youtube) {
        socialLinks.push(`<a href="${escapeHtml(cardData.youtube)}" target="_blank" rel="noopener noreferrer" style="color: white; text-decoration: none; padding: 8px 15px; background: linear-gradient(135deg, #ff0000 0%, #cc0000 100%); border-radius: 8px; display: inline-flex; align-items: center; gap: 6px; font-size: 14px; transition: transform 0.2s;" onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='translateY(0)'">▶️ YouTube</a>`);
    }
    
    const socialLinksHTML = socialLinks.length > 0 ? `
        <div style="display: flex; flex-wrap: wrap; gap: 10px; justify-content: center; margin-top: 20px; margin-bottom: 20px;">
            ${socialLinks.join('')}
        </div>
    ` : '';
    
    // Press Kit Section
    let pressKitHTML = '';
    const hasPressKit = cardData.bioExtended || cardData.genre || cardData.location || 
                       cardData.contactEmail || cardData.manager || cardData.contactPhone ||
                       cardData.awards || cardData.stats || cardData.pressLinks || 
                       cardData.promoPhotos || cardData.promoVideo || cardData.website;
    
    if (hasPressKit) {
        pressKitHTML = renderPressKitSection(cardData);
    }
    
    // Publicidad del desarrollador
    const devAd = injectDeveloperAd();
    
    preview.innerHTML = `
        <div class="music-card">
            ${profileImageHTML}
            <h2>${escapeHtml(cardData.songName)}</h2>
            <div class="artist">Por ${escapeHtml(cardData.artist)}</div>
            ${cardData.description ? `<div class="description">${escapeHtml(cardData.description)}</div>` : ''}
            
            ${socialLinksHTML}
            
            ${audioPlayersHTML}
            
            ${pressKitHTML}
            
            ${devAd}
            
            <div class="view-counter">
                👁️ Vistas: <strong id="viewCount">${viewCount.toLocaleString()}</strong>
            </div>
        </div>
    `;

    // Solo asignar currentAudio si es un reproductor HTML5 nativo
    currentAudio = document.getElementById('audioPlayer');
}

function generateCardUrl() {
    // Generar ID único para esta tarjeta
    const cardId = Date.now().toString(36) + Math.random().toString(36).substr(2);
    
    // Crear objeto compacto con todos los datos
    const compactData = {
        id: cardId,
        s: cardData.songName,
        a: cardData.artist,
        d: cardData.description || '',
        au: cardData.audioUrls || [],
        pi: cardData.profileImage || '',
        fb: cardData.facebook || '',
        tw: cardData.twitter || '',
        ig: cardData.instagram || '',
        tk: cardData.tiktok || '',
        yt: cardData.youtube || '',
        // Press Kit
        bio: cardData.bioExtended || '',
        gen: cardData.genre || '',
        loc: cardData.location || '',
        cem: cardData.contactEmail || '',
        mgr: cardData.manager || '',
        tel: cardData.contactPhone || '',
        awd: cardData.awards || '',
        st: cardData.stats || '',
        prl: cardData.pressLinks || '',
        pph: cardData.promoPhotos || '',
        pvid: cardData.promoVideo || '',
        web: cardData.website || ''
    };
    
    // Codificar en Base64 para URLs más cortas
    const jsonStr = JSON.stringify(compactData);
    const base64Data = btoa(encodeURIComponent(jsonStr));
    
    const url = window.location.href.split('?')[0] + '?view=card&data=' + base64Data;
    
    // Advertencia si la URL es muy larga
    if (url.length > 2000) {
        console.warn('⚠️ La URL generada es muy larga (' + url.length + ' caracteres).');
    }
    
    // Mostrar URL en el campo de compartir (si existe)
    const shareUrlField = document.getElementById('shareUrl');
    if (shareUrlField) {
        shareUrlField.value = url;
    }
    
    return url;
}

function loadCardFromUrl() {
    const params = new URLSearchParams(window.location.search);
    
    if (params.get('view') === 'card') {
        const base64Data = params.get('data');
        
        if (base64Data) {
            try {
                const jsonStr = decodeURIComponent(atob(base64Data));
                const data = JSON.parse(jsonStr);
                
                cardData = {
                    songName: data.s || 'Sin título',
                    artist: data.a || 'Artista desconocido',
                    description: data.d || '',
                    audioUrls: data.au || [],
                    profileImage: data.pi || '',
                    facebook: data.fb || '',
                    twitter: data.tw || '',
                    instagram: data.ig || '',
                    tiktok: data.tk || '',
                    youtube: data.yt || '',
                    bioExtended: data.bio || '',
                    genre: data.gen || '',
                    location: data.loc || '',
                    contactEmail: data.cem || '',
                    manager: data.mgr || '',
                    contactPhone: data.tel || '',
                    awards: data.awd || '',
                    stats: data.st || '',
                    pressLinks: data.prl || '',
                    promoPhotos: data.pph || '',
                    promoVideo: data.pvid || '',
                    website: data.web || ''
                };
                
                generateCard();
                incrementViewCount();
                
                // Ocultar formulario y mostrar tarjeta
                document.getElementById('formSection').classList.add('hidden');
                document.getElementById('cardResult').classList.remove('hidden');
                
            } catch (error) {
                console.error('Error al decodificar datos:', error);
            }
        }
    }
}

// Inicialización al cargar la página
window.addEventListener('DOMContentLoaded', () => {
    console.log('✅ DOM cargado - Inicializando aplicación...');
    
    loadCardFromUrl();
    initAdsSystem();
    updateRemoveButtons();
    
    // Manejo del formulario
    const songForm = document.getElementById('songForm');
    console.log('🔍 Formulario encontrado:', songForm);
    
    if (songForm) {
        console.log('✅ Formulario #songForm encontrado, agregando listener...');
        songForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('📝 Formulario enviado - Recopilando datos...');
            
            // Verificar que todos los elementos existan
            const elements = {
                songName: document.getElementById('songName'),
                artist: document.getElementById('artist'),
                description: document.getElementById('description')
            };
            
            console.log('🔍 Elementos del formulario:', elements);
            
            if (!elements.songName || !elements.artist) {
                console.error('❌ Faltan elementos del formulario:', elements);
                alert('Error: No se encontraron los campos del formulario. Por favor recarga la página.');
                return;
            }
            
            cardData = {
                songName: document.getElementById('songName').value,
                artist: document.getElementById('artist').value,
                description: document.getElementById('description').value,
                audioUrls: getAudioUrls(),
                profileImage: document.getElementById('profileImage').value,
                facebook: document.getElementById('facebook').value,
                twitter: document.getElementById('twitter').value,
                instagram: document.getElementById('instagram').value,
                tiktok: document.getElementById('tiktok').value,
                youtube: document.getElementById('youtube').value,
                // Press Kit
                bioExtended: document.getElementById('bioExtended').value,
                genre: document.getElementById('genre').value,
                location: document.getElementById('location').value,
                contactEmail: document.getElementById('contactEmail').value,
                manager: document.getElementById('manager').value,
                contactPhone: document.getElementById('contactPhone').value,
                awards: document.getElementById('awards').value,
                stats: document.getElementById('stats').value,
                pressLinks: document.getElementById('pressLinks').value,
                promoPhotos: document.getElementById('promoPhotos').value,
                promoVideo: document.getElementById('promoVideo').value,
                website: document.getElementById('website').value
            };

            console.log('📦 Datos recopilados:', cardData);

            try {
                generateCard();
                generateCardUrl(); // Primero generar URL
                generateQR();      // Luego generar QR con la URL
                
                document.getElementById('formSection').classList.add('hidden');
                document.getElementById('previewSection').classList.remove('hidden');
                
                showSuccess();
                console.log('✅ Tarjeta generada exitosamente');
            } catch (error) {
                console.error('❌ Error al generar tarjeta:', error);
                alert('Error: ' + error.message);
            }
        });
    } else {
        console.error('❌ No se encontró el formulario #songForm');
        alert('Error: No se pudo encontrar el formulario. Por favor recarga la página.');
    }
    
    console.log('✅ Inicialización completada');
});
