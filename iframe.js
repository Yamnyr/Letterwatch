function applyCssModifications() {
    // Check if the iframe container already exists
    if (document.querySelector('.iframe-container')) return;

    const mainSection = document.querySelector('section.section.col-10.col-main');
    if (!mainSection) return;

    let tmdbId;
    if (window.location.hostname.includes('letterboxd.com')) {
        tmdbId = document.body.getAttribute('data-tmdb-id');
    } else if (window.location.hostname.includes('themoviedb.org')) {
        tmdbId = extractTmdbId(window.location.href);
    }

    if (!tmdbId) return;

    const iframeContainer = document.createElement('div');
    iframeContainer.className = 'iframe-container';

    const iframe = document.createElement('iframe');
    iframe.src = `https://vidsrc.pro/embed/movie/${tmdbId}?&theme=00e054&player=new`;
    iframe.allowFullscreen = true;
    iframe.referrerPolicy = "origin";

    const players = [
        { name: 'Lecteur 1', url: `https://vidsrc.pro/embed/movie/${tmdbId}` },
        { name: 'Lecteur 2', url: `https://vidsrc.net/embed/movie/${tmdbId}`, tooltip: 'You must disable your ad blocker' },
        { name: 'Lecteur 3', url: `https://vidsrc.cc/v2/embed/movie/${tmdbId}` },
        { name: 'Lecteur 4', url: `https://moviesapi.club/movie/${tmdbId}` },
        { name: 'Lecteur 5', url: `https://www.2embed.cc/embed/${tmdbId}` },
        { name: 'Lecteur fr', url: `https://frembed.pro/api/film.php?id=${tmdbId}` }
    ];

    const btnGroup = document.createElement('div');
    btnGroup.className = 'btn-group';

    players.forEach(player => {
        const button = document.createElement('button');
        button.textContent = player.name;
        button.onclick = () => { iframe.src = player.url; };

        if (player.tooltip) {
            button.classList.add('tooltip-label');
            const tooltipText = document.createElement('span');
            tooltipText.className = 'tooltip-text';
            tooltipText.textContent = player.tooltip;
            button.appendChild(tooltipText);
        }

        btnGroup.appendChild(button);
    });

    const controls = document.createElement('div');
    controls.className = 'iframe-controls';

    const btnPlayerPage = document.createElement('button');
    btnPlayerPage.textContent = 'Player Page';
    btnPlayerPage.onclick = () => {
        window.open(chrome.runtime.getURL(`playerPage/player.html?id=${tmdbId}`), '_blank');
    };

    controls.appendChild(btnGroup);
    controls.appendChild(btnPlayerPage);

    iframeContainer.appendChild(iframe);
    iframeContainer.appendChild(controls);

    mainSection.insertBefore(iframeContainer, mainSection.firstChild);
}

function extractTmdbId(url) {
    const match = url.match(/\/movie\/(\d+)/);
    return match ? match[1] : null;
}