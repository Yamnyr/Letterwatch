chrome.storage.sync.get(['letterboxd', 'tmdb', 'wideLayout', 'removeDivs'], function(items) {
    const host = window.location.hostname;
    const path = window.location.pathname;

    if (host.includes('letterboxd.com') && items.letterboxd) {
        addLetterboxdLink();
    } else if (host.includes('themoviedb.org') && items.tmdb) {
        addTmdbLink();
    }

    if (host.includes('letterboxd.com') && items.removeDivs) {
        removeUnwantedDivs();
    }

    if (host.includes('letterboxd.com') && items.wideLayout) {
        if (path.startsWith('/film/')) {
            applyCssModifications();
            injectCss();
        }
    }
});
