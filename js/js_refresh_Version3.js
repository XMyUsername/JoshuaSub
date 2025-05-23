// Sistema de actualización inteligente para JoshuaSubs

class RefreshManager {
    constructor() {
        this.lastEpisodeCount = 0;
        this.lastUpdateTime = null;
        this.checkInterval = null;
        this.init();
    }

    init() {
        this.loadLastUpdateTime();
        this.setLastUpdateDisplay();
        this.startPeriodicCheck();
        
        // Guardar conteo inicial
        this.lastEpisodeCount = episodios.length;
    }

    // 🕒 Mostrar última actualización
    setLastUpdateDisplay() {
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
        }
    }

    // 💾 Guardar tiempo de actualización
    saveUpdateTime() {
        const now = new Date().getTime();
        localStorage.setItem('lastUpdateTime', now.toString());
        this.lastUpdateTime = now;
        this.setLastUpdateDisplay();
    }

    // 📖 Cargar tiempo de actualización
    loadLastUpdateTime() {
        const stored = localStorage.getItem('lastUpdateTime');
        this.lastUpdateTime = stored ? parseInt(stored) : new Date().getTime();
    }

    // 🔍 Verificar si hay nuevos episodios
    checkForNewEpisodes() {
        return new Promise((resolve) => {
            // Simular verificación (en un caso real podrías hacer fetch)
            setTimeout(() => {
                const currentCount = episodios.length;
                const hasNewEpisodes = currentCount > this.lastEpisodeCount;
                
                if (hasNewEpisodes) {
                    this.lastEpisodeCount = currentCount;
                    resolve(true);
                } else {
                    resolve(false);
                }
            }, 1000);
        });
    }

    // 🔔 Mostrar notificación de nuevos episodios
    showUpdateNotification() {
        const notification = document.getElementById('updateNotification');
        if (notification) {
            notification.classList.remove('hidden');
            notification.classList.add('fade-in');
        }
    }

    // ❌ Cerrar notificación
    hideUpdateNotification() {
        const notification = document.getElementById('updateNotification');
        if (notification) {
            notification.classList.add('fade-out');
            setTimeout(() => {
                notification.classList.add('hidden');
                notification.classList.remove('fade-in', 'fade-out');
            }, 500);
        }
    }

    // ⏰ Verificación periódica automática
    startPeriodicCheck() {
        // Verificar cada 5 minutos
        this.checkInterval = setInterval(async () => {
            const hasNew = await this.checkForNewEpisodes();
            if (hasNew) {
                this.showUpdateNotification();
            }
        }, 300000); // 5 minutos
    }

    // 🛑 Detener verificación periódica
    stopPeriodicCheck() {
        if (this.checkInterval) {
            clearInterval(this.checkInterval);
            this.checkInterval = null;
        }
    }

    // 🔄 Refrescar sección específica
    async refreshSection(sectionType) {
        const button = event.target.closest('.section-refresh-btn');
        if (button) {
            button.classList.add('loading');
        }

        try {
            // Simular carga
            await new Promise(resolve => setTimeout(resolve, 1000));

            switch (sectionType) {
                case 'featured':
                    loadFeaturedEpisodes();
                    break;
                case 'new':
                    loadNewEpisodes();
                    break;
                default:
                    loadFeaturedEpisodes();
                    loadNewEpisodes();
            }

            this.saveUpdateTime();
            this.showRefreshSuccess(`Sección ${sectionType === 'featured' ? 'destacados' : 'nuevos episodios'} actualizada`);
        } finally {
            if (button) {
                setTimeout(() => {
                    button.classList.remove('loading');
                }, 500);
            }
        }
    }

    // ✅ Mostrar mensaje de éxito
    showRefreshSuccess(message) {
        // Crear toast notification
        const toast = document.createElement('div');
        toast.className = 'refresh-toast';
        toast.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <span>${message}</span>
        `;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, 3000);
    }

    // 🔄 Refrescar inteligente
    async smartRefresh() {
        const button = event.target.closest('.hero-refresh-btn');
        if (button) {
            button.classList.add('loading');
        }

        try {
            const hasNew = await this.checkForNewEpisodes();
            
            if (hasNew) {
                // Hay nuevos episodios, recargar
                await this.performRefresh();
                this.showRefreshSuccess('¡Nuevos episodios encontrados!');
            } else {
                // No hay nuevos episodios
                this.showRefreshSuccess('Ya tienes los episodios más recientes');
            }
        } finally {
            if (button) {
                setTimeout(() => {
                    button.classList.remove('loading');
                }, 500);
            }
        }
    }

    // 💪 Forzar actualización completa
    async forceRefresh() {
        // Mostrar loader global
        this.showGlobalLoader();

        try {
            // Limpiar caché del navegador
            if ('caches' in window) {
                const cacheNames = await caches.keys();
                await Promise.all(
                    cacheNames.map(name => caches.delete(name))
                );
            }

            // Recargar página con bypass de caché
            window.location.reload(true);
        } catch (error) {
            console.log('Error al limpiar caché:', error);
            // Fallback: reload normal
            window.location.reload();
        }
    }

    // 🔄 Realizar actualización
    async performRefresh() {
        // Simular recarga de datos
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Recargar secciones
        loadFeaturedEpisodes();
        loadNewEpisodes();
        updateCounters();
        
        this.saveUpdateTime();
    }

    // 🌀 Mostrar loader global
    showGlobalLoader() {
        const loader = document.createElement('div');
        loader.id = 'globalLoader';
        loader.innerHTML = `
            <div class="global-loader-content">
                <div class="loader-spinner"></div>
                <p>Actualizando episodios...</p>
            </div>
        `;
        
        document.body.appendChild(loader);
    }
}

// 🚀 Funciones globales para los botones
function refreshPage() {
    refreshManager.forceRefresh();
}

function smartRefresh() {
    refreshManager.smartRefresh();
}

function forceRefresh() {
    refreshManager.forceRefresh();
}

function refreshSection(section) {
    refreshManager.refreshSection(section);
}

function closeNotification() {
    refreshManager.hideUpdateNotification();
}

// 🎯 Inicializar el sistema de actualización
let refreshManager;

document.addEventListener('DOMContentLoaded', function() {
    refreshManager = new RefreshManager();
});

// 🛑 Limpiar al salir
window.addEventListener('beforeunload', function() {
    if (refreshManager) {
        refreshManager.stopPeriodicCheck();
    }
});