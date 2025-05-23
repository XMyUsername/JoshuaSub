// Base de datos de episodios - Editable para agregar nuevos episodios
const episodios = [
    {
        id: 1,
        titulo: "¡Somos la familia espacial Nohara - Parte 1!",
        descripcion: "La familia Nohara estaba en una demostración de guerra en el espacio, cuando se quedan sin batería. Y ponen a recargar el carro en un planeta cercano cuando les llega una señal de Ginnosuke cercana, ¿Qué sucederá?",
        url: "https://www.dailymotion.com/embed/video/kX8AzsLZSFBgJtD6nek",
        destacado: true,
        fecha: "2025-05-23",
        portada: "img/thumbnail-placeholder.jpg",
        views: 0
    },
    {
        id: 2,
        titulo: "¡Somos la familia espacial Nohara - Parte 2!",
        descripcion: "Ahora Ginnosuke la lió robándose una piedra y removiéndola de su lugar, lo que ha generado una incertidumbre entre los habitantes de ese planeta, ya que la piedra parecía ser para que no saliera un monstruo llamado Anaya-chan, pero.. ¿Qué sucederá?",
        url: "https://www.dailymotion.com/embed/video/k7A3l0b3o58VRoD6np4",
        destacado: true,
        fecha: "2025-05-23",
        portada: "img/thumbnail-placeholder.jpg",
        views: 0
    },
    {
        id: 3,
        titulo: "¡El puente colgante es emocionante!",
        descripcion: "Despeus de que AI-Chan intento enamorar varias a shin-chan, y no les funciono. Ahora tras que le dieran una idea decide invitar a shin-chan, pero van todos los amigos. y cruzaran por varios puentes, ¿Que sucederá?",
        url: "https://www.dailymotion.com/embed/video/k1hc5AwhoLkEg4D6Gky",
        destacado: true,
        fecha: "2025-05-23",
        portada: "img/thumbnail-placeholder.jpg",
        views: 0
    },
    {
        id: 4,
        titulo: "El monstruo gigante está aquí.",
        descripcion: "Semashi, fue con su familia a un parque de atracciones especialmente por una atracción pero resulto que estaba en mantenimiento, asi que sin mas opcion va a la casa de la familia nohara, en donde a Hiroshi se le ocurre la idea de recrear la atraccion. haran un escenario en el parque, pero ¿Que continuara?",
        url: "https://www.dailymotion.com/embed/video/k4s3EgDa3As9oAD6GuM",
        destacado: true,
        fecha: "2025-05-23",
        portada: "img/thumbnail-placeholder.jpg",
        views: 0
    },
    {
        id: 5,
        titulo: "¡Vamos al parque público!",
        descripcion: "Shin chan y sus amigos van al parque junto con sus compañeros de clase, pero no es un parque comun, es un parque para que aprendan a conducir correctamente. ¿Que sucedera?",
        url: "https://www.dailymotion.com/embed/video/k4qzHnKnLlIenTD6Gvo",
        destacado: true,
        fecha: "2025-05-23",
        portada: "img/thumbnail-placeholder.jpg",
        views: 0
    },
    {
        id: 6,
        titulo: "¡Que juego menko con papá!",
        descripcion: "Misae le pregunta a Hiroshi por el purificador de aire, asi que hiroshi va al armario y empieza a buscar. pero no lo encuentra, poco despues encuentra una caja que contiene un juego de cartas de su padre ginnosuke de akita, ¿Que sucedera a continuación?",
        url: "https://www.dailymotion.com/embed/video/k12D1wuHhJTkauD6Hqe",
        destacado: false,
        fecha: "2025-05-23",
        portada: "img/thumbnail-placeholder.jpg",
        views: 0
    }
];

// Función para obtener todos los episodios
function getAllEpisodes() {
    return episodios;
}

// Función para obtener episodios destacados
function getFeaturedEpisodes() {
    return episodios.filter(ep => ep.destacado);
}

// Función para obtener episodios nuevos (últimos 5 para el inicio)
function getNewEpisodes() {
    return episodios
        .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
        .slice(0, 5);
}

// Función para obtener episodio por ID
function getEpisodeById(id) {
    return episodios.find(ep => ep.id === id);
}

// Función para formatear fecha
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

// Función para incrementar vistas
function incrementViews(episodeId) {
    const episode = episodios.find(ep => ep.id === episodeId);
    if (episode) {
        episode.views++;
        
        // Guardar en localStorage
        const views = getStoredViews();
        views[episodeId] = episode.views;
        localStorage.setItem('episodeViews', JSON.stringify(views));
        
        // Actualizar contador total
        updateTotalViews();
        
        // Actualizar likes si existen
        updateLikesDisplay(episodeId);
    }
}

// Funciones para likes y dislikes
function getLikes(episodeId) {
    const likes = localStorage.getItem('episodeLikes');
    const likesData = likes ? JSON.parse(likes) : {};
    return likesData[episodeId] || { likes: 0, dislikes: 0, userAction: null };
}

function toggleLike(episodeId) {
    const likesData = JSON.parse(localStorage.getItem('episodeLikes') || '{}');
    if (!likesData[episodeId]) {
        likesData[episodeId] = { likes: 0, dislikes: 0, userAction: null };
    }
    
    const currentAction = likesData[episodeId].userAction;
    
    if (currentAction === 'like') {
        // Si ya dio like, quitarlo
        likesData[episodeId].likes--;
        likesData[episodeId].userAction = null;
    } else {
        // Si no había dado like o había dado dislike
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
        // Si ya dio dislike, quitarlo
        likesData[episodeId].dislikes--;
        likesData[episodeId].userAction = null;
    } else {
        // Si no había dado dislike o había dado like
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
        
        // Actualizar clases activas
        likeBtn.classList.toggle('active', likesData.userAction === 'like');
        dislikeBtn.classList.toggle('active', likesData.userAction === 'dislike');
    }
}

// Función para compartir
function shareEpisode(episodeId) {
    const episode = getEpisodeById(episodeId);
    if (!episode) return;
    
    if (navigator.share) {
        navigator.share({
            title: episode.titulo,
            text: episode.descripcion,
            url: window.location.href
        });
    } else {
        // Fallback para navegadores que no soportan Web Share API
        const url = window.location.href;
        navigator.clipboard.writeText(url).then(() => {
            alert('¡Enlace copiado al portapapeles!');
        });
    }
}

// Función para obtener vistas guardadas
function getStoredViews() {
    const stored = localStorage.getItem('episodeViews');
    return stored ? JSON.parse(stored) : {};
}

// Función para cargar vistas desde localStorage
function loadStoredViews() {
    const views = getStoredViews();
    episodios.forEach(episode => {
        if (views[episode.id]) {
            episode.views = views[episode.id];
        }
    });
}

// Función para obtener total de vistas
function getTotalViews() {
    return episodios.reduce((total, episode) => total + episode.views, 0);
}

// Función para actualizar contador de vistas en la página
function updateTotalViews() {
    const totalViewsElement = document.getElementById('totalViews');
    if (totalViewsElement) {
        totalViewsElement.textContent = getTotalViews().toLocaleString();
    }
    
    const aboutTotalViewsElement = document.getElementById('aboutTotalViews');
    if (aboutTotalViewsElement) {
        aboutTotalViewsElement.textContent = getTotalViews().toLocaleString();
    }
    
    // Actualizar contador en modal si está abierto
    const modalViews = document.getElementById('modalViews');
    if (modalViews) {
        const currentEpisodeId = parseInt(modalViews.dataset.episodeId);
        const episode = getEpisodeById(currentEpisodeId);
        if (episode) {
            modalViews.textContent = `${episode.views.toLocaleString()} visualizaciones`;
        }
    }
}

// Función para actualizar contador de episodios
function updateEpisodeCount() {
    const episodeCountElement = document.getElementById('episodeCount');
    if (episodeCountElement) {
        episodeCountElement.textContent = episodios.length;
    }
    
    const aboutEpisodeCountElement = document.getElementById('aboutEpisodeCount');
    if (aboutEpisodeCountElement) {
        aboutEpisodeCountElement.textContent = episodios.length + '+';
    }
}

// Inicializar al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    loadStoredViews();
    updateTotalViews();
    updateEpisodeCount();
});
