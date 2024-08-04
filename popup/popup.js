document.addEventListener('DOMContentLoaded', function() {
    let originalLetterboxd, originalTmdb, originalWideLayout, originalRemoveDivs;

    // Charger les paramètres sauvegardés
    chrome.storage.sync.get(['letterboxd', 'tmdb', 'wideLayout', 'removeDivs'], function(items) {
        originalLetterboxd = items.letterboxd || false;
        originalTmdb = items.tmdb || false;
        originalWideLayout = items.wideLayout || false;
        originalRemoveDivs = items.removeDivs || false;

        document.getElementById('letterboxd').checked = originalLetterboxd;
        document.getElementById('tmdb').checked = originalTmdb;
        document.getElementById('wideLayout').checked = originalWideLayout;
        document.getElementById('removeDivs').checked = originalRemoveDivs;
    });

    document.getElementById('save').addEventListener('click', function() {
        let newLetterboxd = document.getElementById('letterboxd').checked;
        let newTmdb = document.getElementById('tmdb').checked;
        let newWideLayout = document.getElementById('wideLayout').checked;
        let newRemoveDivs = document.getElementById('removeDivs').checked;

        chrome.storage.sync.set({letterboxd: newLetterboxd, tmdb: newTmdb, wideLayout: newWideLayout, removeDivs: newRemoveDivs}, function() {
            console.log('Settings saved');

            // Obtenir l'onglet actif
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                let activeTab = tabs[0];
                if (activeTab) {
                    let url = activeTab.url;

                    if (url.includes('letterboxd.com') && (newLetterboxd !== originalLetterboxd || newWideLayout !== originalWideLayout || newRemoveDivs !== originalRemoveDivs)) {
                        chrome.tabs.reload(activeTab.id);
                    }
                    else if (url.includes('themoviedb.org') && newTmdb !== originalTmdb) {
                        chrome.tabs.reload(activeTab.id);
                    }
                }

                window.close();
            });
        });
    });
});
