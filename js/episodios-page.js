// Funciones para la página de episodios

document.addEventListener('DOMContentLoaded', function() {
    initializeEpisodesPage();
    setupFilters();
    setupSort();
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
            <img src="${episode.portada}" alt="${episode.titulo}" onerror="this.style.display='none'; this.parentElement.innerHTML+='🎬'">
        </div>
        <div class="episode-content">
            <h3 class="episode-title">${episode.titulo}</h3>
            <p class="episode-description">${episode.descripcion}</p>
            <div class="episode-date">${formatDate(episode.fecha)}</div>
            <div class="episode-views">👀 ${episode.views.toLocaleString()} visualizaciones</div>
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
    const modalTitle = document.getElementById('modalTitle');
    const videoFrame = document.getElementById('videoFrame');
    
    modalTitle.textContent = episode.titulo;
    videoFrame.src = episode.url;
    modal.style.display = 'block';
    
    // Incrementar contador de vistas
    incrementViews(episodeId);
    
    // Actualizar la tarjeta del episodio
    setTimeout(() => {
        loadAllEpisodes();
    }, 1000);
    
    // Prevenir scroll del body
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('videoModal');
    const videoFrame = document.getElementById('videoFrame');
    
    modal.style.display = 'none';
    videoFrame.src = '';
    
    // Restaurar scroll del body
    document.body.style.overflow = 'auto';
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

// Búsqueda en tiempo real (opcional)
function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const episodeCards = document.querySelectorAll('.episode-card');
            
            episodeCards.forEach(card => {
                const title = card.querySelector('.episode-title').textContent.toLowerCase();
                const description = card.querySelector('.episode-description').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || description.includes(searchTerm)) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    }
}

function updateCounters() {
    updateEpisodeCount();
    updateTotalViews();
}