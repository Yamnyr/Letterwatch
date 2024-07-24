chrome.storage.sync.get(['letterboxd', 'tmdb'], function(items) {
    const host = window.location.hostname;
    if (host.includes('letterboxd.com') && items.letterboxd) {
        addLetterboxdLink();
    } else if (host.includes('themoviedb.org') && items.tmdb) {
        addTmdbLink();
    }
});

function addLetterboxdLink() {
    const actionsList = document.querySelector('ul.js-actions-panel');
    const body = document.body;

    if (actionsList && body) {
        const tmdbId = body.getAttribute('data-tmdb-id');
        if (tmdbId) {
            addLink(actionsList, tmdbId);
        }
    }
}

function addTmdbLink() {
    const actionsList = document.querySelector('ul.auto.actions');
    const tmdbId = extractTmdbId(window.location.href);

    if (actionsList && tmdbId) {
        addLink(actionsList, tmdbId, true);
    }
}

function addLink(actionsList, tmdbId, isTmdb = false) {
    const newLi = document.createElement('li');
    if (isTmdb) {
        newLi.className = 'tooltip use_tooltip';
        newLi.setAttribute('title', 'Watch on VidSrc');
        newLi.setAttribute('data-role', 'tooltip');
    }

    const newLink = document.createElement('a');
    newLink.href = `https://vidsrc.to/embed/movie/${tmdbId}`;
    newLink.textContent = isTmdb ? '' : 'Watch on VidSrc';
    newLink.target = '_blank';
    if (isTmdb) {
        newLink.className = 'no_click';
        const span = document.createElement('span');
        span.className = 'glyphicons_v2 play white';
        newLink.appendChild(span);
    }

    newLi.appendChild(newLink);
    actionsList.appendChild(newLi);
}

function extractTmdbId(url) {
    const match = url.match(/\/movie\/(\d+)/);
    return match ? match[1] : null;
}