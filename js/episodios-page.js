// Funciones para la página de episodios

document.addEventListener('DOMContentLoaded', function() {
    initializeEpisodesPage();
    setupFilters();
    setupSort();
    setupBottomNavigation();
});

let currentFilter = 'all';
let currentSort = 'newest';
let currentListaIndex = null; // Nueva variable para rastrear la lista actual

const EPISODES_PER_LIST = 6; // Constante para episodios por lista

function initializeEpisodesPage() {
    loadEpisodesByLists();
    setupListaNavigation();
    updateCounters();
}

// 🆕 Nueva función para organizar episodios en listas
function organizeEpisodesIntoLists(episodes) {
    const lists = [];
    for (let i = 0; i < episodes.length; i += EPISODES_PER_LIST) {
        lists.push(episodes.slice(i, i + EPISODES_PER_LIST));
    }
    return lists;
}

// 🆕 Nueva función para cargar episodios organizados en listas
function loadEpisodesByLists() {
    const container = document.getElementById('episodesContainer');
    if (!container) return;
    
    let episodes = getAllEpisodes();
    
    // Aplicar filtro
    episodes = filterEpisodes(episodes, currentFilter);
    
    // Aplicar ordenamiento
    episodes = sortEpisodes(episodes, currentSort);
    
    // Organizar en listas
    const episodeLists = organizeEpisodesIntoLists(episodes);
    
    container.innerHTML = '';
    
    if (episodeLists.length === 0) {
        container.innerHTML = '<p class="loading">No se encontraron episodios con los filtros seleccionados</p>';
        return;
    }
    
    // Si se seleccionó una lista específica, mostrar solo esa
    if (currentListaIndex !== null && episodeLists[currentListaIndex]) {
        renderSingleList(episodeLists[currentListaIndex], currentListaIndex + 1, container);
    } else {
        // Mostrar todas las listas
        episodeLists.forEach((list, index) => {
            renderSingleList(list, index + 1, container);
        });
    }
    
    // Actualizar navegación de listas
    updateListaNavigation(episodeLists.length);
}

// 🆕 Nueva función para renderizar una lista individual
function renderSingleList(episodeList, listNumber, container) {
    const listContainer = document.createElement('div');
    listContainer.className = 'episode-list-container';
    listContainer.id = `lista-${listNumber}`;
    
    const listHeader = document.createElement('div');
    listHeader.className = 'list-header';
    listHeader.innerHTML = `
        <h2 class="list-title">
            <span class="list-icon">📋</span>
            Lista ${listNumber}
            <span class="episode-count">(${episodeList.length} episodios)</span>
        </h2>
        <button class="list-toggle-btn" onclick="toggleList(${listNumber})" data-list="${listNumber}">
            <i class="fas fa-chevron-down"></i>
        </button>
    `;
    
    const episodesGrid = document.createElement('div');
    episodesGrid.className = 'episodes-grid';
    episodesGrid.id = `episodes-grid-${listNumber}`;
    
    episodeList.forEach(episode => {
        episodesGrid.appendChild(createEpisodeCard(episode));
    });
    
    listContainer.appendChild(listHeader);
    listContainer.appendChild(episodesGrid);
    container.appendChild(listContainer);
    
    // Activar animaciones
    setTimeout(() => {
        episodesGrid.querySelectorAll('.episode-card').forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }, 100);
}

// 🆕 Nueva función para configurar la navegación de listas
function setupListaNavigation() {
    // Esta función se llama desde updateListaNavigation
}

// 🆕 Nueva función para actualizar la navegación de listas
function updateListaNavigation(totalLists) {
    const listaButtons = document.getElementById('listaButtons');
    if (!listaButtons) return;
    
    listaButtons.innerHTML = '';
    
    // Botón para mostrar todas las listas
    const allButton = document.createElement('button');
    allButton.className = `lista-btn ${currentListaIndex === null ? 'active' : ''}`;
    allButton.innerHTML = '<i class="fas fa-list"></i> Todas las Listas';
    allButton.onclick = () => showAllLists();
    listaButtons.appendChild(allButton);
    
    // Botones para cada lista individual
    for (let i = 0; i < totalLists; i++) {
        const button = document.createElement('button');
        button.className = `lista-btn ${currentListaIndex === i ? 'active' : ''}`;
        button.innerHTML = `<i class="fas fa-folder"></i> Lista ${i + 1}`;
        button.onclick = () => showSpecificList(i);
        listaButtons.appendChild(button);
    }
}

// 🆕 Nueva función para mostrar todas las listas
function showAllLists() {
    currentListaIndex = null;
    loadEpisodesByLists();
    
    // Actualizar botones activos
    document.querySelectorAll('.lista-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector('.lista-btn').classList.add('active');
}

// 🆕 Nueva función para mostrar una lista específica
function showSpecificList(index) {
    currentListaIndex = index;
    loadEpisodesByLists();
    
    // Actualizar botones activos
    document.querySelectorAll('.lista-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.lista-btn')[index + 1].classList.add('active');
    
    // Scroll suave hacia la lista
    setTimeout(() => {
        const listElement = document.getElementById(`lista-${index + 1}`);
        if (listElement) {
            listElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, 300);
}

// 🆕 Nueva función para colapsar/expandir listas
function toggleList(listNumber) {
    const grid = document.getElementById(`episodes-grid-${listNumber}`);
    const toggleBtn = document.querySelector(`[data-list="${listNumber}"]`);
    
    if (grid && toggleBtn) {
        const isCollapsed = grid.style.display === 'none';
        
        if (isCollapsed) {
            grid.style.display = 'grid';
            toggleBtn.querySelector('i').className = 'fas fa-chevron-down';
            toggleBtn.setAttribute('title', 'Colapsar lista');
        } else {
            grid.style.display = 'none';
            toggleBtn.querySelector('i').className = 'fas fa-chevron-right';
            toggleBtn.setAttribute('title', 'Expandir lista');
        }
    }
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
            
            // Resetear lista actual al cambiar filtro
            currentListaIndex = null;
            
            // Recargar episodios
            loadEpisodesByLists();
        });
    });
}

function setupSort() {
    const sortSelect = document.getElementById('sortSelect');
    
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            currentSort = this.value;
            
            // Resetear lista actual al cambiar ordenamiento
            currentListaIndex = null;
            
            loadEpisodesByLists();
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
        loadEpisodesByLists();
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

function updateCounters() {
    updateEpisodeCount();
    updateTotalViews();
}
