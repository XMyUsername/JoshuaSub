// Funciones para la página de episodios

document.addEventListener('DOMContentLoaded', function() {
    initializeEpisodesPage();
    setupFilters();
    setupSort();
    setupBottomNavigation(); // Agregar esta línea
});

let currentFilter = 'all';
let currentSort = 'newest';

function initializeEpisodesPage() {
    loadAllEpisodes();
    updateCounters();
}

function loadAllEpisodes() {
    const container = document.getElementById('allEpisodes');
    if (!container) return;
    
    let episodes = getAllEpisodes();
    
    // Aplicar filtro
    episodes = filterEpisodes(episodes, currentFilter);
    
    // Aplicar ordenamiento
    episodes = sortEpisodes(episodes, currentSort);
    
    container.innerHTML = '';
    
    if (episodes.length === 0) {
        container.innerHTML = '<p class="loading">No se encontraron episodios con los filtros seleccionados</p>';
        return;
    }
    
    episodes.forEach(episode => {
        container.appendChild(createEpisodeCard(episode));
    });
    
    // Activar animaciones
    setTimeout(() => {
        container.querySelectorAll('.episode-card').forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }, 100);
}

function filterEpisodes(episodes, filter) {
    switch (filter) {
        case 'destacado':
            return episodes.filter(ep => ep.destacado);
        case 'nuevo':
            return episodes.filter(ep => isNewEpisode(ep.fecha));
        default:
            return episodes;
    }
}

function sortEpisodes(episodes, sort) {
    switch (sort) {
        case 'oldest':
            return [...episodes].sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
        case 'title':
            return [...episodes].sort((a, b) => a.titulo.localeCompare(b.titulo));
        case 'newest':
        default:
            return [...episodes].sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
    }
}

function setupFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remover clase active de todos los botones
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Agregar clase active al botón clickeado
            this.classList.add('active');
            
            // Actualizar filtro actual
            currentFilter = this.dataset.filter;
            
            // Recargar episodios
            loadAllEpisodes();
        });
    });
}

function setupSort() {
    const sortSelect = document.getElementById('sortSelect');
    
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            currentSort = this.value;
            loadAllEpisodes();
        });
    }
}

function createEpisodeCard(episode) {
    const card = document.createElement('div');
    card.className = 'episode-card';
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    
    const isNew = isNewEpisode(episode.fecha);
    let badgeHTML = '';
    
    if (episode.destacado) {
        badgeHTML = '<div class="episode-badge badge-featured">⭐ Destacado</div>';
    } else if (isNew) {
        badgeHTML = '<div class="episode-badge badge-new">🆕 Nuevo</div>';
    }
    
    card.innerHTML = `
        <div class="episode-image">
            ${badgeHTML}
            <img src="${episode.portada}" alt="${episode.titulo}" onerror="this.style.display='none';">
        </div>
        <div class="episode-content">
            <h3 class="episode-title">${episode.titulo}</h3>
            <p class="episode-description">${episode.descripcion}</p>
            <div class="episode-meta">
                <div class="episode-date">${formatDate(episode.fecha)}</div>
                <div class="episode-views">👀 ${episode.views.toLocaleString()}</div>
            </div>
            <button class="play-btn" onclick="openEpisodeModal(${episode.id})">
                <i class="fas fa-play"></i> Ver Episodio
            </button>
        </div>
    `;
    
    return card;
}

function openEpisodeModal(episodeId) {
    const episode = getEpisodeById(episodeId);
    if (!episode) return;
    
    const modal = document.getElementById('videoModal');
    const modalContent = modal.querySelector('.modal-content');
    
    // Crear contenido del modal estilo YouTube
    modalContent.innerHTML = `
        <div class="modal-header">
            <h3>${episode.titulo}</h3>
            <button class="close-btn" onclick="closeModal()">
                <i class="fas fa-times"></i>
            </button>
        </div>
        <div class="modal-body">
            <div class="video-container">
                <iframe id="videoFrame" src="${episode.url}?autoplay=1" frameborder="0" allowfullscreen allow="autoplay"></iframe>
            </div>
            <div class="video-info">
                <h2 class="video-title">${episode.titulo}</h2>
                <div class="video-stats">
                    <div class="video-views" id="modalViews" data-episode-id="${episode.id}">
                        ${episode.views.toLocaleString()} visualizaciones • ${formatDate(episode.fecha)}
                    </div>
                    <div class="video-actions">
                        <button class="action-btn like-btn" id="likeBtn" onclick="toggleLike(${episode.id})">
                            <i class="fas fa-thumbs-up"></i>
                            <span id="likeCount">0</span>
                        </button>
                        <button class="action-btn dislike-btn" id="dislikeBtn" onclick="toggleDislike(${episode.id})">
                            <i class="fas fa-thumbs-down"></i>
                            <span id="dislikeCount">0</span>
                        </button>
                        <button class="action-btn share-btn" onclick="shareEpisode(${episode.id})">
                            <i class="fas fa-share"></i>
                            Compartir
                        </button>
                    </div>
                </div>
                <div class="video-description">
                    <h4>Descripción</h4>
                    <p>${episode.descripcion}</p>
                </div>
            </div>
        </div>
    `;
    
    modal.style.display = 'block';
    document.body.classList.add('modal-open');
    
    // Incrementar contador de vistas
    incrementViews(episodeId);
    
    // Actualizar likes/dislikes
    updateLikesDisplay(episodeId);
    
    // Prevenir scroll del body
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('videoModal');
    const videoFrame = document.getElementById('videoFrame');
    
    // Detener completamente el video
    if (videoFrame) {
        videoFrame.src = 'about:blank';
        
        setTimeout(() => {
            const videoContainer = videoFrame.parentElement;
            if (videoContainer) {
                videoContainer.innerHTML = '<div style="height: 100%; background: #000; display: flex; align-items: center; justify-content: center; color: white; font-size: 1.2rem;">Video detenido</div>';
            }
        }, 100);
    }
    
    modal.style.display = 'none';
    document.body.classList.remove('modal-open');
    
    // Restaurar scroll del body
    document.body.style.overflow = 'auto';
    
    // Actualizar contadores en las tarjetas
    setTimeout(() => {
        loadAllEpisodes();
    }, 500);
}

// Event listeners para cerrar modal
window.addEventListener('click', function(event) {
    const modal = document.getElementById('videoModal');
    if (event.target === modal) {
        closeModal();
    }
});

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeModal();
    }
});

// 🔥 NUEVA FUNCIÓN: Detener video si el usuario navega o recarga
window.addEventListener('beforeunload', function() {
    const videoFrame = document.getElementById('videoFrame');
    if (videoFrame) {
        videoFrame.src = 'about:blank';
    }
});

// 🔥 NUEVA FUNCIÓN: Detener video si se pierde el foco de la página
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        const modal = document.getElementById('videoModal');
        if (modal && modal.style.display === 'block') {
            // Pausar el video cuando la página no está visible
            const videoFrame = document.getElementById('videoFrame');
            if (videoFrame && videoFrame.src !== 'about:blank') {
                // Enviar mensaje de pausa al iframe (funciona con algunos reproductores)
                try {
                    videoFrame.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
                } catch (e) {
                    // Si no funciona, no pasa nada
                }
            }
        }
    }
});

function updateCounters() {
    updateEpisodeCount();
    updateTotalViews();
}
