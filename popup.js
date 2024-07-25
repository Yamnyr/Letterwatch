document.addEventListener('DOMContentLoaded', function() {
    let originalLetterboxd, originalTmdb;

    // Charger les paramètres sauvegardés
    chrome.storage.sync.get(['letterboxd', 'tmdb'], function(items) {
        originalLetterboxd = items.letterboxd || false;
        originalTmdb = items.tmdb || false;
        document.getElementById('letterboxd').checked = originalLetterboxd;
        document.getElementById('tmdb').checked = originalTmdb;
    });

    document.getElementById('save').addEventListener('click', function() {
        let newLetterboxd = document.getElementById('letterboxd').checked;
        let newTmdb = document.getElementById('tmdb').checked;

        chrome.storage.sync.set({letterboxd: newLetterboxd, tmdb: newTmdb}, function() {
            console.log('Settings saved');

            // Obtenir l'onglet actif
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                let activeTab = tabs[0];
                if (activeTab) {
                    let url = activeTab.url;

                    // Vérifier si nous sommes sur Letterboxd et si le réglage a changé
                    if (url.includes('letterboxd.com') && newLetterboxd !== originalLetterboxd) {
                        chrome.tabs.reload(activeTab.id);
                    }
                    // Vérifier si nous sommes sur TMDB et si le réglage a changé
                    else if (url.includes('themoviedb.org') && newTmdb !== originalTmdb) {
                        chrome.tabs.reload(activeTab.id);
                    }
                }

                // Fermer la popup
                window.close();
            });
        });
    });
});