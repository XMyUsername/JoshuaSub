// Funciones principales para la página de inicio

document.addEventListener('DOMContentLoaded', function() {
    initializeHomePage();
    setupBottomNavigation(); // Nueva función
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
        loadFeaturedEpisodes();
        loadNewEpisodes();
    }, 500);
}

// ========================================
// 📱 NUEVA NAVEGACIÓN BOTTOM
// ========================================

function setupBottomNavigation() {
    const bottomNavItems = document.querySelectorAll('.bottom-nav-item');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // Establecer página activa
    bottomNavItems.forEach(item => {
        item.classList.remove('active');
        const href = item.getAttribute('href');
        
        if (href === currentPage || 
            (currentPage === '' && href === 'index.html') ||
            (currentPage === 'index.html' && href === 'index.html')) {
            item.classList.add('active');
        }
    });
    
    // Agregar efectos de tap
    bottomNavItems.forEach(item => {
        item.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.95)';
        });
        
        item.addEventListener('touchend', function() {
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
    
    console.log('📱 Bottom Navigation inicializada');
}

// ========================================
// 🔄 FUNCIONES DE ACTUALIZACIÓN
// ========================================

function initializeRefreshSystem() {
    updateLastUpdateTime();
    console.log('✅ Sistema de actualización inicializado');
}

function hardRefresh() {
    return new Promise((resolve) => {
        // Limpiar Service Workers
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.getRegistrations().then(function(registrations) {
                for(let registration of registrations) {
                    registration.unregister();
                }
            });
        }
        
        // Limpiar caché del navegador
        if ('caches' in window) {
            caches.keys().then(function(names) {
                for (let name of names) {
                    caches.delete(name);
                }
            });
        }
        
        // Agregar timestamp para evitar caché
        const url = new URL(window.location);
        url.searchParams.set('_refresh', Date.now());
        
        setTimeout(() => {
            window.location.replace(url.toString());
        }, 500);
        
        resolve();
    });
}

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
    
    setTimeout(() => {
        hardRefresh();
    }, 1000);
}

function smartRefresh() {
    const button = event.target.closest('.hero-refresh-btn, .refresh-nav-btn');
    if (button) {
        button.classList.add('loading');
    }
    
    showToast('🔍 Buscando nuevos episodios...', 'info');
    
    setTimeout(() => {
        hardRefresh();
    }, 2000);
}

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
    
    setTimeout(() => {
        hardRefresh();
    }, 1500);
}

function forceRefresh() {
    showGlobalLoader();
    showToast('💪 Forzando actualización completa...', 'info');
    
    localStorage.clear();
    sessionStorage.clear();
    
    document.cookie.split(";").forEach(function(c) { 
        document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); 
    });
    
    setTimeout(() => {
        hardRefresh();
    }, 2000);
}

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

function showToast(message, type = 'info') {
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
    
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);
    
    const progressBar = toast.querySelector('.toast-progress');
    if (progressBar) {
        progressBar.style.width = '100%';
        progressBar.style.transition = 'width 3s linear';
        setTimeout(() => {
            progressBar.style.width = '0%';
        }, 100);
    }
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            if (document.body.contains(toast)) {
                document.body.removeChild(toast);
            }
        }, 300);
    }, 3000);
}

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
    
    const progressBar = loader.querySelector('.loader-progress-bar');
    if (progressBar) {
        setTimeout(() => {
            progressBar.style.width = '100%';
        }, 100);
    }
}

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

function loadNewEpisodes() {
    const container = document.getElementById('newEpisodes');
    if (!container) return;
    
    const newEpisodes = getNewEpisodes(); // Solo 5 episodios nuevos
    container.innerHTML = '';
    
    if (newEpisodes.length === 0) {
        container.innerHTML = '<p class="loading">No hay episodios nuevos disponibles</p>';
        return;
    }
    
    newEpisodes.forEach(episode => {
        container.appendChild(createNewEpisodeCard(episode));
    });
}

function createNewEpisodeCard(episode) {
    const card = document.createElement('div');
    const isAvailable = isEpisodeAvailable(episode);
    const timeLeft = getTimeUntilAvailable(episode);
    const releaseInfo = formatReleaseDate(episode);
    
    // Determinar clases CSS
    let cardClasses = 'episode-card';
    if (!isAvailable) {
        cardClasses += ' not-available';
    } else if (episode.esNuevo) {
        // Verificar si se liberó recientemente (últimas 24 horas)
        const releaseDate = new Date(episode.fechaDisponible || episode.fecha);
        const now = new Date();
        const timeSinceRelease = now - releaseDate;
        const hoursAgo = timeSinceRelease / (1000 * 60 * 60);
        
        if (hoursAgo <= 24) {
            cardClasses += ' just-released';
        }
    }
    
    card.className = cardClasses;
    card.setAttribute('data-episode-id', episode.id);
    
    // Determinar badge
    let badgeHTML = '';
    if (!isAvailable) {
        badgeHTML = '<div class="episode-badge badge-coming-soon">⏰ Próximamente</div>';
    } else if (episode.esNuevo) {
        badgeHTML = '<div class="episode-badge badge-available-new">🆕 ¡Nuevo!</div>';
    } else if (episode.destacado) {
        badgeHTML = '<div class="episode-badge badge-featured">⭐ Destacado</div>';
    }
    
    // Crear overlay de countdown si no está disponible
    let countdownHTML = '';
    if (!isAvailable && timeLeft) {
        let countdownText = '';
        if (timeLeft.days > 0) {
            countdownText = `${timeLeft.days}d ${timeLeft.hours}h ${timeLeft.minutes}m`;
        } else if (timeLeft.hours > 0) {
            countdownText = `${timeLeft.hours}h ${timeLeft.minutes}m ${timeLeft.seconds}s`;
        } else {
            countdownText = `${timeLeft.minutes}m ${timeLeft.seconds}s`;
        }
        
        countdownHTML = `
            <div class="countdown-overlay">
                <div class="countdown-icon">⏰</div>
                <div class="countdown-title">Disponible en:</div>
                <div class="countdown-time" data-time="${countdownText}">${countdownText}</div>
                <div class="release-info">
                    Estreno: ${releaseInfo ? releaseInfo.full : 'Próximamente'}
                </div>
                <button class="coming-soon-btn" disabled>
                    <i class="fas fa-clock"></i> Próximamente
                </button>
            </div>
        `;
    }
    
    card.innerHTML = `
        <div class="episode-image">
            ${badgeHTML}
            <img src="${episode.portada}" alt="${episode.titulo}" onerror="this.style.display='none';">
            ${countdownHTML}
        </div>
        <div class="episode-content">
            <h3 class="episode-title">${episode.titulo}</h3>
            <p class="episode-description">${episode.descripcion}</p>
            <div class="episode-meta">
                <div class="episode-date">${formatDate(episode.fecha)}</div>
                <div class="episode-views">👀 ${episode.views.toLocaleString()}</div>
            </div>
            <button class="play-btn" onclick="${isAvailable ? `openEpisodeModal(${episode.id})` : 'showNotAvailableMessage()'}" ${!isAvailable ? 'disabled' : ''}>
                <i class="fas fa-${isAvailable ? 'play' : 'lock'}"></i> 
                ${isAvailable ? 'Ver Episodio' : 'No Disponible'}
            </button>
        </div>
    `;
    
    return card;
}

function showNotAvailableMessage() {
    showToast('⏰ Este episodio estará disponible pronto. ¡Mantente atento!', 'info');
}
