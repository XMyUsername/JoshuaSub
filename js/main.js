// Funciones principales para la página de inicio

document.addEventListener('DOMContentLoaded', function() {
    initializeHomePage();
    setupMobileNavigation();
    initializeRefreshSystem();
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
    updateLastUpdateTime();
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
    
    // 🔥 SOLUCIÓN: Detener completamente el video
    if (videoFrame) {
        // Método 1: Eliminar completamente el src
        videoFrame.src = 'about:blank';
        
        // Método 2: Como respaldo, también remover el iframe
        setTimeout(() => {
            const videoContainer = videoFrame.parentElement;
            if (videoContainer) {
                videoContainer.innerHTML = '<div style="height: 100%; background: #000; display: flex; align-items: center; justify-content: center; color: white; font-size: 1.2rem;">Video detenido</div>';
            }
        }, 100);
    }
    
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
    const body = document.body;
    
    if (hamburger && navMenu) {
        // Click en hamburger
        hamburger.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            console.log('🍔 Hamburger clicked'); // Para debug
            
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Prevenir scroll cuando el menú está abierto
            if (navMenu.classList.contains('active')) {
                body.style.overflow = 'hidden';
                body.style.position = 'fixed';
                body.style.width = '100%';
            } else {
                body.style.overflow = '';
                body.style.position = '';
                body.style.width = '';
            }
        });
        
        // Cerrar menú al hacer click en un enlace
        document.querySelectorAll('.nav-link, .refresh-btn').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
                body.style.overflow = '';
                body.style.position = '';
                body.style.width = '';
            });
        });
        
        // Cerrar menú al hacer click fuera (solo en el overlay)
        navMenu.addEventListener('click', function(e) {
            if (e.target === navMenu) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
                body.style.overflow = '';
                body.style.position = '';
                body.style.width = '';
            }
        });
        
        // Cerrar con tecla Escape
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
                body.style.overflow = '';
                body.style.position = '';
                body.style.width = '';
            }
        });
        
        // Manejar cambio de orientación
        window.addEventListener('orientationchange', function() {
            setTimeout(() => {
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    hamburger.classList.remove('active');
                    body.style.overflow = '';
                    body.style.position = '';
                    body.style.width = '';
                }
            }, 100);
        });
    }
}

// ========================================
// 🔄 FUNCIONES DE ACTUALIZACIÓN MEJORADAS
// ========================================

function initializeRefreshSystem() {
    updateLastUpdateTime();
    console.log('✅ Sistema de actualización inicializado');
}

// 🔄 Función para hacer hard refresh como CTRL+F5
function hardRefresh() {
    return new Promise((resolve) => {
        // Método 1: Limpiar Service Workers
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.getRegistrations().then(function(registrations) {
                for(let registration of registrations) {
                    registration.unregister();
                }
            });
        }
        
        // Método 2: Limpiar caché del navegador
        if ('caches' in window) {
            caches.keys().then(function(names) {
                for (let name of names) {
                    caches.delete(name);
                }
            });
        }
        
        // Método 3: Agregar timestamp para evitar caché
        const url = new URL(window.location);
        url.searchParams.set('_refresh', Date.now());
        
        // Método 4: Usar location.replace con parámetros anti-caché
        setTimeout(() => {
            window.location.replace(url.toString());
        }, 500);
        
        resolve();
    });
}

// 🔄 Refrescar página completa (navbar) - CTRL+F5 style
function refreshPage() {
    const button = event.target.closest('.refresh-btn');
    if (button) {
        button.classList.add('loading');
        const icon = button.querySelector('i');
        if (icon) {
            icon.style.animation = 'spin 1s linear infinite';
        }
    }
    
    showToast('🔄 Actualizando página completa...', 'info');
    
    // Hard refresh después de mostrar el mensaje
    setTimeout(() => {
        hardRefresh();
    }, 1000);
}

// 🎯 Refrescar inteligente (hero button) - CTRL+F5 style
function smartRefresh() {
    const button = event.target.closest('.hero-refresh-btn');
    if (button) {
        button.classList.add('loading');
    }
    
    showToast('🔍 Buscando nuevos episodios...', 'info');
    
    // Hard refresh para obtener la versión más reciente
    setTimeout(() => {
        hardRefresh();
    }, 2000);
}

// ⚡ Refrescar sección específica - CTRL+F5 style
function refreshSection(sectionType) {
    const button = event.target.closest('.section-refresh-btn');
    if (button) {
        button.classList.add('loading');
        const icon = button.querySelector('i');
        if (icon) {
            icon.style.animation = 'spin 1s linear infinite';
        }
    }
    
    showToast(`🔄 Actualizando ${sectionType === 'featured' ? 'destacados' : 'nuevos episodios'}...`, 'info');
    
    // Para secciones también hacemos hard refresh
    setTimeout(() => {
        hardRefresh();
    }, 1500);
}

// 💪 Forzar actualización completa - MEGA CTRL+F5
function forceRefresh() {
    showGlobalLoader();
    showToast('💪 Forzando actualización completa...', 'info');
    
    // Limpiar TODO el almacenamiento local
    localStorage.clear();
    sessionStorage.clear();
    
    // Limpiar cookies (si es posible)
    document.cookie.split(";").forEach(function(c) { 
        document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); 
    });
    
    setTimeout(() => {
        hardRefresh();
    }, 2000);
}

// 🕒 Actualizar tiempo de última actualización
function updateLastUpdateTime() {
    const lastUpdateElement = document.getElementById('lastUpdate');
    if (lastUpdateElement) {
        const now = new Date();
        const timeString = now.toLocaleString('es-ES', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
        lastUpdateElement.textContent = timeString;
        localStorage.setItem('lastUpdateTime', now.getTime().toString());
    }
}

// 🔔 Mostrar notificación toast mejorada
function showToast(message, type = 'info') {
    // Remover toast anterior si existe
    const existingToast = document.querySelector('.refresh-toast');
    if (existingToast) {
        document.body.removeChild(existingToast);
    }
    
    const toast = document.createElement('div');
    toast.className = `refresh-toast ${type}`;
    
    let icon = '🔄';
    if (type === 'success') icon = '✅';
    if (type === 'error') icon = '❌';
    if (type === 'info') icon = 'ℹ️';
    
    toast.innerHTML = `
        <span class="toast-icon">${icon}</span>
        <span class="toast-message">${message}</span>
        <div class="toast-progress"></div>
    `;
    
    document.body.appendChild(toast);
    
    // Mostrar toast
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);
    
    // Barra de progreso
    const progressBar = toast.querySelector('.toast-progress');
    if (progressBar) {
        progressBar.style.width = '100%';
        progressBar.style.transition = 'width 3s linear';
        setTimeout(() => {
            progressBar.style.width = '0%';
        }, 100);
    }
    
    // Ocultar después de 3 segundos
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            if (document.body.contains(toast)) {
                document.body.removeChild(toast);
            }
        }, 300);
    }, 3000);
}

// 🌀 Mostrar loader global mejorado
function showGlobalLoader() {
    const loader = document.createElement('div');
    loader.id = 'globalLoader';
    loader.innerHTML = `
        <div class="global-loader-content">
            <div class="loader-spinner"></div>
            <p>🔄 Actualizando episodios...</p>
            <small>Esto puede tardar unos segundos</small>
            <div class="loader-progress">
                <div class="loader-progress-bar"></div>
            </div>
        </div>
    `;
    
    document.body.appendChild(loader);
    
    // Animar barra de progreso
    const progressBar = loader.querySelector('.loader-progress-bar');
    if (progressBar) {
        setTimeout(() => {
            progressBar.style.width = '100%';
        }, 100);
    }
}

// 📱 Cerrar notificación
function closeNotification() {
    const notification = document.getElementById('updateNotification');
    if (notification) {
        notification.classList.add('hidden');
    }
}

// Event listeners
window.addEventListener('click', function(event) {
    const modal = document.getElementById('videoModal');
    if (event.target === modal) {
        closeModal();
    }
});

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeModal();
        
        // También cerrar menú móvil si está abierto
        const navMenu = document.querySelector('.nav-menu');
        const hamburger = document.querySelector('.hamburger');
        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }
});

window.addEventListener('beforeunload', function() {
    const videoFrame = document.getElementById('videoFrame');
    if (videoFrame) {
        videoFrame.src = 'about:blank';
    }
});

// Animaciones
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

document.addEventListener('DOMContentLoaded', function() {
    const elements = document.querySelectorAll('.episode-card');
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
});
