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
        }
    }
});

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

function applyCssModifications() {
    const style = document.createElement('style');
    style.textContent = `
        div.content-wrap {
            width: 1200px !important;
        }
        div.col-17 {
            width: 920px !important;
        }
        section.section.col-10.col-main {
            width: 640px !important;
        }
        .film-popular-review .film-detail-content {
            width: 820px!important;
        }
    `;
    document.head.appendChild(style);

    const mainSection = document.querySelector('section.section.col-10.col-main');
    if (mainSection) {
        let tmdbId;
        if (window.location.hostname.includes('letterboxd.com')) {
            tmdbId = document.body.getAttribute('data-tmdb-id');
        } else if (window.location.hostname.includes('themoviedb.org')) {
            tmdbId = extractTmdbId(window.location.href);
        }

        if (tmdbId) {
            const iframe = document.createElement('iframe');
            iframe.src = `https://vidsrc.in/embed/movie?tmdb=${tmdbId}`;
            iframe.width = '100%';
            iframe.height = '400';
            iframe.style.border = '1px solid #303840';
            iframe.style.borderRadius = '5px';
            iframe.style.marginBottom = '25px';
            iframe.allowFullscreen = true;
            iframe.referrerPolicy = "no-referrer";
            mainSection.insertBefore(iframe, mainSection.firstChild);
        }
    }
}

function removeUnwantedDivs() {
    const allDivs = document.querySelectorAll('div');
    allDivs.forEach(div => {
        if ([...div.classList].some(className => className.includes('pw'))) {
            div.remove();
        }

        if (div.classList.contains('upgrade-kicker')) {
            div.remove();
        }
    });

    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'childList') {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === 1) {
                        if (node.id === 'pw-oop-bottom_rail') {
                            node.remove();
                        }
                        if (node.classList && node.classList.contains('upgrade-kicker')) {
                            node.remove();
                        }
                    }
                });
            }
        });
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
}

document.addEventListener('DOMContentLoaded', function() {
    chrome.storage.sync.get(['removeDivs'], function(items) {
        if (items.removeDivs) {
            removeUnwantedDivs(items.removeDivs);
        }
    });
});
