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
        .iframe-container {
            margin-bottom: 25px;
            position: relative;
        }
        .iframe-container iframe {
            width: 100%;
            height: 400px;
            border: 1px solid #303840;
            border-radius: 5px;
        }
        .iframe-controls {
            margin-top: 10px;
            display: flex;
            justify-content: space-between; /* Distribute space between items */
            align-items: center; /* Vertically center items */
        }
        .iframe-controls .btn-group {
            display: flex;
            gap: 5px;
        }
        .iframe-controls button {
            border: none;
            border-radius: 3px;
            margin: 0;
            padding: 6px 12px;
            background: #445566;
            box-shadow: inset 0 1px 0 hsla(0, 0%, 100%, 0.3);
            color: #8a9baa;
            cursor: pointer;
            font-weight: bold;
        }
        .iframe-controls button:hover {
            color: white;
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
            const iframeContainer = document.createElement('div');
            iframeContainer.className = 'iframe-container';

            const iframe = document.createElement('iframe');
            iframe.src = `https://vidsrc.pro/embed/movie/${tmdbId}`;
            iframe.allowFullscreen = true;
            iframe.referrerPolicy = "origin";

            const controls = document.createElement('div');
            controls.className = 'iframe-controls';

            const btnGroup = document.createElement('div');
            btnGroup.className = 'btn-group';

            const btnVidSrcPro = document.createElement('button');
            btnVidSrcPro.textContent = 'Lecteur 1';
            btnVidSrcPro.onclick = () => {
                iframe.src = `https://vidsrc.pro/embed/movie/${tmdbId}`;
            };

            const btnVidSrcNet = document.createElement('button');
            btnVidSrcNet.textContent = 'Lecteur 2';
            btnVidSrcNet.onclick = () => {
                iframe.src = `https://vidsrc.net/embed/movie/${tmdbId}`;
            };

            const btnPlayerPage = document.createElement('button');
            btnPlayerPage.textContent = 'Player Page';
            btnPlayerPage.onclick = () => {
                window.open(chrome.runtime.getURL(`playerPage/player.html?id=${tmdbId}`), '_blank');
            };

            btnGroup.appendChild(btnVidSrcPro);
            btnGroup.appendChild(btnVidSrcNet);

            controls.appendChild(btnGroup);
            controls.appendChild(btnPlayerPage);

            iframeContainer.appendChild(iframe);
            iframeContainer.appendChild(controls);

            mainSection.insertBefore(iframeContainer, mainSection.firstChild);
        }
    }
}

function extractTmdbId(url) {
    const match = url.match(/\/movie\/(\d+)/);
    return match ? match[1] : null;
}
