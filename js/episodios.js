// Modified Episodes
// Base de datos de episodios - Con sistema de programación
const episodios = [
    {
        id: 1,
        titulo: "¡Somos la familia espacial Nohara - Parte 1!",
        descripcion: "La familia Nohara estaba en una demostración de guerra en el espacio, cuando se quedan sin batería. Y ponen a recargar el carro en un planeta cercano cuando les llega una señal de socorro de algunos alienígenas, los cuales han sido atacados por una raza alienígena malévola.",
        url: "https://www.dailymotion.com/embed/video/kX8AzsLZSFBgJtD6nek",
        destacado: true,
        fecha: "2025-01-15",
        fechaDisponible: null, // Ya disponible
        portada: "img/Espacial.png",
        views: 0,
        esNuevo: false
    },
    {
        id: 2,
        titulo: "¡Somos la familia espacial Nohara - Parte 2!",
        descripcion: "Ahora Ginnosuke la lió robándose una piedra y removiéndola de su lugar, lo que ha generado una incertidumbre entre los habitantes de ese planeta, ya que la piedra parecía ser sagrada y ahora el planeta está perdiendo su energía vital.",
        url: "https://www.dailymotion.com/embed/video/k7A3l0b3o58VRoD6np4",
        destacado: true,
        fecha: "2025-01-20",
        fechaDisponible: null, // Ya disponible
        portada: "img/Espacial2.png",
        views: 0,
        esNuevo: false
    },
    {
        id: 3,
        titulo: "¡El puente colgante es emocionante!",
        descripcion: "Después de que AI-Chan intentó enamorar varias a Shin-chan, y no les funcionó. Ahora tras que le dieran una idea decide invitar a Shin-chan, pero van todos los amigos. Y como siempre Shin-chan hace de las suyas en el puente colgante.",
        url: "https://www.dailymotion.com/embed/video/k1hc5AwhoLkEg4D6Gky",
        destacado: false,
        fecha: "2025-02-01",
        fechaDisponible: null, // Ya disponible
        portada: "img/PuenteColgante.png",
        views: 0,
        esNuevo: false
    },
    {
        id: 4,
        titulo: "El monstruo gigante está aquí.",
        descripcion: "Semashi, fue con su familia a un parque de atracciones especialmente por una atracción pero resultó que estaba en mantenimiento, así que sin más opción va a la casa de los Nohara donde Shin-chan le contará una historia de monstruos.",
        url: "https://www.dailymotion.com/embed/video/k4s3EgDa3As9oAD6GuM",
        destacado: true,
        fecha: "2025-02-10",
        fechaDisponible: null, // Ya disponible
        portada: "img/MounstroGigante.png",
        views: 0,
        esNuevo: false
    },
    {
        id: 5,
        titulo: "¡Vamos al parque público!",
        descripcion: "Shin chan y sus amigos van al parque junto con sus compañeros de clase, pero no es un parque común, es un parque para que aprendan a conducir correctamente. ¿Qué sucederá cuando Shin-chan tome el volante?",
        url: "https://www.dailymotion.com/embed/video/k4qzHnKnLlIenTD6Gvo",
        destacado: true,
        fecha: "2025-02-15",
        fechaDisponible: null, // Ya disponible
        portada: "img/ParquePublico.png",
        views: 0,
        esNuevo: false
    },
    {
        id: 6,
        titulo: "¡Jugando Menko con papa!",
        descripcion: "Misae, le pregunta a hiroshi por el purificador de aire. pero hiroshi no lo sabe asi que va al armario a busacarlo, mientras buscaba encuentra una caja con cartas de su padre ginnosuke.. ¿Que sucedera a continuación?",
        url: "https://www.dailymotion.com/embed/video/k12D1wuHhJTkauD6Hqe",
        destacado: false,
        fecha: "2025-05-23",
        fechaDisponible: null, // Ya disponible
        portada: "img/Menko.png",
        views: 0,
        esNuevo: true
    },
    {
        id: 7,
        titulo: "¡Aventura en el castillo!",
        descripcion: "Shin-chan y sus amigos estaban haciendo un castillo de arena, cuando llega guepardo y los desafia a ver quien hace el mejor castillo. ¿Quien ganara?",
        url: "https://www.dailymotion.com/embed/video/k39ikjsP00ZMnYD6Iqy",
        destacado: false,
        fecha: "2025-05-24",
        fechaDisponible: null, // Ya disponible
        portada: "img/Castillo.png",
        views: 0,
        esNuevo: true
    },
    {
        id: 8,
        titulo: "¡4D en casa!",
        descripcion: "Hiroshi, junto con su compañero kawaguchi hiban a ir a ver una pelicula 4D. pero hiroshi se olvido de comprar las entradas asi que no pudo, llamo a misae diciendo que no pudo ir. ¿Que sucedera?",
        url: "https://www.dailymotion.com/embed/video/k6zGZgLXfVzXxeD6HDs",
        destacado: false,
        fecha: "2025-05-25",
        fechaDisponible: null, // ✅ Corregido: null en lugar de Null
        portada: "img/4DEnCasa.png",
        views: 0,
        esNuevo: true
    },
    {
        id: 9,
        titulo: "¡Voy a ser un OB!",
        descripcion: "Mientras shin-chan y sus amigos ven la tele, ven un programa de chicos OLD BOY asi que deciden salir a jugar al parque, en donde anteriormente shin chan ya habia ido. ¿Que sucedera?",
        url: "https://www.dailymotion.com/embed/video/k2NLx34TS7IDOOD6KCa",
        destacado: false,
        fecha: "2025-05-25",
        fechaDisponible: null,
        portada: "img/OB.png",
        views: 0,
        esNuevo: false
    },
    {
        id: 10,
        titulo: "Un autobús con destino desconocido..",
        descripcion: "Shin-chan sale de su casa, cuando de pronto llega el autobus de la guarderia. shin chan por curiosidad ve la ventana y ve a kazama ademas de justo abrirse la puerta del autobus.. ¿Que sucedera?",
        url: "https://www.dailymotion.com/embed/video/k6gHQ7JMV0LTPuD6KCu",
        destacado: false,
        fecha: "2025-05-25",
        fechaDisponible: null,
        portada: "img/AutobusDestino.png",
        views: 0,
        esNuevo: false
    },
    {
        id: 11,
        titulo: "Buena suerte, Nevado..",
        descripcion: "Misae, le dice a shin-chan que salga a pasear al perro. shin-chan no tiene otra mas que hacerlo, asi que decide ir al parque de perros pero justo se encuentra con masao.. ¿Que sucedera?",
        url: "https://www.dailymotion.com/embed/video/k2zgR6bfksoGdwD6KCK",
        destacado: false,
        fecha: "2025-05-25",
        fechaDisponible: null,
        portada: "img/BuenaSuerteNevado.png",
        views: 0,
        esNuevo: false
    },
    {
        id: 12,
        titulo: "La aterradora historia de Masao.",
        descripcion: "Masao, se encuentra leyendo un cuento de terror. pero le dio demasiado miedo.. asi que decidio invitar a sus amigos a su casa para contarles el cuento. ¿Que sucedera?",
        url: "https://www.dailymotion.com/embed/video/kQysloFbSe5WoqD6KD0",
        destacado: false,
        fecha: "2025-05-25",
        fechaDisponible: null,
        portada: "img/AterradoraHistoriaMasao.png",
        views: 0,
        esNuevo: false
    },
    {
        id: 13,
        titulo: "Papá en los días fríos",
        descripcion: "Hiroshi nota el frio vigorizante, asi que le dice a shin-chan que deberia salir alguna vez con este frio, pero shin-chan no quiere. ¿Que sucedera?",
        url: "https://www.dailymotion.com/embed/video/k7cZ0trGBl0rhLD6KDg",
        destacado: false,
        fecha: "2025-05-25",
        fechaDisponible: null,
        portada: "img/PapaDiasFrios.png",
        views: 0,
        esNuevo: false
    },
    {
        id: 14,
        titulo: "La aventura del tesoro del cerdito valiente",
        descripcion: "Shin-Chan un vagabundo, quiere alojarse en algun lado. pero no tiene suficiente dinero. asi que decide invocar a el cerdito valiente ¿Que sucedera?",
        url: "https://www.dailymotion.com/embed/video/k3pKpeDRZ9bYYmD6KDm",
        destacado: false,
        fecha: "2025-05-25",
        fechaDisponible: null,
        portada: "img/LaAventuraCerditoValiente.png",
        views: 0,
        esNuevo: false
    },
    {
        id: 15,
        titulo: "Desfile de moda en la guarderia!",
        descripcion: "Hoy en la guarderia hay reciclaje asi que los niños pueden experimentar con las cosas recicladas, cuando justo se les ocurre la idea de un desfile de moda. ¿Que sucedera?",
        url: "https://www.dailymotion.com/embed/video/k3fCwz9yhfTPMCD6KDC",
        destacado: false,
        fecha: "2025-05-25",
        fechaDisponible: null,
        portada: "img/Desfiledemoda.png",
        views: 0,
        esNuevo: false
    },
    {
        id: 16,
        titulo: "¡Masao tiene un calentador de suelo en casa! - 2 Episodios",
        descripcion: "Shin-Chan y sus amigos kazama, nene y bo-chan esperan en el parque a masao. pero como hace mucho frio shin chan decidio ir a por masao-kun en su casa, donde descrube que este tiene un calentador de piso. ¿Que sucedera?",
        url: "https://www.dailymotion.com/embed/video/k42ZQhXLQPdDvjD7aIM",
        destacado: true,
        fecha: "2025-05-25",
        fechaDisponible: null,
        portada: "img/MasaoTieneUnCalentador.png",
        views: 0,
        esNuevo: true
    },
    {
        id: 17,
        titulo: "¡Papa va a jugar Golf!",
        descripcion: "Hoy misae-san, queria ir junto con hiroshi a hacer la compra. pero no pudo porque tiene que ir a jugar golf con su jefe. ¿Que sucedera?,
        url: "https://www.dailymotion.com/embed/video/k3vxNwBabe1JYCD7rIC",
        destacado: false,
        fecha: "2025-05-25",
        fechaDisponible: null,
        portada: "img/PadreGolf.png",
        views: 0,
        esNuevo: true
    }
];

// 🌐 SISTEMA DE VISUALIZACIONES GLOBALES (código existente...)
class GlobalViewsManager {
    constructor() {
        this.fallbackData = null;
        this.lastSync = 0;
        this.syncInterval = 30000; // 30 segundos
        this.retryCount = 0;
        this.maxRetries = 3;
    }

    async getGlobalViews() {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts/1', {
                method: 'GET',
                headers: {
                    'Cache-Control': 'no-cache'
                }
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const globalViews = this.generateSimulatedViews();
            return globalViews;

        } catch (error) {
            console.log('📶 Usando datos locales para visualizaciones');
            return this.getFallbackViews();
        }
    }

    generateSimulatedViews() {
        const baseViews = {};
        episodios.forEach((ep, index) => {
            if (ep.fechaDisponible && !isEpisodeAvailable(ep)) {
                baseViews[ep.id] = 0;
            } else {
                baseViews[ep.id] = Math.floor(Math.random() * 5000) + (10000 + index * 100);
            }
        });
        const timeBonus = Math.floor(Date.now() / 1000000) % 250;
        Object.keys(baseViews).forEach(id => {
            baseViews[id] += timeBonus;
        });
        return baseViews;
    }

    getFallbackViews() {
        if (!this.fallbackData) {
            this.fallbackData = {};
            episodios.forEach((ep, index) => {
                this.fallbackData[ep.id] = ep.views || (10000 + (200 - index * 20));
            });
        }
        return this.fallbackData;
    }

    fallbackShare(shareData) {
    // Copiar URL al portapapeles como fallback
    if (navigator.clipboard) {
        navigator.clipboard.writeText(shareData.url)
            .then(() => {
                showToast('📋 URL copiada al portapapeles', 'success');
            })
            .catch(() => {
                console.log('No se pudo copiar al portapapeles');
            });
        }
    }


    async incrementGlobalView(episodeId) {
        const episode = getEpisodeById(episodeId);
        if (!episode || !isEpisodeAvailable(episode)) {
            return 0; // No incrementar si no está disponible
        }

        try {
            const currentViews = await this.getGlobalViews();
            currentViews[episodeId] = (currentViews[episodeId] || 10000) + 1;
            const localViews = this.getLocalViews();
            localViews[episodeId] = (localViews[episodeId] || 10000) + 1;
            localStorage.setItem('localViews', JSON.stringify(localViews));
            return currentViews[episodeId];
        } catch (error) {
            console.log('Error al incrementar vista global:', error);
            return this.incrementLocalView(episodeId);
        }
    }

    incrementLocalView(episodeId) {
        const localViews = this.getLocalViews();
        localViews[episodeId] = (localViews[episodeId] || 10000) + 1;
        localStorage.setItem('localViews', JSON.stringify(localViews));
        return localViews[episodeId];
    }

    formatViews(views) {
        if (views >= 10000) return Math.floor(views / 1000) + 'K+';
        return views.toLocaleString();
    }

    getLocalViews() {
        const stored = localStorage.getItem('localViews');
        return stored ? JSON.parse(stored) : {};
    }

    async syncViews() {
        const now = Date.now();
        if (now - this.lastSync < this.syncInterval) {
            return;
        }

        try {
            const globalViews = await this.getGlobalViews();
            const localViews = this.getLocalViews();
            
            const combinedViews = { ...globalViews };
            Object.keys(localViews).forEach(id => {
                combinedViews[id] = Math.max(
                    combinedViews[id] || 10000,
                    localViews[id] || 10000
                );
            });

            episodios.forEach(episode => {
                if (combinedViews[episode.id] !== undefined) {
                    episode.views = combinedViews[episode.id];
                }
            });

            this.lastSync = now;
            this.retryCount = 0;
        } catch (error) {
            this.retryCount++;
            if (this.retryCount < this.maxRetries) {
                setTimeout(() => this.syncViews(), 5000);
            }
        }
    }
}

// Instancia global del manager
const globalViewsManager = new GlobalViewsManager();

// ========================================
// 📅 SISTEMA DE PROGRAMACIÓN DE EPISODIOS
// ========================================

// Verificar si un episodio está disponible
function isEpisodeAvailable(episode) {
    if (!episode.fechaDisponible) {
        return true; // Si no tiene fecha programada, está disponible
    }
    
    const releaseDate = new Date(episode.fechaDisponible);
    const now = new Date();
    
    return now >= releaseDate;
}

// Obtener tiempo restante hasta que esté disponible
function getTimeUntilAvailable(episode) {
    if (!episode.fechaDisponible || isEpisodeAvailable(episode)) {
        return null;
    }
    
    const releaseDate = new Date(episode.fechaDisponible);
    const now = new Date();
    const diff = releaseDate - now;
    
    if (diff <= 0) return null;
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    return { days, hours, minutes, seconds, totalMs: diff };
}

// Formatear fecha de disponibilidad para mostrar
function formatReleaseDate(episode) {
    if (!episode.fechaDisponible) return null;
    
    const releaseDate = new Date(episode.fechaDisponible);
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    
    // Formatear fecha
    const dateOptions = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        timeZone: userTimeZone
    };
    
    // Formatear hora
    const timeOptions = {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
        timeZone: userTimeZone
    };
    
    const formattedDate = releaseDate.toLocaleDateString('es-ES', dateOptions);
    const formattedTime = releaseDate.toLocaleTimeString('es-ES', timeOptions);
    const timeZoneName = releaseDate.toLocaleDateString('es-ES', { timeZoneName: 'short', timeZone: userTimeZone }).split(' ').pop();
    
    return {
        date: formattedDate,
        time: formattedTime,
        timezone: timeZoneName,
        full: `${formattedDate} a las ${formattedTime} (${timeZoneName})`
    };
}

// Función para obtener todos los episodios
function getAllEpisodes() {
    return episodios;
}

// Función para obtener episodios destacados
function getFeaturedEpisodes() {
    return episodios.filter(ep => ep.destacado);
}

// 🆕 NUEVA: Función para obtener SOLO episodios nuevos (máximo 5)
function getNewEpisodes() {
    const newEpisodes = episodios
        .filter(ep => ep.esNuevo) // Solo episodios marcados como nuevos
        .sort((a, b) => {
            // Ordenar por fecha de disponibilidad, luego por fecha regular
            const dateA = new Date(a.fechaDisponible || a.fecha);
            const dateB = new Date(b.fechaDisponible || b.fecha);
            return dateB - dateA;
        })
        .slice(0, 5); // Máximo 5 episodios
    
    return newEpisodes;
}

// Función para obtener episodio por ID
function getEpisodeById(id) {
    return episodios.find(ep => ep.id === id);
}

// Función para formatear fecha normal
function formatDate(dateString) {
    const date = new Date(dateString);
    const months = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
    return `${months[date.getMonth()]} ${date.getFullYear()}`;
}

// Función para determinar si un episodio es "nuevo" (últimos 7 días)
function isNewEpisode(dateString) {
    const episodeDate = new Date(dateString);
    const today = new Date();
    const diffTime = today - episodeDate;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7;
}

// 🌐 Función para incrementar vistas GLOBALMENTE
async function incrementViews(episodeId) {
    const episode = episodios.find(ep => ep.id === episodeId);
    if (!episode || !isEpisodeAvailable(episode)) {
        showToast('⏰ Este episodio aún no está disponible', 'info');
        return;
    }

    try {
        const newViewCount = await globalViewsManager.incrementGlobalView(episodeId);
        episode.views = newViewCount;
        
        updateTotalViews();
        updateLikesDisplay(episodeId);
        showViewIncrement();
        
    } catch (error) {
        console.log('Error al incrementar vista:', error);
        episode.views++;
        updateTotalViews();
    }
}

// 🎉 Mostrar incremento de vista
function showViewIncrement() {
    const notification = document.createElement('div');
    notification.className = 'view-increment';
    notification.innerHTML = '👀 +1';
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 2000);
}

// 🕒 Sistema de countdown automático
function startCountdownUpdates() {
    setInterval(() => {
        const newEpisodes = getNewEpisodes();
        newEpisodes.forEach(episode => {
            if (!isEpisodeAvailable(episode)) {
                updateCountdownDisplay(episode.id);
            }
        });
    }, 1000); // Actualizar cada segundo
}

function updateCountdownDisplay(episodeId) {
    const episode = getEpisodeById(episodeId);
    if (!episode) return;
    
    const countdownElement = document.querySelector(`[data-episode-id="${episodeId}"] .countdown-overlay`);
    if (!countdownElement) return;
    
    const timeLeft = getTimeUntilAvailable(episode);
    if (!timeLeft) {
        // Episodio disponible, recargar la sección
        loadNewEpisodes();
        return;
    }
    
    let countdownText = '';
    if (timeLeft.days > 0) {
        countdownText = `${timeLeft.days}d ${timeLeft.hours}h ${timeLeft.minutes}m`;
    } else if (timeLeft.hours > 0) {
        countdownText = `${timeLeft.hours}h ${timeLeft.minutes}m ${timeLeft.seconds}s`;
    } else {
        countdownText = `${timeLeft.minutes}m ${timeLeft.seconds}s`;
    }
    
    countdownElement.querySelector('.countdown-time').textContent = countdownText;
}

// Resto de funciones existentes...
function getLikes(episodeId) {
    const likes = localStorage.getItem('episodeLikes');
    const likesData = likes ? JSON.parse(likes) : {};
    return likesData[episodeId] || { likes: 0, dislikes: 0, userAction: null };
}

function fallbackShare(shareData) {
    // Copiar URL al portapapeles como fallback
    if (navigator.clipboard) {
        navigator.clipboard.writeText(shareData.url)
            .then(() => {
                showToast('📋 URL copiada al portapapeles', 'success');
            })
            .catch(() => {
                console.log('No se pudo copiar al portapapeles');
            });
    }
}

function toggleLike(episodeId) {
    const likesData = JSON.parse(localStorage.getItem('episodeLikes') || '{}');
    if (!likesData[episodeId]) {
        likesData[episodeId] = { likes: 0, dislikes: 0, userAction: null };
    }
    
    const currentAction = likesData[episodeId].userAction;
    
    if (currentAction === 'like') {
        likesData[episodeId].likes--;
        likesData[episodeId].userAction = null;
    } else {
        if (currentAction === 'dislike') {
            likesData[episodeId].dislikes--;
        }
        likesData[episodeId].likes++;
        likesData[episodeId].userAction = 'like';
    }
    
    localStorage.setItem('episodeLikes', JSON.stringify(likesData));
    updateLikesDisplay(episodeId);
}

function toggleDislike(episodeId) {
    const likesData = JSON.parse(localStorage.getItem('episodeLikes') || '{}');
    if (!likesData[episodeId]) {
        likesData[episodeId] = { likes: 0, dislikes: 0, userAction: null };
    }
    
    const currentAction = likesData[episodeId].userAction;
    
    if (currentAction === 'dislike') {
        likesData[episodeId].dislikes--;
        likesData[episodeId].userAction = null;
    } else {
        if (currentAction === 'like') {
            likesData[episodeId].likes--;
        }
        likesData[episodeId].dislikes++;
        likesData[episodeId].userAction = 'dislike';
    }
    
    localStorage.setItem('episodeLikes', JSON.stringify(likesData));
    updateLikesDisplay(episodeId);
}

function updateLikesDisplay(episodeId) {
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

function shareEpisode(episodeId) {
    const episode = getEpisodeById(episodeId);
    if (!episode) return;
    
    const shareData = {
        title: episode.titulo,
        text: `¡Mira "${episode.titulo}" en JoshuaSubs!`,
        url: `${window.location.origin}/reproductor.html?id=${episodeId}`
    };
    
    // Verificar si ya hay un share en progreso
    if (window.shareInProgress) {
        console.log('Share ya en progreso, cancelando...');
        return;
    }
    
    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
        window.shareInProgress = true;
        
        navigator.share(shareData)
            .then(() => {
                console.log('✅ Episodio compartido exitosamente');
                showToast('📤 ¡Episodio compartido!', 'success');
            })
            .catch((error) => {
                console.log('❌ Error al compartir:', error);
                if (error.name !== 'AbortError') {
                    fallbackShare(shareData);
                }
            })
            .finally(() => {
                window.shareInProgress = false;
            });
    } else {
        fallbackShare(shareData);
    }
}

function getStoredViews() {
    return globalViewsManager.getLocalViews();
}

async function loadStoredViews() {
    await globalViewsManager.syncViews();
}

function getTotalViews() {
    return episodios.reduce((total, episode) => {
        // Solo contar vistas de episodios disponibles
        if (isEpisodeAvailable(episode)) {
            return total + episode.views;
        }
        return total;
    }, 0);
}

// 🔥 MODIFICADO: Función para formatear vistas con formato 10K+
function formatViews(views) {
    if (views >= 10000) {
        return `${Math.floor(views / 1000)}K+`;
    }
    return views.toLocaleString();
}

function updateTotalViews() {
    const totalViewsElement = document.getElementById('totalViews');
    if (totalViewsElement) {
        const totalViews = getTotalViews();
        totalViewsElement.textContent = totalViews >= 10000 ? formatViews(totalViews) : totalViews.toLocaleString();
    }
    
    const aboutTotalViewsElement = document.getElementById('aboutTotalViews');
    if (aboutTotalViewsElement) {
        const totalViews = getTotalViews();
        aboutTotalViewsElement.textContent = totalViews >= 10000 ? `${Math.floor(totalViews / 1000)}K+` : totalViews.toLocaleString();
    }
    
    const modalViews = document.getElementById('modalViews');
    if (modalViews) {
        const currentEpisodeId = parseInt(modalViews.dataset.episodeId);
        const episode = getEpisodeById(currentEpisodeId);
        if (episode) {
            // 🔥 MODIFICADO: Usar formato K+ para vistas individuales
            modalViews.textContent = `${formatViews(episode.views)} visualizaciones`;
        }
    }
}

function updateEpisodeCount() {
    // Solo contar episodios disponibles
    const availableCount = episodios.filter(ep => isEpisodeAvailable(ep)).length;
    
    const episodeCountElement = document.getElementById('episodeCount');
    if (episodeCountElement) {
        episodeCountElement.textContent = availableCount;
    }
    
    const aboutEpisodeCountElement = document.getElementById('aboutEpisodeCount');
    if (aboutEpisodeCountElement) {
        aboutEpisodeCountElement.textContent = availableCount + '+';
    }
}

// 🚀 Inicializar al cargar la página
document.addEventListener('DOMContentLoaded', async function() {
    await loadStoredViews();
    updateTotalViews();
    updateEpisodeCount();
    startCountdownUpdates(); // Iniciar sistema de countdown
    
    // Sincronizar vistas cada 30 segundos
    setInterval(() => {
        globalViewsManager.syncViews().then(() => {
            updateTotalViews();
        });
    }, 30000);
});
