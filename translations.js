const translations = {
    en: {
        title: "Choose where to add VidSrc link:",
        letterboxd: "Letterboxd",
        tmdb: "TMDB",
        save: "Save"
    },
    fr: {
        title: "Choisissez où ajouter le lien VidSrc :",
        letterboxd: "Letterboxd",
        tmdb: "TMDB",
        save: "Enregistrer"
    }
};

let currentLang = 'en';

function setLanguage(lang) {
    currentLang = lang;
    updateTexts();
    updateFlags();
}

function updateTexts() {
    document.getElementById('title').textContent = translations[currentLang].title;
    document.getElementById('letterboxdText').textContent = translations[currentLang].letterboxd;
    document.getElementById('tmdbText').textContent = translations[currentLang].tmdb;
    document.getElementById('save').textContent = translations[currentLang].save;
}

function updateFlags() {
    document.getElementById('langEN').classList.toggle('active', currentLang === 'en');
    document.getElementById('langFR').classList.toggle('active', currentLang === 'fr');
}

document.addEventListener('DOMContentLoaded', function() {
    const flags = document.querySelectorAll('.flag');
    flags.forEach(flag => {
        flag.addEventListener('click', function() {
            setLanguage(this.dataset.lang);
        });
    });

    setLanguage(currentLang);
});