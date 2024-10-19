document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const tmdbId = urlParams.get('id');

    if (tmdbId) {
        const iframe = document.getElementById('vidSrcPlayer');
        iframe.src = `https://vidsrc.net/embed/movie/${tmdbId}`;
        iframe.allowFullscreen = true;
        iframe.referrerPolicy = "origin";

        const btnGroup = document.querySelector('.btn-group');

        const players = [
            { name: 'Lecteur 1', url: `https://vidsrc.pro/embed/movie/${tmdbId}`, disabled: false },
            { name: 'Lecteur 2', url: `https://multiembed.mov/directstream.php?video_id=${tmdbId}&tmdb=1`, disabled: true },
            { name: 'Lecteur 3', url: `https://vidsrc.net/embed/movie/${tmdbId}`, disabled: false },
            { name: 'Lecteur 4', url: `https://vidsrc.cc/v2/embed/movie/${tmdbId}`, disabled: false },
            // { name: 'Lecteur 4', url: `https://moviesapi.club/movie/${tmdbId}`, disabled: true },
            // { name: 'Lecteur 5', url: `https://www.2embed.cc/embed/${tmdbId}`, disabled: true },
            { name: 'Lecteur fr', url: `https://frembed.pro/api/film.php?id=${tmdbId}`, disabled: false }
        ];

        players.forEach(player => {
            const button = document.createElement('button');
            button.textContent = player.name;
            button.disabled = player.disabled;

            if (!player.disabled) {
                button.onclick = () => {
                    iframe.src = player.url;
                };
            } else {
                button.style.backgroundColor = '#777';
                button.style.cursor = 'not-allowed';
            }

            btnGroup.appendChild(button);
        });
    } else {
        document.body.innerHTML = '<p>Erreur: ID du film non trouvé.</p>';
    }
});
