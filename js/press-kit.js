/**
 * press-kit.js - Gestión del Press Kit
 * Funciones para renderizar y gestionar campos dinámicos del Press Kit
 */

// Gestión de campos de audio múltiples
function addAudioLink() {
    const audioLinksContainer = document.getElementById('audioLinksContainer');
    const audioLinkCount = audioLinksContainer.children.length;
    
    const newAudioGroup = document.createElement('div');
    newAudioGroup.className = 'form-group audio-link-group';
    newAudioGroup.innerHTML = `
        <label for="audioUrl${audioLinkCount}">Enlace de Audio ${audioLinkCount + 1} (Spotify, YouTube, SoundCloud, etc.)</label>
        <div style="display: flex; gap: 10px;">
            <input type="url" 
                   id="audioUrl${audioLinkCount}" 
                   placeholder="https://open.spotify.com/track/..." 
                   style="flex: 1;">
            <button type="button" 
                    class="remove-audio-btn" 
                    onclick="removeAudioLink(this)" 
                    style="width: auto; background: #e74c3c; padding: 12px 20px;">
                ❌
            </button>
        </div>
    `;
    
    audioLinksContainer.appendChild(newAudioGroup);
    updateRemoveButtons();
}

function removeAudioLink(button) {
    const audioGroup = button.closest('.audio-link-group');
    audioGroup.remove();
    
    // Renumerar los campos restantes
    const audioGroups = document.querySelectorAll('.audio-link-group');
    audioGroups.forEach((group, index) => {
        const label = group.querySelector('label');
        const input = group.querySelector('input');
        label.setAttribute('for', `audioUrl${index}`);
        label.textContent = `Enlace de Audio ${index + 1} (Spotify, YouTube, SoundCloud, etc.)`;
        input.id = `audioUrl${index}`;
    });
    
    updateRemoveButtons();
}

function updateRemoveButtons() {
    const audioGroups = document.querySelectorAll('.audio-link-group');
    const removeButtons = document.querySelectorAll('.remove-audio-btn');
    
    // Ocultar botón de eliminar si solo hay un campo
    removeButtons.forEach(btn => {
        btn.style.display = audioGroups.length > 1 ? 'block' : 'none';
    });
}

function getAudioUrls() {
    const audioInputs = document.querySelectorAll('[id^="audioUrl"]');
    const urls = [];
    audioInputs.forEach(input => {
        if (input.value.trim() !== '') {
            urls.push(input.value.trim());
        }
    });
    return urls;
}

function renderPressKitSection(data) {
    let html = '';
    
    // Sección de metadatos del Press Kit
    const metadataFields = [];
    if (data.genre) metadataFields.push(`<strong>Género:</strong> ${escapeHtml(data.genre)}`);
    if (data.location) metadataFields.push(`<strong>Ubicación:</strong> ${escapeHtml(data.location)}`);
    if (data.manager) metadataFields.push(`<strong>Manager:</strong> ${escapeHtml(data.manager)}`);
    
    if (metadataFields.length > 0) {
        html += `
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 10px; margin: 20px 0; padding: 15px; background: rgba(255,255,255,0.1); border-radius: 10px;">
                ${metadataFields.map(field => `<div style="font-size: 0.9em;">${field}</div>`).join('')}
            </div>`;
    }
    
    // Biografía extendida
    if (data.bioExtended) {
        html += `
            <div style="margin: 20px 0;">
                <h3 style="margin-bottom: 10px; font-size: 1.2em;">📝 Biografía</h3>
                <p style="white-space: pre-wrap; line-height: 1.6; background: rgba(255,255,255,0.1); padding: 15px; border-radius: 10px;">
                    ${escapeHtml(data.bioExtended)}
                </p>
            </div>`;
    }
    
    // Premios
    if (data.awards) {
        html += `
            <div style="margin: 20px 0;">
                <h3 style="margin-bottom: 10px; font-size: 1.2em;">🏆 Premios y Reconocimientos</h3>
                <p style="white-space: pre-wrap; line-height: 1.6; background: rgba(255,255,255,0.1); padding: 15px; border-radius: 10px;">
                    ${escapeHtml(data.awards)}
                </p>
            </div>`;
    }
    
    // Estadísticas
    if (data.stats) {
        html += `
            <div style="margin: 20px 0;">
                <h3 style="margin-bottom: 10px; font-size: 1.2em;">📊 Estadísticas</h3>
                <p style="white-space: pre-wrap; line-height: 1.6; background: rgba(255,255,255,0.1); padding: 15px; border-radius: 10px;">
                    ${escapeHtml(data.stats)}
                </p>
            </div>`;
    }
    
    // Enlaces de prensa
    if (data.pressLinks) {
        const links = data.pressLinks.split('\n').filter(link => link.trim() !== '');
        if (links.length > 0) {
            html += `
                <div style="margin: 20px 0;">
                    <h3 style="margin-bottom: 10px; font-size: 1.2em;">📰 Enlaces de Prensa</h3>
                    <ul style="list-style: none; padding: 0;">
                        ${links.map(link => `
                            <li style="margin: 8px 0;">
                                <a href="${escapeHtml(link.trim())}" 
                                   target="_blank" 
                                   style="color: inherit; text-decoration: underline; word-break: break-all;">
                                    ${escapeHtml(link.trim())}
                                </a>
                            </li>
                        `).join('')}
                    </ul>
                </div>`;
        }
    }
    
    // Video promocional
    if (data.promoVideo) {
        html += `
            <div style="margin: 20px 0;">
                <h3 style="margin-bottom: 10px; font-size: 1.2em;">🎬 Video Promocional</h3>
                ${generateVideoPlayer(data.promoVideo)}
            </div>`;
    }
    
    // Fotos promocionales
    if (data.promoPhotos) {
        const photos = data.promoPhotos.split('\n').filter(photo => photo.trim() !== '');
        if (photos.length > 0) {
            html += `
                <div style="margin: 20px 0;">
                    <h3 style="margin-bottom: 10px; font-size: 1.2em;">📸 Fotos Promocionales</h3>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 10px; margin-top: 10px;">
                        ${photos.map(photo => `
                            <img src="${escapeHtml(photo.trim())}" 
                                 alt="Foto promocional" 
                                 style="width: 100%; height: 150px; object-fit: cover; border-radius: 10px; cursor: pointer;"
                                 onclick="window.open('${escapeHtml(photo.trim())}', '_blank')">
                        `).join('')}
                    </div>
                </div>`;
        }
    }
    
    // Información de contacto
    const contactFields = [];
    if (data.contactEmail) contactFields.push(`📧 <a href="mailto:${escapeHtml(data.contactEmail)}" style="color: inherit; text-decoration: underline;">${escapeHtml(data.contactEmail)}</a>`);
    if (data.contactPhone) contactFields.push(`📱 ${escapeHtml(data.contactPhone)}`);
    if (data.website) contactFields.push(`🌐 <a href="${escapeHtml(data.website)}" target="_blank" style="color: inherit; text-decoration: underline;">${escapeHtml(data.website)}</a>`);
    
    if (contactFields.length > 0) {
        html += `
            <div style="margin: 20px 0; padding: 15px; background: rgba(255,255,255,0.1); border-radius: 10px;">
                <h3 style="margin-bottom: 10px; font-size: 1.2em;">📞 Contacto</h3>
                <div style="display: flex; flex-direction: column; gap: 8px; font-size: 0.95em;">
                    ${contactFields.join('<br>')}
                </div>
            </div>`;
    }
    
    return html;
}
