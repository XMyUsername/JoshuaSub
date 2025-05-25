/* ========================================
   🎬 VIDEO PLAYER CONTROLLER - VERSION LIMPIA
   ======================================== */

class VideoPlayer {
    constructor() {
        this.currentEpisode = null;
        this.episodesList = [];
        this.currentIndex = 0;
        this.init();
    }

    init() {
        this.loadEpisodeFromURL();
        this.setupEventListeners();
        this.loadEpisodesList();
    }

    loadEpisodeFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        const episodeId = urlParams.get('id');
        
        if (episodeId) {
            this.loadEpisode(parseInt(episodeId));
        } else {
            this.loadFirstAvailableEpisode();
        }
    }

    loadFirstAvailableEpisode() {
        const allEpisodes = getAllEpisodes();
        const availableEpisode = allEpisodes.find(ep => isEpisodeAvailable(ep));
        
        if (availableEpisode) {
            this.loadEpisode(availableEpisode.id);
        } else {
            this.showNoEpisodesMessage();
        }
    }

    loadEpisode(episodeId) {
        const episode = getEpisodeById(episodeId);
        
        if (!episode) {
            this.showEpisodeNotFound();
            return;
        }

        if (!isEpisodeAvailable(episode)) {
            this.showNotAvailableMessage();
            return;
        }

        this.currentEpisode = episode;
        this.updateURL(episodeId);
        this.renderEpisode();
        this.updateSidebar();
        this.incrementViews(episodeId);
        
        document.title = `${episode.titulo} - JoshuaSubs`;
    }

    renderEpisode() {
        if (!this.currentEpisode) return;
        this.renderVideoPlayer(this.currentEpisode);
        this.renderEpisodeInfo(this.currentEpisode);
        this.updateNavigationControls();
    }

    renderVideoPlayer(episode) {
       const videoPlayer = document.querySelector('.video-player');
       if (!videoPlayer) return;

       videoPlayer.innerHTML = `
           <iframe 
               id="mainVideoFrame"
               src="${episode.url}?autoplay=1&mute=0&quality=auto" 
               frameborder="0" 
               allowfullscreen
               allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
                loading="lazy"
                title="${episode.titulo}">
            </iframe>
        `;
    } 

    renderEpisodeInfo(episode) {
        const episodeTitle = document.querySelector('.episode-title');
        const episodeMeta = document.querySelector('.episode-meta');
        const episodeDescription = document.querySelector('.episode-description p');

        if (episodeTitle) {
            episodeTitle.textContent = episode.titulo;
        }

        if (episodeMeta) {
            episodeMeta.innerHTML = `
                <div class="meta-item">
                    <i class="fas fa-calendar"></i>
                    <span>${formatDate(episode.fecha)}</span>
                </div>
                <div class="meta-item">
                    <i class="fas fa-eye"></i>
                    <span>${formatViews(episode.views)} vistas</span>
                </div>
                <div class="meta-item">
                    <i class="fas fa-clock"></i>
                    <span>~23 min</span>
                </div>
                <div class="meta-item">
                    <i class="fas fa-star"></i>
                    <span>HD</span>
                </div>
            `;
        }

        if (episodeDescription) {
            episodeDescription.textContent = episode.descripcion;
        }

        this.updateLikesDisplay(episode.id);
    }

    loadEpisodesList() {
        this.episodesList = getAllEpisodes().filter(ep => isEpisodeAvailable(ep));
        this.renderEpisodesSidebar();
    }

    renderEpisodesSidebar() {
        const episodesList = document.querySelector('.episodes-list');
        if (!episodesList || this.episodesList.length === 0) return;

        episodesList.innerHTML = this.episodesList.map((episode) => {
            const isCurrentEpisode = this.currentEpisode && episode.id === this.currentEpisode.id;
            
            return `
                <div class="episode-item ${isCurrentEpisode ? 'current' : ''}" 
                     data-episode-id="${episode.id}"
                     onclick="player.loadEpisode(${episode.id})">
                    <div class="episode-thumbnail">EP${episode.id}</div>
                    <div class="episode-item-info">
                        <div class="episode-item-title">${episode.titulo}</div>
                        <div class="episode-item-meta">
                            <span><i class="fas fa-eye"></i> ${formatViews(episode.views)}</span>
                            <span><i class="fas fa-calendar"></i> ${formatDate(episode.fecha)}</span>
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        const sidebarTitle = document.querySelector('.sidebar-title');
        if (sidebarTitle) {
            sidebarTitle.textContent = `📺 Episodios (${this.episodesList.length})`;
        }
    }

    updateSidebar() {
        document.querySelectorAll('.episode-item').forEach(item => {
            const episodeId = parseInt(item.dataset.episodeId);
            item.classList.toggle('current', episodeId === this.currentEpisode?.id);
        });

        const currentItem = document.querySelector('.episode-item.current');
        if (currentItem) {
            currentItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    updateNavigationControls() {
        if (!this.currentEpisode) return;

        this.currentIndex = this.episodesList.findIndex(ep => ep.id === this.currentEpisode.id);
        
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');

        if (prevBtn) {
            const hasPrev = this.currentIndex > 0;
            prevBtn.disabled = !hasPrev;
            
            if (hasPrev) {
                const prevEpisode = this.episodesList[this.currentIndex - 1];
                prevBtn.innerHTML = `<i class="fas fa-chevron-left"></i><span>EP${prevEpisode.id}</span>`;
                prevBtn.onclick = () => this.loadEpisode(prevEpisode.id);
            } else {
                prevBtn.innerHTML = `<i class="fas fa-chevron-left"></i><span>Anterior</span>`;
            }
        }

        if (nextBtn) {
            const hasNext = this.currentIndex < this.episodesList.length - 1;
            nextBtn.disabled = !hasNext;
            
            if (hasNext) {
                const nextEpisode = this.episodesList[this.currentIndex + 1];
                nextBtn.innerHTML = `<span>EP${nextEpisode.id}</span><i class="fas fa-chevron-right"></i>`;
                nextBtn.onclick = () => this.loadEpisode(nextEpisode.id);
            } else {
                nextBtn.innerHTML = `<span>Siguiente</span><i class="fas fa-chevron-right"></i>`;
            }
        }
    }

    updateURL(episodeId) {
        const newURL = new URL(window.location);
        newURL.searchParams.set('id', episodeId);
        history.pushState({ episodeId }, '', newURL);
    }

    setupEventListeners() {
        window.addEventListener('popstate', (event) => {
            if (event.state && event.state.episodeId) {
                this.loadEpisode(event.state.episodeId);
            }
        });

        document.addEventListener('keydown', (event) => {
            switch(event.key) {
                case 'ArrowLeft':
                    event.preventDefault();
                    this.playPrevious();
                    break;
                case 'ArrowRight':
                    event.preventDefault();
                    this.playNext();
                    break;
                case 'Escape':
                    this.goBack();
                    break;
            }
        });

        window.addEventListener('beforeunload', () => {
            const iframe = document.getElementById('mainVideoFrame');
            if (iframe) {
                iframe.src = 'about:blank';
            }
        });
    }

    playPrevious() {
        if (this.currentIndex > 0) {
            const prevEpisode = this.episodesList[this.currentIndex - 1];
            this.loadEpisode(prevEpisode.id);
        }
    }

    playNext() {
        if (this.currentIndex < this.episodesList.length - 1) {
            const nextEpisode = this.episodesList[this.currentIndex + 1];
            this.loadEpisode(nextEpisode.id);
        }
    }

    goBack() {
        window.history.back();
    }

    toggleLike(episodeId) {
        toggleLike(episodeId);
        this.updateLikesDisplay(episodeId);
    }

    toggleDislike(episodeId) {
        toggleDislike(episodeId);
        this.updateLikesDisplay(episodeId);
    }

    shareEpisode(episodeId) {
        shareEpisode(episodeId);
    }

    updateLikesDisplay(episodeId) {
        const likesData = getLikes(episodeId);
        const likeBtn = document.getElementById('likeBtn');
        const dislikeBtn = document.getElementById('dislikeBtn');
        const likeCount = document.getElementById('likeCount');
        const dislikeCount = document.getElementById('dislikeCount');

        if (likeBtn && dislikeBtn && likeCount && dislikeCount) {
            likeCount.textContent = likesData.likes;
            dislikeCount.textContent = likesData.dislikes;

            likeBtn.classList.toggle('active', likesData.userAction === 'like');
            dislikeBtn.classList.toggle('active', likesData.userAction === 'dislike');
        }
    }

    incrementViews(episodeId) {
        incrementViews(episodeId);
    }

    showEpisodeNotFound() {
        const videoPlayer = document.querySelector('.video-player');
        if (videoPlayer) {
            videoPlayer.innerHTML = `
                <div style="height: 100%; display: flex; align-items: center; justify-content: center; background: #f8f9fa; color: #666;">
                    <div style="text-align: center;">
                        <i class="fas fa-exclamation-triangle" style="font-size: 3rem; margin-bottom: 1rem; color: #ffc107;"></i>
                        <h3>Episodio no encontrado</h3>
                        <p>El episodio que buscas no existe o ha sido eliminado.</p>
                        <button onclick="window.location.href='episodios.html'" class="action-btn" style="margin-top: 1rem;">
                            Volver a episodios
                        </button>
                    </div>
                </div>
            `;
        }
    }

    showNotAvailableMessage() {
        const videoPlayer = document.querySelector('.video-player');
        if (videoPlayer) {
            videoPlayer.innerHTML = `
                <div style="height: 100%; display: flex; align-items: center; justify-content: center; background: #f8f9fa; color: #666;">
                    <div style="text-align: center;">
                        <i class="fas fa-clock" style="font-size: 3rem; margin-bottom: 1rem; color: #17a2b8;"></i>
                        <h3>Episodio no disponible</h3>
                        <p>Este episodio estará disponible pronto. ¡Mantente atento!</p>
                        <button onclick="window.location.href='episodios.html'" class="action-btn" style="margin-top: 1rem;">
                            Ver otros episodios
                        </button>
                    </div>
                </div>
            `;
        }
    }

    showNoEpisodesMessage() {
        const videoPlayer = document.querySelector('.video-player');
        if (videoPlayer) {
            videoPlayer.innerHTML = `
                <div style="height: 100%; display: flex; align-items: center; justify-content: center; background: #f8f9fa; color: #666;">
                    <div style="text-align: center;">
                        <i class="fas fa-video" style="font-size: 3rem; margin-bottom: 1rem; color: #6c757d;"></i>
                        <h3>No hay episodios disponibles</h3>
                        <p>Aún no hay episodios disponibles para ver.</p>
                        <button onclick="window.location.href='index.html'" class="action-btn" style="margin-top: 1rem;">
                            Ir al inicio
                        </button>
                    </div>
                </div>
            `;
        }
    }
}

// Inicialización
let player;

document.addEventListener('DOMContentLoaded', function() {
    player = new VideoPlayer();
    console.log('🎬 Video Player inicializado');
});

// Funciones globales
function toggleLikePlayer(episodeId) {
    if (player && player.currentEpisode) {
        player.toggleLike(episodeId);
    }
}

function toggleDislikePlayer(episodeId) {
    if (player && player.currentEpisode) {
        player.toggleDislike(episodeId);
    }
}

function shareEpisodePlayer(episodeId) {
    if (player && player.currentEpisode) {
        shareEpisode(episodeId);
    }
}
