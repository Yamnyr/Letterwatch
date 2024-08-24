function addLetterboxdLink() {
    const actionsList = document.querySelector('ul.js-actions-panel');
    const body = document.body;

    if (actionsList && body) {
        const tmdbId = body.getAttribute('data-tmdb-id');
        if (tmdbId) {
            addVidSrcLink(actionsList, tmdbId);
        }
    }
}

function addTmdbLink() {
    const actionsList = document.querySelector('ul.auto.actions');
    const tmdbId = extractTmdbId(window.location.href);

    if (actionsList && tmdbId) {
        addVidSrcLink(actionsList, tmdbId, true);
    }
}

function addVidSrcLink(actionsList, tmdbId, isTmdb = false) {
    const newLi = document.createElement('li');
    if (isTmdb) {
        newLi.className = 'tooltip use_tooltip';
        newLi.setAttribute('title', 'Watch');
        newLi.setAttribute('data-role', 'tooltip');
    }

    const newLink = document.createElement('a');
    newLink.href = chrome.runtime.getURL(`playerPage/player.html?id=${tmdbId}`);
    newLink.textContent = isTmdb ? '' : 'Watch';
    newLink.target = '_blank';

    if (isTmdb) {
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
