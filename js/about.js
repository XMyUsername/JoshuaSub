// Funciones para la página Acerca de

document.addEventListener('DOMContentLoaded', function() {
    initializeAboutPage();
    animateStats();
});

function initializeAboutPage() {
    updateAboutCounters();
    setupInteractiveElements();
}

function updateAboutCounters() {
    updateEpisodeCount();
    updateTotalViews();
    
    // Actualizar estadísticas específicas de la página About
    const aboutEpisodeCount = document.getElementById('aboutEpisodeCount');
    const aboutTotalViews = document.getElementById('aboutTotalViews');
    
    if (aboutEpisodeCount) {
        aboutEpisodeCount.textContent = getAllEpisodes().length + '+';
    }
    
    if (aboutTotalViews) {
        aboutTotalViews.textContent = getTotalViews().toLocaleString();
    }
}

function animateStats() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumbers = entry.target.querySelectorAll('.stat-number');
                statNumbers.forEach(numberElement => {
                    animateNumber(numberElement);
                });
                observer.unobserve(entry.target);
            }
        });
    });
    
    const statsSection = document.querySelector('.about-stats');
    if (statsSection) {
        observer.observe(statsSection);
    }
}

function animateNumber(element) {
    const finalNumber = parseInt(element.textContent.replace(/\D/g, ''));
    const duration = 2000; // 2 segundos
    const increment = finalNumber / (duration / 16); // 60 FPS
    let currentNumber = 0;
    
    const timer = setInterval(() => {
        currentNumber += increment;
        if (currentNumber >= finalNumber) {
            currentNumber = finalNumber;
            clearInterval(timer