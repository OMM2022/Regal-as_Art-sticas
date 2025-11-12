/**
 * audio-player.js - Generadores de reproductores multimedia
 * Funciones para generar reproductores de audio y video de diferentes plataformas
 */

function extractSpotifyId(url) {
    // Soporta URLs con y sin /intl-XX/
    const match = url.match(/spotify\.com\/(?:intl-[a-z]{2}\/)?(track|album|playlist)\/([a-zA-Z0-9]+)/);
    return match ? { type: match[1], id: match[2] } : null;
}

function extractYouTubeId(url) {
    const patterns = [
        /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
        /youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/
    ];
    for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match) return match[1];
    }
    return null;
}

function generateAudioPlayer(url) {
    if (!url || url.trim() === '') return '';

    url = url.trim();

    // Spotify
    if (url.includes('spotify.com')) {
        const spotifyData = extractSpotifyId(url);
        if (spotifyData) {
            return `
                <div style="margin: 15px 0;">
                    <iframe style="border-radius:12px" 
                            src="https://open.spotify.com/embed/${spotifyData.type}/${spotifyData.id}" 
                            width="100%" 
                            height="152" 
                            frameBorder="0" 
                            allowfullscreen="" 
                            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                            loading="lazy">
                    </iframe>
                </div>`;
        }
    }

    // YouTube Music / YouTube
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
        const videoId = extractYouTubeId(url);
        if (videoId) {
            return `
                <div style="margin: 15px 0; position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;">
                    <iframe style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border-radius: 12px;" 
                            src="https://www.youtube.com/embed/${videoId}" 
                            frameborder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowfullscreen>
                    </iframe>
                </div>`;
        }
    }

    // SoundCloud
    if (url.includes('soundcloud.com')) {
        return `
            <div style="margin: 15px 0;">
                <iframe width="100%" 
                        height="166" 
                        scrolling="no" 
                        frameborder="no" 
                        allow="autoplay" 
                        src="https://w.soundcloud.com/player/?url=${encodeURIComponent(url)}&color=%23ff5500&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false">
                </iframe>
            </div>`;
    }

    // Apple Music
    if (url.includes('music.apple.com')) {
        return `
            <div style="margin: 15px 0;">
                <iframe allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write" 
                        frameborder="0" 
                        height="175" 
                        style="width:100%;max-width:660px;overflow:hidden;border-radius:10px;" 
                        sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation" 
                        src="${url.replace('/album/', '/embed/album/').replace('/playlist/', '/embed/playlist/')}">
                </iframe>
            </div>`;
    }

    // Deezer
    if (url.includes('deezer.com')) {
        const trackMatch = url.match(/track\/(\d+)/);
        const albumMatch = url.match(/album\/(\d+)/);
        const playlistMatch = url.match(/playlist\/(\d+)/);
        
        if (trackMatch) {
            return `
                <div style="margin: 15px 0;">
                    <iframe src="https://widget.deezer.com/widget/dark/track/${trackMatch[1]}" 
                            width="100%" 
                            height="92" 
                            frameborder="0" 
                            allowtransparency="true" 
                            allow="encrypted-media; clipboard-write">
                    </iframe>
                </div>`;
        }
        if (albumMatch || playlistMatch) {
            const id = albumMatch ? albumMatch[1] : playlistMatch[1];
            const type = albumMatch ? 'album' : 'playlist';
            return `
                <div style="margin: 15px 0;">
                    <iframe src="https://widget.deezer.com/widget/dark/${type}/${id}" 
                            width="100%" 
                            height="300" 
                            frameborder="0" 
                            allowtransparency="true" 
                            allow="encrypted-media; clipboard-write">
                    </iframe>
                </div>`;
        }
    }

    // Tidal
    if (url.includes('tidal.com')) {
        return `
            <div style="margin: 15px 0; text-align: center;">
                <a href="${escapeHtml(url)}" 
                   target="_blank" 
                   style="display: inline-block; padding: 15px 30px; background: #000; color: #fff; text-decoration: none; border-radius: 25px; font-weight: bold;">
                    ▶ Escuchar en TIDAL
                </a>
            </div>`;
    }

    // Bandcamp
    if (url.includes('bandcamp.com')) {
        return `
            <div style="margin: 15px 0;">
                <iframe style="border: 0; width: 100%; height: 120px;" 
                        src="${url}" 
                        seamless>
                </iframe>
            </div>`;
    }

    // Audio nativo (MP3, WAV, OGG)
    if (url.match(/\.(mp3|wav|ogg|m4a)$/i)) {
        return `
            <div style="margin: 15px 0;">
                <audio controls style="width: 100%; border-radius: 10px;">
                    <source src="${escapeHtml(url)}" type="audio/mpeg">
                    Tu navegador no soporta el elemento de audio.
                </audio>
            </div>`;
    }

    // Enlace genérico si no coincide con ninguna plataforma
    return `
        <div style="margin: 15px 0; text-align: center;">
            <a href="${escapeHtml(url)}" 
               target="_blank" 
               style="display: inline-block; padding: 15px 30px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; text-decoration: none; border-radius: 25px; font-weight: bold;">
                🎵 Escuchar Audio
            </a>
        </div>`;
}

function generateVideoPlayer(url) {
    if (!url || url.trim() === '') return '';

    url = url.trim();

    // YouTube
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
        const videoId = extractYouTubeId(url);
        if (videoId) {
            return `
                <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; margin: 15px 0;">
                    <iframe style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border-radius: 12px;" 
                            src="https://www.youtube.com/embed/${videoId}" 
                            frameborder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowfullscreen>
                    </iframe>
                </div>`;
        }
    }

    // Vimeo
    if (url.includes('vimeo.com')) {
        const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
        if (vimeoMatch) {
            return `
                <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; margin: 15px 0;">
                    <iframe style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border-radius: 12px;" 
                            src="https://player.vimeo.com/video/${vimeoMatch[1]}" 
                            frameborder="0" 
                            allow="autoplay; fullscreen; picture-in-picture" 
                            allowfullscreen>
                    </iframe>
                </div>`;
        }
    }

    // Video nativo (MP4, WebM, OGV)
    if (url.match(/\.(mp4|webm|ogv)$/i)) {
        return `
            <div style="margin: 15px 0;">
                <video controls style="width: 100%; max-width: 100%; border-radius: 12px;">
                    <source src="${escapeHtml(url)}" type="video/mp4">
                    Tu navegador no soporta el elemento de video.
                </video>
            </div>`;
    }

    // Enlace genérico si no coincide con ninguna plataforma
    return `
        <div style="margin: 15px 0; text-align: center;">
            <a href="${escapeHtml(url)}" 
               target="_blank" 
               style="display: inline-block; padding: 15px 30px; background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; text-decoration: none; border-radius: 25px; font-weight: bold;">
                🎬 Ver Video
            </a>
        </div>`;
}
