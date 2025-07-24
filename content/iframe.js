function applyCssModifications() {
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
    iframe.src = `https://iframe.pstream.org/embed/tmdb-movie-${tmdbId}?theme=green&logo=false&language-order=fr,en,hi,de,nl,pt`;
    iframe.allowFullscreen = true;
    iframe.referrerPolicy = "origin";

    const players = [

            { name: 'Lecteur 1', url: `https://iframe.pstream.org/embed/tmdb-movie-${tmdbId}?theme=green&logo=false&language-order=fr,en,hi,de,nl,pt`},
        { name: 'Lecteur 2', url: `https://embed.su/embed/movie/${tmdbId}` },

        // { name: 'Lecteur 2', url: `https://vidplay.fmovies0.cc/embed/movie/${tmdbId}`},

            { name: 'Lecteur 3', url: `https://vidsrc.cc/v3/embed/movie/${tmdbId}`, tooltip: 'You must disable your ad blocker'},

            { name: 'Lecteur 4', url: `https://vidsrc.icu/embed/movie/${tmdbId}`},

            { name: 'Lecteur 5', url: `https://vidlink.pro/movie/${tmdbId}?primaryColor=00e054&secondaryColor=00e054&iconColor=ffffff&icons=default&player=default&title=true&poster=true&autoplay=false&nextbutton=false&sub_label=french`},
    ];

    const btnGroup = document.createElement('div');
    btnGroup.className = 'btn-group';

    let activeButton = null;

    players.forEach((player, index) => {
        const button = document.createElement('button');
        button.textContent = player.name;

        if (index === 0) {
            button.classList.add('active');
            activeButton = button;
        }

        button.onclick = () => {
            if (activeButton) {
                activeButton.classList.remove('active');
            }
            button.classList.add('active');
            activeButton = button;

            iframe.src = player.url;
        };

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