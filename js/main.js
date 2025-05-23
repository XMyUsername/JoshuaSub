// Funciones principales para la página de inicio

document.addEventListener('DOMContentLoaded', function() {
    initializeHomePage();
    setupMobileNavigation();
});

function initializeHomePage() {
    loadFeaturedEpisodes();
    loadNewEpisodes();
    updateCounters();
}

function loadFeaturedEpisodes() {
    const container = document.getElementById('featuredEpisodes');
    if (!container) return;
    
    const featuredEpisodes = getFeaturedEpisodes();
    container.innerHTML = '';
    
    if (featuredEpisodes.length === 0) {
        container.innerHTML = '<p class="loading">No hay episodios destacados disponibles</p>';
        return;
    }
    
    featuredEpisodes.forEach(episode => {
        container.appendChild(createEpisodeCard(episode));
    });
}

function loadNewEpisodes() {
    const container = document.getElementById('newEpisodes');
    if (!container) return;
    
    const newEpisodes = getNewEpisodes();
    container.innerHTML = '';
    
    if (newEpisodes.length === 0) {
        container.innerHTML = '<p class="loading">No hay episodios nuevos disponibles</p>';
        return;
    }
    
    newEpisodes.forEach(episode => {
        container.appendChild(createEpisodeCard(episode));
    });
}

function createEpisodeCard(episode) {
    const card = document.createElement('div');
    card.className = 'episode-card';
    
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

function updateCounters() {
    updateEpisodeCount();
    updateTotalViews();
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
                <iframe src="${episode.url}" frameborder="0" allowfullscreen></iframe>
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
    
    // Incrementar contador de vistas
    incrementViews(episodeId);
    
    // Actualizar likes/dislikes
    updateLikesDisplay(episodeId);
    
    // Prevenir scroll del body
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('videoModal');
    modal.style.display = 'none';
    
    // Restaurar scroll del body
    document.body.style.overflow = 'auto';
    
    // Actualizar contadores en las tarjetas
    setTimeout(() => {
        loadFeaturedEpisodes();
        loadNewEpisodes();
    }, 500);
}

function setupMobileNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
        
        // Cerrar menú al hacer click en un enlace
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }
}

// Cerrar modal al hacer click fuera de él
window.addEventListener('click', function(event) {
    const modal = document.getElementById('videoModal');
    if (event.target === modal) {
        closeModal();
    }
});

// Cerrar modal con tecla Escape
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeModal();
    }
});

// Animaciones suaves al hacer scroll
window.addEventListener('scroll', function() {
    const elements = document.querySelectorAll('.episode-card');
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
});

// Inicializar animaciones
document.addEventListener('DOMContentLoaded', function() {
    const elements = document.querySelectorAll('.episode-card');
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
});